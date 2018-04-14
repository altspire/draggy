


$(function() {
  // Handler for .ready() called.

 // $("#source-canvas").append($('#container1').clone());

 var jsonModel = '{"Person":{"0":"FirstName","1":"LastName","2":"Gender","3":"DateOfBirth"},"Address":{"0":"Line1","1":"Line2","2":"City","3":"State","4":"Zip"}}';
 jsonToTable(jsonModel);


});



function jsonToTable(jsonModel) {
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
        var columnDiv = $('<div />', { "class": 'table-column', 'id': column + '-' + 'column', 'text': column});
        tableDiv.append(columnDiv);
      });

      tableDiv.css('top', topCounter +'px');
      tableDiv.css('left', '20px');

      tableDiv.append(collapsDiv);  

      topCounter += 225;    
    });

}

function createMappings(jsPlumbInstance, jsonModel) {
    var obj = JSON.parse(jsonModel);
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      isTarget:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(tableName, columns) {

      jsPlumbInstance.addGroup({
          el: $('#' + tableName + '-' + 'table'),
          id: tableName + '-' + 'jsplumb-group'
      });  //(the default is to revert)

      jQuery.each(columns, function(i, column) {
        jsPlumbInstance.addEndpoint(column + '-' + 'column', { 
          anchor:"Right"
        }, exampleGreyEndpointOptions); 
      });
    });

}

jsPlumb.ready(function () {

    var jsonModel = '{"Person":{"0":"FirstName","1":"LastName","2":"Gender","3":"DateOfBirth"},"Address":{"0":"Line1","1":"Line2","2":"City","3":"State","4":"Zip"}}';

    var j1 = jsPlumb.getInstance({Container:"source-canvas"});
    createMappings(j1, jsonModel);

    var j = window.j = jsPlumb.getInstance({Container:"target-canvas"});


    j1.addGroup({
      el: $('#source-canvas'),
      constrain:true
    });

    // connect some before configuring group

    j.addGroup({
        el:container1,
        id:"one"
    });  //(the default is to revert)

    j.addGroup({
        el:container2,
        id:"two"
    });  //(the default is to revert)

    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      isTarget:true,
      connectorStyle : { stroke:"#666" }
    };


    j.addEndpoint("c1_1", { 
      anchor:"Right"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c1_2", { 
      anchor:"Right"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c2_1", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); 

    j.addEndpoint("c2_2", { 
      anchor:"Left"
    }, exampleGreyEndpointOptions); 

});