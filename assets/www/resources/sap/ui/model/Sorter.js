/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides the concept of a sorter for list bindings
jQuery.sap.declare("sap.ui.model.Sorter");

/**
 *
 * Constructor for Sorter
 *
 * @class
 * Sorter for the list binding
 * This object defines the sort order for the list binding.
 *
 *
 * @param {String} sPath the binding path used for sorting
 * @param {boolean} [bDescending=false] whether the sort order should be descending
 * @param {boolean|function} vGroup configure grouping of the content, can either be true to enable grouping
 *        based on the raw model property value, or a function which calculates the group value out of the 
 *        context (e.g. oContext.getProperty("date").getYear() for year grouping). The control needs to
 *        implement the grouping behaviour for the aggregation which you want to group.
 * @public
 * @name sap.ui.model.Sorter
 */
sap.ui.base.Object.extend("sap.ui.model.Sorter", /** @lends sap.ui.model.Sorter */ {
	
	constructor : function(sPath, bDescending, vGroup){
		if (typeof sPath === "object") {
			var oSorterData = sPath;
			sPath = oSorterData.path;
			bDescending = oSorterData.descending;
		}
		this.sPath = sPath;
		this.bDescending = bDescending;
		this.vGroup = vGroup;
		if (typeof vGroup == "boolean" && vGroup) {
			this.fnGroup = function(oContext) {
				jQuery.sap.log.warning(this.sPath);
				return oContext.getProperty(this.sPath);
			}
		}
		if (typeof vGroup == "function") {
			this.fnGroup = vGroup;
		}
	}

});

/**
 * Creates a new subclass of class sap.ui.model.Sorter with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * For a detailed description of <code>oClassInfo</code> or <code>FNMetaImpl</code> 
 * see {@link sap.ui.base.Object.extend Object.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] alternative constructor for a metadata object
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.model.Sorter.extend
 * @function
 */
