function displayResults(route) {
    $("tbody").empty();
    
      // Then, for each entry of that json...
      route.forEach(function(data) {
        // Append each of the route's properties to the table
        $("tbody").append("<tr><td>" + data.name + "</td>" +
                             "<td>" + data.rating + "</td>" +
                             "<td>" + data.location + "</td>" +
                             "<td>" + data.comments + "</td>" +
                             "<td>" + data.tickDate + "</td></tr>");
      });
  }
  
  $.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
  
  // Bonus function to change "active" header
  function setActive(selector) {
    // remove and apply 'active' class to distinguish which column we sorted by
    $("th").removeClass("active");
    $(selector).addClass("active");
  }
  
  // 2: Button Interactions
  // ======================
  
  // When user clicks the weight sort button, display table sorted by weight
  $("#name-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-name");
  
    // Do an api call to the back end for json with all routes sorted by name
    $.getJSON("/name", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });
  
  // When user clicks the name sort button, display the table sorted by name
  $("#rate-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-rating");
  
    // Do an api call to the back end for json with all routes sorted by date
    $.getJSON("/rate", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });

  $("#loc-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-location");
  
    // Do an api call to the back end for json with all routes sorted by date
    $.getJSON("/loc", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });

  $("#date-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-tickDate");
  
    // Do an api call to the back end for json with all routes sorted by date
    $.getJSON("/date", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });