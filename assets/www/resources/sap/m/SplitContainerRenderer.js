/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.SplitContainerRenderer");

/**
 * @class SplitContainer renderer. 
 * @static
 */
sap.m.SplitContainerRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.SplitContainerRenderer.render = function(oRm, oControl){ 
	oRm.write("<div");
	oRm.writeControlData(oControl);
	oRm.addClass("sapMSplitContainer");
	
	if (this.renderAttributes) {
		this.renderAttributes(oRm, oControl); // may be used by inheriting renderers, but DO NOT write class or style attributes! Instead, call addClass/addStyle.
	}
	
	if(!jQuery.device.is.phone) {
		if(jQuery.device.is.portrait) {
			oRm.addClass("sapMSplitContainerPortrait");
		}
		switch(oControl.getMode()) {
			case "ShowHideMode":
				oRm.addClass("sapMSplitContainerShowHide");
				break;
			case "StretchCompress":
				oRm.addClass("sapMSplitContainerStretchCompress");
				break;
			case "PopoverMode":
				oRm.addClass("sapMSplitContainerPopover");
				break;
		}
	}
	oRm.writeClasses();
	oRm.writeStyles();
	var sTooltip = oControl.getTooltip_AsString();
	if (sTooltip) {
		oRm.writeAttributeEscaped("title", sTooltip);
	}
	oRm.write(">"); // div element
	
	if(this.renderBeforeContent){
		this.renderBeforeContent(oRm, oControl);
	}
	
	if(!jQuery.device.is.phone) {
		if(oControl.getMode() === "PopoverMode" && jQuery.device.is.portrait) {
			oControl._oDetailNav.addStyleClass("sapMSplitContainerDetail");
			oRm.renderControl(oControl._oDetailNav);
			//add master to popover if it's not yet added
			if(oControl._oPopOver.getContent().length === 0){
				oControl._oPopOver.addAggregation("content", oControl._oMasterNav, true);
			}
		} else {
			oControl._oMasterNav.addStyleClass("sapMSplitContainerMaster");
			if(oControl._oMasterNav.getPages().length > 0) {
				oRm.renderControl(oControl._oMasterNav);
			}
			
			oControl._oDetailNav.addStyleClass("sapMSplitContainerDetail");
			if(oControl._oDetailNav.getPages().length > 0) {
				oRm.renderControl(oControl._oDetailNav);
			}
		}
	}else {
		oControl._oMasterNav.addStyleClass("sapMSplitContainerMobile");
		oRm.renderControl(oControl._oMasterNav);
	}
	
	 oRm.write("</div>");
};
