/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.SupplierDetail", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {
		if (evt.data) {
			this.getView().setBindingContext(evt.data);
		} 
	},
	
	navButtonTap : function(evt) { 
		var app = this.getView().app;
		if(app) {
			app.backToPage("ProductDetail");
		}
	},
	
});