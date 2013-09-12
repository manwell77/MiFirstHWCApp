/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.opensap.App", {
	
	getControllerName: function() {
		return "com.opensap.App";
	},

	createContent : function(oController) {
	
		// Main app container we app pages to, can control the flow of application
		this.app = new sap.m.App();

		// Pre-load all the views, this can also be achieved with lazy loading when the page is required
		// by checking for the existence of the page instance.
		var ProductListPage = sap.ui.jsview("ProductList","com.opensap.ProductList");
		
		// Make the app instance available to each view for easy access by the controller
		ProductListPage.app = this.app;
		this.app.addPage(ProductListPage);
		
		var ProductDetailPage = sap.ui.jsview("ProductDetail","com.opensap.ProductDetail");
		ProductDetailPage.app = this.app;
		this.app.addPage(ProductDetailPage);
		
		var SupplierDetailPage = sap.ui.jsview("SupplierDetail","com.opensap.SupplierDetail");
		SupplierDetailPage.app = this.app;
		this.app.addPage(SupplierDetailPage);

		return this.app;
	}	// end createContent
});	