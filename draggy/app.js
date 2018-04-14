
var SOURCE_MODEL_JSON = '{"PATIENT":{"0":"FN","1":"LN","2":"G","3":"DOB"},"CONTACT_INFO":{"0":"Line1","1":"Line2","2":"City","3":"State","4":"Zip"}}';
var TARGET_MODEL_JSON = '{"PatientDemographics":{"0":"FirstName","1":"LastName","2":"Gender","3":"DateOfBirth"},"Address":{"0":"AddressLine1","1":"AddressLine2","2":"City","3":"State","4":"Zip"}}';


$(function() {
  // Handler for .ready() called.
 populateSourceCanvas(SOURCE_MODEL_JSON);
 populateTargetCanvas(TARGET_MODEL_JSON);

});



function populateSourceCanvas(jsonModel) {
    var obj = JSON.parse(jsonModel);
    var topCounter = 50;

    jQuery.each(obj, function(tableName, columns) {
      var tableDiv = $('<div />', { "class": 'table', 'id': tableName + '-' + 'table'});
      var titleDiv = $('<div />', { "class": 'title'});
      var delDiv = $('<div />', { "class": 'del'});
      var collapsDiv = $('<div />', { "class": 'node-collapse'});
      $('#source-canvas').append(tableDiv);
      
      tableDiv.append(titleDiv);
      tableDiv.append(delDiv);

      jQuery.each(columns, function(i, column) {
        var columnDiv = $('<div />', { "class": 'table-column', 'id': 'source-column' + '-' + column, 'text': column});
        tableDiv.append(columnDiv);
      });

      tableDiv.css('top', topCounter +'px');
      tableDiv.css('left', '20px');

      tableDiv.append(collapsDiv);  

      topCounter += 225;    
    });

}

function populateTargetCanvas(jsonModel) {
    var obj = JSON.parse(jsonModel);
    var topCounter = 50;

    jQuery.each(obj, function(tableName, columns) {
      var tableDiv = $('<div />', { "class": 'table', 'id': tableName + '-' + 'table'});
      var titleDiv = $('<div />', { "class": 'title'});
      var delDiv = $('<div />', { "class": 'del'});
      var collapsDiv = $('<div />', { "class": 'node-collapse'});
      $('#target-canvas').append(tableDiv);
      
      tableDiv.append(titleDiv);
      tableDiv.append(delDiv);

      jQuery.each(columns, function(i, column) {
        var columnDiv = $('<div />', { "class": 'table-column', 'id': 'target-column' + '-' + column, 'text': column});
        tableDiv.append(columnDiv);
      });

      tableDiv.css('top', topCounter +'px');
      tableDiv.css('left', '20px');

      tableDiv.append(collapsDiv);  

      topCounter += 225;    
    });

}

function setupSourcePlumbing(jsPlumbInstance, jsonModel) {
    var obj = JSON.parse(jsonModel);
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(tableName, columns) {

      jsPlumbInstance.draggable(tableName + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(columns, function(i, column) {
        jsPlumbInstance.addEndpoint('source-column' + '-' + column, { 
          anchor:"Right"
        }, exampleGreyEndpointOptions); 
      });
    });

}

function setupTargetPlumbing(jsPlumbInstance, jsonModel) {
    var obj = JSON.parse(jsonModel);
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isTarget:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(tableName, columns) {

      jsPlumbInstance.draggable(tableName + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(columns, function(i, column) {
        jsPlumbInstance.addEndpoint('target-column' + '-' + column, { 
          anchor:"Left"
        }, exampleGreyEndpointOptions); 
      });
    });

}

jsPlumb.ready(function () {

    var j = jsPlumb.getInstance({Container:surface});
    setupSourcePlumbing(j, SOURCE_MODEL_JSON);
    setupTargetPlumbing(j, TARGET_MODEL_JSON);


/*    j.draggable("container1", {
      containment:true
    });

    j.draggable("container2", {
      containment:true
    });

    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isTarget:true,
      connectorStyle : { stroke:"#666" }
    };


    j.addEndpoint("c1_1", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c1_2", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c2_1", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c2_2", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); */

});