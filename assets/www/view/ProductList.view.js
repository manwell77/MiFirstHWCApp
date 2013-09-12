/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.jsview("com.opensap.ProductList", {	
			getControllerName : function() {
				return "com.opensap.ProductList";
			},	

			createContent : function (controller) {
				// Create a List
				var productList = new sap.m.List(
						{
							inset : true,
							type : sap.m.ListType.DetailAndActive,
							headerText : "Product List"
						}
				);
				
				var itemTemplate = new sap.m.StandardListItem({
					title : "{Name}",
					description : "{Description}",
					icon : "{ProductPicURL}",
					iconInset : false,
					iconDensityAware : false,
					type : sap.m.ListType.Navigation,
					tap : [ controller.productListTap, controller ]
				});
				

				productList.bindItems("/Products", itemTemplate);

				var page = new sap.m.Page("ProductPage",
						{
							title : 'Product List',
							content : [productList]
						});
				
				return page;
			}
		});