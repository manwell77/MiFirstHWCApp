/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.ProductList", {

	onInit : function() {
	},
	
	onBeforeShow : function(evt) {

	},
	
	/*
	 * Here we handle the tap event on the product list item.
	 * The binding context is just the JSON object that was bound to the
	 * List Item. We can take this Object and add it to a parameter that will
	 * be passed along with the navigation.
	 * This data object will be accessible via the evt parameter passed into the
	 * OnBeforeShow event of the view. 
	 */
	productListTap : function(evt) {
		var data = {};
		data.context = evt.getSource().getBindingContext();
		var app = this.getView().app;
		app.to("ProductDetail", data);
	},
	
	navButtonTap : function(evt) { 

	}
});