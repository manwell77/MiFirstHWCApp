/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.opensap.ProductDetail", {

	getControllerName: function() {
		return "com.opensap.ProductDetail";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},
	
	createContent : function(controller) {

		// create page
		this.page = new sap.m.Page({
			title : "{Name}",
			showNavButton : true,
			navButtonTap : [ controller.navButtonTap, controller ],      
			content: [
		  		new sap.m.List({
					items : [
						new sap.m.DisplayListItem({
							label : "Name",
							value : "{Name}"
						}),
						new sap.m.DisplayListItem({
							label : "Description",
							value : "{Description}"
						}),
						new sap.m.DisplayListItem({
							label : "Price",
							value : {
								path : "Price"//, 
								//formatter : util.Formatter.price
							},
						}),
						
						new sap.m.StandardListItem({
							title : "Supplier",
							description : "{SupplierName}",
							type : sap.m.ListType.Navigation,
							tap : [ controller.supplierTap, controller ],
							customData : [
											new sap.ui.core.CustomData({
												key: "id",
												value: "{SupplierId}" 
											}),
										],
						})
					],
				})
		  		,
				new sap.m.VBox({
					alignItems : sap.m.FlexAlignItems.Center,
					items : [ 
					    new sap.m.Image({
							src : { path :  "ProductPicUrl",
									formatter : function(value) 
										{ 
											return "https://sapes1.sapdevcenter.com" + value;  
										}
								  },
							decorative : true,
							densityAware : false
						})
					]
				})
			] 
		});
		
		return this.page;
	}
});