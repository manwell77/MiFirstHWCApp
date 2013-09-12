/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.opensap.SupplierDetail", {

	getControllerName: function() {
		return "com.opensap.SupplierDetail";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},
	
	createContent : function(controller) {

		// create page
		this.page = new sap.m.Page({
			title : "{CompanyName}",
			showNavButton : true, 
			navButtonTap : [ controller.navButtonTap, controller ],       
			content: [
		  		new sap.m.List({
					items : [
						new sap.m.DisplayListItem({
							label : "Company Name",
							value : "{CompanyName}"
						}),
						new sap.m.DisplayListItem({
							label : "Web Address",
							value : "{WebAddress}"
						}),
						new sap.m.DisplayListItem({
							label : "Phone Number",
							value : "{PhoneNumber}"
						})
					],
				})
			] 
		});
		
		return this.page;
	}
});