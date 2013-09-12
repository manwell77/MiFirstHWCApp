/*
 * Copyright Craig Haworth 2013
 * openSAP Mobile 1 MOOC
 */

sap.ui.controller("com.opensap.ProductDetail", {

	onInit : function() {
	},
	/*
	 * When the user taps on the product list the specific data that is bound to that
	 * list item is passed on with the app.to function.
	 * This data gets passed into the onBeforeShow event of the view.
	 * Here we let the controller act as delegate and it assigned the binding context
	 * of the product detail view to the passed in data.
	 */
	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		} 
	},

	/*
	 * Here we just want to go back to the Product List page
	 * We use the handy app variable assigned to the view during creation
	 * to navigate back to the Product List
	 */
	navButtonTap : function(evt) { 
		var app = this.getView().app;
		if(app) {
			app.backToPage("ProductList");
		}
	},
	
	/*
	 * When we created the the Standard List Item to display the supplier we
	 * also bound the Supplier Id to the Custom Data field of the control.
	 * We use that custom data which essentially is a key-value pair with key(id)
	 * in an OData query to fetch the business partner.
	 * NB: Although we havent covered this at this stage of the course, the exact URL
	 * below is actually part of the Product Entity listed in the Navigation element.
	 * So we could have just used this instead of trying to construct the URL below.
	 */
	supplierTap : function(evt) {
		
		var supplierId = evt.getSource().data("id");
		var app = this.getView().app;
		
		// TODO: What about show a busy indicator here.
		// Can you work out how to do it?		
		var busyDialog = (sap.ui.getCore().byId("busy")) ? sap.ui.getCore().byId("busy") : new sap.m.BusyDialog('busy',{title: 'Loading'});
		busyDialog.open();						
		
		var odata;
		
		odata = 1;
		
		if (odata == 1)
		{
	   		var oDataModel = new sap.ui.model.odata.ODataModel("https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/",true,"P424071","1sjus7m3");
	   		
    		oDataModel.read("/BusinessPartnerCollection('" + supplierId + "')", null, null, true, 
    				
    				function(oData, oResponse){ oDataModel.oHeaders["x-csrf-token"] = oResponse.headers['x-csrf-token']; 
    				                            busyDialog.close();
    				                            app.to("SupplierDetail",oData); },
    				
    				function(oError){ busyDialog.close();		
    	                        window.alert("error: "+ oError.message); });				
		}
		else
		{
		OData.read( 
			  "https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/BusinessPartnerCollection('" + supplierId + "')?$format=json", 
			  function (data) { 
				  busyDialog.close();
				  app.to("SupplierDetail",data);  },
				  
			  function(err){ busyDialog.close();
				             window.alert("error: "+ err.message); }   			  
			);
		}
	}
	
});