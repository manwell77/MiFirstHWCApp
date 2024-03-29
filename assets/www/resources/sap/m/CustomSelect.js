/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.CustomSelect");

(function(_sap) {
	var sPath = "sap.ui.thirdparty.mobiscroll.",
		sCSSPath = sPath + "css",
		bPlatformDependent = sap.ui.core.theming.Parameters.get("sapMPlatformDependent") == "true",
		bAndroid23AndPlatformDependent = bPlatformDependent && jQuery.os.android && jQuery.os.fVersion === 2.3,
		sTheme = bPlatformDependent ? "android-ics light" : "sapMCustomSlt";

	_sap.require("sap.m.InstanceManager");
	_sap.require(sPath + "js.mobiscroll-core");
	_sap.require(sPath + "js.mobiscroll-select");
	_sap.includeStyleSheet(_sap.getModulePath(sCSSPath, "/") + "mobiscroll-core.css");

	if (bPlatformDependent) {
		_sap.includeStyleSheet(_sap.getModulePath(sCSSPath, "/") + "mobiscroll-android-ics.css");
	}

	/* =========================================================== */
	/*                   begin: lifecycle methods                  */
	/* =========================================================== */

	/**
	 * Required adaptations before rendering when using Mobiscroll.
	 *
	 * @private
	 */
	sap.m.Select.prototype._onBeforeRenderingCustom = function() {
		if (this._$Select) {
			this._$Select.scroller("destroy");
		}
	};

	/**
	 * Required adaptations after rendering when using Mobiscroll.
	 *
	 * @private
	 */
	sap.m.Select.prototype._onAfterRenderingCustom = function() {
		var self = this,
			InstanceManager = sap.m.InstanceManager,
			fnHandlePointerDown = jQuery.proxy(this._handlePointerDown, this),
			fnHandleResizeEvent = jQuery.proxy(this._handleResizeEvent, this);

		if (this._$Select.length) {
			this._$Select.scroller({

				/**
				 *	Options for controlling the modal dialog button labels and header text.
				 */

				// text for Cancel button
				cancelText: this._oRb.getText("SELECT_CANCEL"),

				// text for Set button
				setText: this._oRb.getText("SELECT_ACCEPT"),

				// specifies a custom string which appears in the popup header
				headerText: this.getTitle(),

				// language of the scroller
				lang: this._sLang,

				// specifies the speed in milliseconds to change values in clickpick mode with tap & hold
				delay: 300,

				// disables (true) or enables (false) the scroller
				disabled: !this.getEnabled(),

				// controls the positioning of the scroller. Possible options:
				// "modal", "inline", "bubble", "top", "bottom"
				display: jQuery.device.is.phone ? "modal" : "bubble",

				// Option to choose between modes.
				// Possible modes: 'mixed - ''scroller' - standard behaviour, 'clickpick' - '+' and '-' buttons
				mode: jQuery.device.is.phone || jQuery.device.is.tablet ? "scroller" : "mixed",

				// Preset configurations for select
				preset: "select",

				// show/hide labels above wheels
				showLabel: false,

				// Sets the scroller's visual appearance.
				// Supplied themes: 'android', 'android-ics', 'android-ics light', 'sense-ui', 'ios', 'jqm'
				theme: sTheme,

				// minimum width in pixels of the wheels, expand to fit values and labels
				width: 80,

				// height in pixels of one row on the wheel
				height: 40,

				// css class(es) to style the input which is shown instead of the original select element
				inputClass: "sapMSltInput",

				rows: jQuery.device.is.phone ? 3 : 5,

				/**
				 * Allows you to define your own event when the html markup of the scroller is generated,
				 * but it is not yet shown. It is usefull, if you want to make modifications to the markup
				 * (e.g. add custom elements), before the positioning runs.
				 * The function receives the jQuery object containing the generated html and the scroller instance as parameters.
				 * If returns false, close is prevented.
				 *
				 * @param {jQuery} $Html jQuery object containing the generated HTML
				 * @param {string} oScroller Scroller instance
				 */
				onMarkupReady: function($Html, oScroller) {
					if (self.getTitle()) {
						$Html.addClass("sapMCustomSltHdr");
					}

					// restrict the width of the popup
					$Html[0].querySelector(".dwwr").style.maxWidth = (document.documentElement.clientWidth - 40) + "px";
				},

				/**
				 * Gets called when the scroller appears.
				 *
				 * @param {jQuery} $Html  jQuery object containing the generated html
				 * @param {string} sValue The formatted value
				 * @param {object} oScroller Scroller instance
				 */
				onShow: function($Html, sValue, oScroller) {
					!bAndroid23AndPlatformDependent && !jQuery.device.is.phone && document.addEventListener(jQuery.support.touch ? "touchstart" : "mousedown", fnHandlePointerDown, true);
					jQuery(window).on("resize.sapMCustomSelect", {$domRef: $Html}, fnHandleResizeEvent);
					InstanceManager.addDialogInstance(self);
				},

				/**
				 * Allows you to define your own event when the scroller is closed.
				 * If returns false, close is prevented.
				 *
				 * @param {string} sValue Selected value as text
				 * @param {object} oScroller Scroller instance
				 **/
				onClose: function() {
					!bAndroid23AndPlatformDependent && !jQuery.device.is.phone && document.removeEventListener(jQuery.support.touch ? "touchstart" : "mousedown", fnHandlePointerDown, true);
					jQuery(window).off("resize.sapMCustomSelect", fnHandleResizeEvent);
					InstanceManager.removeDialogInstance(self);
				}
			});
		}

		if (bAndroid23AndPlatformDependent) {
			setTimeout(function() {
				if (self.getWidth() === "auto") {
					self._$SelectCont[0].style.width = self._$Select.outerWidth() + "px";
				}

				self._$Select.addClass("sapMSltNativeHidden");
			}, 0);
		}
	};

	sap.m.Select.prototype._handlePointerDown = function(oEvent) {
		if (!document.querySelector(".sapMCustomSlt .dwwr").contains(oEvent.target)) {
			this.close();
		}
	};

	/**
	 * Close the opened select dialog when the back button is push.
	 *
	 * This method gets called from sap.m.InstanceManager, but previously it is needed
	 * to add the select instance to the instance manager by using sap.m.InstanceManager.addDialogInstance().
	 */
	sap.m.Select.prototype.close = function() {
		this._$Select.scroller("hide");
	};

	/* =========================================================== */
	/*                   end: lifecycle methods                    */
	/* =========================================================== */


	/* =========================================================== */
	/*                      begin: event handlers                  */
	/* =========================================================== */

	sap.m.Select.prototype._ontouchmoveCustom = function(oEvent) {
		oEvent.stopPropagation();
		oEvent.preventDefault();
	};

	sap.m.Select.prototype._handleResizeEvent = function(oEvent) {
		oEvent.data.$domRef[0].querySelector(".dwwr").style.maxWidth = (document.documentElement.clientWidth - 40) + "px";
	};

	// android 2.3 platform dependent workaround
	if (bAndroid23AndPlatformDependent) {
		sap.m.Select.prototype.onclick = function(oEvent) {
			this._$Select.scroller("show");
		};
	}

	/* ============================================================ */
	/*                      end: event handlers                  	*/
	/* ============================================================ */

})(jQuery.sap);