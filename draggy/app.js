


$(function() {
  // Handler for .ready() called.

 // $("#canvas").append($('#container1').clone());

 var json = "{
  \"Person\": {
    \"0\" : \"FirstName\",
    \"1\" : \"LastName\",
    \"2\" : \"Gender\",
    \"3\": \"DateOfBirth\"
  },
  \"Address\": {
    \"0\": \"Line1\",
    \"1\": \"Line2\",
    \"2\": \"City\",
    \"3\": \"State\",
    \"4\": \"Zip\"
  }
}"


});



function jsonToTable(json) {
    

            // The function returns the product of p1 and p2
}



jsPlumb.ready(function () {

    var j = window.j = jsPlumb.getInstance({Container:canvas});

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