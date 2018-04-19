
var SOURCE_MODEL_JSON = null;
var TARGET_MODEL_JSON = null;
var MAPPING_JSON = null;
var j = null;


$(function() {
  // Handler for .ready() called.
  updateCanvasWithJSON();

  $("#process-json").click(function(){
    updateCanvasWithJSON();
  });

  $(window).resize(function() {
    if(j != null){
      j.repaintEverything();
    }
  });

});

function updateCanvasWithJSON() {

  if(j != null){
    j.reset();
  }

  j = jsPlumb.getInstance({Container:surface});
  var transformJSON = JSON.parse($('#transform').val());

  $('#source-canvas').empty();
  $('#target-canvas').empty();

  SOURCE_MODEL_JSON = transformJSON.sourcemodels;
  TARGET_MODEL_JSON = transformJSON.targetmodels;
  MAPPING_JSON      = transformJSON.mappings;

  populateSourceCanvas(SOURCE_MODEL_JSON);
  populateTargetCanvas(TARGET_MODEL_JSON);

  setupSourcePlumbing(j, SOURCE_MODEL_JSON);
  setupTargetPlumbing(j, TARGET_MODEL_JSON);
  setupMappings(j, MAPPING_JSON);

}

function populateSourceCanvas(jsonModel) {
    var obj = jsonModel
    var topCounter = 50;

    jQuery.each(obj, function(index, model) {
          var tableDiv = $('<div />', { "class": 'table', 'id': model.id + '-' + 'table'});
          var titleDiv = $('<div />', { "class": 'title'});
          var delDiv = $('<div />', { "class": 'del'});
          var collapsDiv = $('<div />', { "class": 'node-collapse'});
          $('#source-canvas').append(tableDiv);
          
          tableDiv.append(titleDiv);
          tableDiv.append(delDiv);

          jQuery.each(model.columns, function(index, column) {
            var columnDiv = $('<div />', { "class": 'table-column', 'id': model.id + '.' + column.id, 'text': column.id});
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
          var tableDiv = $('<div />', { "class": 'table', 'id': model.id + '-' + 'table'});
          var titleDiv = $('<div />', { "class": 'title'});
          var delDiv = $('<div />', { "class": 'del'});
          var collapsDiv = $('<div />', { "class": 'node-collapse'});
          $('#target-canvas').append(tableDiv);
          
          tableDiv.append(titleDiv);
          tableDiv.append(delDiv);

          jQuery.each(model.columns, function(index, column) {
            var columnDiv = $('<div />', { "class": 'table-column', 'id': model.id + '.' + column.id, 'text': column.id});
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

      jsPlumbInstance.draggable(model.id + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint(model.id + '.' + column.id, { 
          anchor:"Right",
          uuid: model.id + '.' + column.id
        }, exampleGreyEndpointOptions); 
      });
    });

}

function setupTargetPlumbing(jsPlumbInstance, jsonModel) {
    var obj = jsonModel;
    var exampleGreyEndpointOptions = {
      endpoint:"Rectangle",
      paintStyle:{ width:10, height:10, fill:'#666' },
      isTarget:true,
      connectorStyle : { stroke:"#666" }
    };

    jQuery.each(obj, function(index, model) {

      jsPlumbInstance.draggable(model.id + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint(model.id + '.' + column.id, { 
          anchor:"Left",
          uuid: model.id + '.' + column.id
        }, exampleGreyEndpointOptions); 
      });
    });

}

function setupMappings(jsPlumbInstance, jsonModel){
    var obj = jsonModel;

    jQuery.each(obj, function(index, mapping) {
      jsPlumbInstance.connect({uuids:[mapping.source, mapping.target]});
    });        
}

jsPlumb.ready(function () {

});