
var SOURCE_MODEL_JSON = null;
var SOURCE_MODEL_COLUMNS = null;
var TARGET_MODEL_JSON = null;
var MAPPING_JSON = null;
var JOIN_JSON = null;
var j = null;

var sourceEndpointOptions = {
  endpoint:"Dot",
  paintStyle:{ radius:6, fill:'#3E7E9C' },
  isSource:true,
  connectorStyle : { stroke:"#3E7E9C" }
};

var targetEndpointOptions = {
  endpoint:"Dot",
  paintStyle:{ radius:6, fill:'#3E7E9C' },
  isTarget:true,
  connectorStyle : { stroke:"#3E7E9C" }
};

var joinEndpointOptions = {
  endpoint:"Rectangle",
  paintStyle:{ width:10, height:10, fill:'#666' },
  isSource:true,
  isTarget:true,
  connectorStyle : { stroke:"#666" }
};


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

  initializeAutoComplete();

});

function initializeAutoComplete() {
    var availableTags = [
      "SELECT",
      "FROM",
      "INNER JOIN",
      "OUTER JOIN",
      "GROUP BY",
      "HAVING",
      "WHERE",
      "BETWEEN"
    ];

    availableTags = availableTags.concat(SOURCE_MODEL_COLUMNS);

    function split( val ) {
      return val.split( /[\s]+/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
    $( "#query-builder" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        autoFocus: true,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var query = this.value;

          var lastIndex = Math.max(query.lastIndexOf(" "),query.lastIndexOf("\n"));
          query = query.substring(0, lastIndex+1);
          query = query + ui.item.value + " ";

          this.value = query;

          return false;
        }
      });
  }

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
  JOIN_JSON         = transformJSON.joins;
  SOURCE_MODEL_COLUMNS = getSourceColumns(SOURCE_MODEL_JSON);

  jQuery.each()

  populateSourceCanvas(SOURCE_MODEL_JSON);
  populateTargetCanvas(TARGET_MODEL_JSON);

  setupSourcePlumbing(j, SOURCE_MODEL_JSON);
  setupTargetPlumbing(j, TARGET_MODEL_JSON);
  setupMappings(j, MAPPING_JSON);
  setupJoins(j, JOIN_JSON);

}

function getSourceColumns(jsonModel) {
    var obj = jsonModel
    var columnArray = [];

    jQuery.each(obj, function(index, model) {
          columnArray.push(model.id);
          jQuery.each(model.columns, function(index, column) {
            columnArray.push(model.id + '.' + column.id)
          });
    });
    return columnArray;   
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

    jQuery.each(obj, function(index, model) {
      jsPlumbInstance.draggable(model.id + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint(model.id + '.' + column.id, { 
          anchor:"Right",
          uuid: model.id + '.' + column.id
        }, sourceEndpointOptions); 

        jsPlumbInstance.addEndpoint(model.id + '.' + column.id, { 
          anchor:"Left",
          uuid: 'join.' + model.id + '.' + column.id
        }, joinEndpointOptions);
      });
    });

}

function setupTargetPlumbing(jsPlumbInstance, jsonModel) {
    var obj = jsonModel;

    jQuery.each(obj, function(index, model) {
      jsPlumbInstance.draggable(model.id + '-' + 'table', { containment: true});  //(the default is to revert)

      jQuery.each(model.columns, function(index, column) {
        jsPlumbInstance.addEndpoint(model.id + '.' + column.id, { 
          anchor:"Left",
          uuid: model.id + '.' + column.id
        }, targetEndpointOptions); 
      });
    });

}

function setupMappings(jsPlumbInstance, jsonModel){
    var obj = jsonModel;

    jQuery.each(obj, function(index, mapping) {
      jsPlumbInstance.connect({uuids:[mapping.source, mapping.target]});
    });        
}

function setupJoins(jsPlumbInstance, jsonModel){
    var obj = jsonModel;

    jQuery.each(obj, function(index, mapping) {
      jsPlumbInstance.connect({uuids:['join.' + mapping.source, 'join.' + mapping.target]});
    });        
}

jsPlumb.ready(function () {

});