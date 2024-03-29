/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

//Provides the history handler sap.ui.core.History
jQuery.sap.declare("sap.ui.core.History");

jQuery.sap.require("sap.ui.base.Object");

/**
 * Creates an instance of the History.
 * 
 * Attention: The Web Storage API which is used by this class stores the data on the client.
 * Therefore do not use this API for confidential information. 
 *
 * @class History handles the history of certain controls (e.g. sap.ui.commons.SearchField).
 *
 * @param {string} sId id for the history
 * @param {object} [mSettings] optional map/JSON-object with additional settings
 *
 * @extends sap.ui.base.Object
 * @author SAP AG
 * @version 1.15.0-SNAPSHOT
 * @constructor
 * @name sap.ui.core.History
 * @private
 */
sap.ui.base.Object.extend("sap.ui.core.History", /** @lends sap.ui.core.History.prototype */ {

	constructor : function(sId, mSettings) {
		sap.ui.base.Object.apply(this);
		if(!mSettings){
			mSettings = {};
		}

		var sHistoryPrefix = mSettings.prefix ? mSettings.prefix : document.location.pathname;

		this._iMaxHistory = mSettings.max ? mSettings.max : 100;
		this._sHistoryId = sHistoryPrefix + sId;
		var that = this;

		jQuery.sap.require("jquery.sap.storage");
		this._oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

		this._fFilter = mSettings.filter ? mSettings.filter : function(sHistoryValue, sValue) {
			return sHistoryValue && (!sValue || (sValue && jQuery.sap.startsWithIgnoreCase(sHistoryValue, sValue)));
		};
		this._fCheckHistory = mSettings.checkHistory ? mSettings.checkHistory : function(aHistory) {
			return aHistory;
		};
	},

	/**
	 * Initializes the history if not already done.
	 *
	 * @private
	 */
	_initHistory : function() {
		if(!this._aHistory){
			var aHistory = this._oStorage.get(this._sHistoryId);
			if(typeof(aHistory) === "string") {
				// in case it is a string, convert it to an array
				aHistory = aHistory.split(",");
			} else if(!aHistory){
				// or create a new one in case of non existence
				aHistory = [];
			} // else assume that there is the means for serializing JSON used, returning an array directly
			//do a final check of the entries
			this._aHistory = this._fCheckHistory(aHistory);
		}
		return this._aHistory;
	},

	/**
	 * Returns the history values fitting to the given value (according to the specified filter.
	 *
	 * @private
	 */
	get : function(sValue) {
		var aHistory = this._initHistory();
		var aResult = [];
		for(var i=0; i<aHistory.length; i++){
			if(this._fFilter(aHistory[i], sValue)){
				aResult.push(aHistory[i]);
			}
		}
		return aResult;
	},

	/**
	 * Removes the given value from the history values.
	 *
	 * @private
	 */
	remove : function(sValue) {
		var aHistory = this._initHistory();
		var aResult = [];
		for(var i=0; i<aHistory.length; i++){
			if(aHistory[i] == sValue) {
				aHistory.splice(i, 1);
				break;
			}
		}
	},

	/**
	 * Adds the given value to the history.
	 *
	 * @private
	 */
	add : function(sValue) {
		var aHistory = this._initHistory();
		// ensure it is not contained twice -> remove
		for(var i=0; i<aHistory.length; i++){
			if(aHistory[i] === sValue){
				aHistory.splice(i,1);
				break;
			}
		}
		// and put it to the 'very top'
		aHistory.unshift(sValue);
		// but do not store more than specified
		if(aHistory.length > this._iMaxHistory) {
			aHistory.splice(this._iMaxHistory);
		}

		this._oStorage.put(this._sHistoryId, aHistory);
	},

	/**
	 * Clears the history.
	 *
	 * @private
	 */
	clear : function() {
		this._oStorage.remove(this._sHistoryId);
		this._aHistory = null;
	}

});
