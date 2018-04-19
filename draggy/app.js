
var SOURCE_MODEL_JSON = null;
var TARGET_MODEL_JSON = null;


$(function() {
  // Handler for .ready() called.

  var transformJSON = JSON.parse($('#transform').val());

  SOURCE_MODEL_JSON = transformJSON.sourcemodels
  TARGET_MODEL_JSON = transformJSON.targetmodels


 populateSourceCanvas(SOURCE_MODEL_JSON);
 populateTargetCanvas(TARGET_MODEL_JSON);

});



function populateSourceCanvas(jsonModel) {
    var obj = jsonModel
    var topCounter = 50;

    jQuery.each(obj, function(index, model) {
          var tableDiv = $('<div />', { "class": 'table', 'id': model.name + '-' + 'table'});
          var titleDiv = $('<div />', { "class": 'title'});
          var delDiv = $('<div />', { "class": 'del'});
          var collapsDiv = $('<div />', { "class": 'node-collapse'});
          $('#source-canvas').append(tableDiv);
          
          tableDiv.append(titleDiv);
          tableDiv.append(delDiv);

          jQuery.each(model.columns, function(index, column) {
            var columnDiv = $('<div />', { "class": 'table-column', 'id': 'source-column' + '-' + column.id, 'text': column.id});
            tableDiv.append(columnDiv);
          });

          tableDiv.css('top', topCounter +'px');
          tableDiv.css('left', '20px');

          tableDiv.append(collapsDiv);  

          topCounter += 225;    
        });
}

function populateTargetCanvas(jsonModel) {
    var obj = jsonModel
    var topCounter = 50;

    jQuery.each(obj, function(index, model) {
          var tableDiv = $('<div />', { "class": 'table', 'id': model.name + '-' + 'table'});
          var titleDiv = $('<div />', { "class": 'title'});
          var delDiv = $('<div />', { "class": 'del'});
          var collapsDiv = $('<div />', { "class": 'node-collapse'});
          $('#target-canvas').append(tableDiv);
          
          tableDiv.append(titleDiv);
          tableDiv.append(delDiv);

          jQuery.each(model.columns, function(index, column) {
            var columnDiv = $('<div />', { "class": 'table-column', 'id': 'target-column' + '-' + column.id, 'text': column.id});
            tableDiv.append(columnDiv);
          });

          tableDiv.css('top', topCounter +'px');
          tableDiv.css('left', '20px');

          tableDiv.append(collapsDiv);  

          topCounter += 225;    
        });
}

function setupSourcePlumbing(jsPlumbInstance, jsonModel) {
    var obj = jsonModel;
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(index, model) {

      jsPlumbInstance.draggable(model.name + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint('source-column' + '-' + column.id, { 
          anchor:"Right"
        }, exampleGreyEndpointOptions); 
      });
    });

}

function setupTargetPlumbing(jsPlumbInstance, jsonModel) {
    var obj = jsonModel;
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isSource:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(index, model) {

      jsPlumbInstance.draggable(model.name + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint('target-column' + '-' + column.id, { 
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