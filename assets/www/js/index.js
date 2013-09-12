/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');

    	var busyDialog = (sap.ui.getCore().byId("busy")) ? sap.ui.getCore().byId("busy") : new sap.m.BusyDialog('busy',{title: 'Loading'});
        busyDialog.open();	
        
    	// SPLASH SCREEN OPEN - SEE CSS ABOVE FOR IMAGE CENTER)
    	// var oImage = new sap.m.Image("Splash");
    	// oImage.setSrc("resources/loading.gif");
    	// oImage.setDecorative(false);
    	// oImage.placeAt("root");
    	
    	var odata;
    	
    	odata = 1; // see also ProductDetail Controller
    	
    	if (odata == 1)
    		{
    		var oDataModel = new sap.ui.model.odata.ODataModel("https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/",true,"P424071","1sjus7m3"); 				
    		
    		oDataModel.read("/ProductCollection", null, null, true, 
    				
    				function(oData, oResponse){ oDataModel.oHeaders["x-csrf-token"] = oResponse.headers['x-csrf-token']; 
    											var myData = {};
    											myData.Products = oData.results;
    											var oModel = new sap.ui.model.json.JSONModel();
    											oModel.setData(myData);
    											sap.ui.getCore().setModel(oModel);											
    				                            busyDialog.close();	
    				                            var myapp = sap.ui.jsview("com.opensap.App");
    				                            myapp.placeAt('root'); },
    				
    				function(oError){ busyDialog.close();		
			    	            window.alert("error: "+ oError.message); });				  
    		}
    	else
    	{
    		OData.read({ requestUri: "https://sapes1.sapdevcenter.com/sap/opu/odata/sap/ZGWSAMPLE_SRV/ProductCollection?$format=json", user: "P424071", password: "1sjus7m3" } 
    				  , 
    				  function (data) { 
    					  var oModel = new sap.ui.model.json.JSONModel();
    					  var myData = {};
    					  myData.Products = data.results;
    					  oModel.setData(myData);
    					  sap.ui.getCore().setModel(oModel);				  
    					  var myapp = sap.ui.jsview("com.opensap.App");	
    					  busyDialog.close();
    					  // SPLASH SCREEN CLOSE
    					  // $("#root").attr("class", "");
    					  // $("#root").innerHTML = '';
    					  // oImage.destroy();				  
    					  myapp.placeAt('root');				  
    				  }, 
    			      function(err){ busyDialog.close();
    			    	             window.alert("error: "+ err.message);	}			  
    				);			
    	}		
    	
    },
};
