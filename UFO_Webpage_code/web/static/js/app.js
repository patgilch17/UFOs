// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Create a variable to keep track of all the filters as an object.
var filters = {};


// Use this function to update the filters. 
function updateFilters() {

    // Save the element that was changed as a variable.
    let ourelement = d3.select(this);
    //https://www.w3schools.com/js/js_function_call.asp
    //d3.select(this) knows which of the inputs caused the updatefilters to be called
    //apparently this is usually true for most times when program can watch for a change.

    // Save the value that was changed as a variable.
    let ourvalue = ourelement.property("value");
    // Save the id of the filter that was changed as a variable.
    let ourid = ourelement.attr("id");
  
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (ourvalue) {
      filters[ourid] = ourvalue ;
    }
    else {
      delete filters[ourid];
    }
  
    // Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // Use this function to filter the table when data is entered.
  function filterTable() {
  
    // Set the filtered data to the tableData.
    let filteredData = tableData;

    //The beginning of my attempt (1) for the loop.  I decided to use the .keys method and felt the need to access my keys before the loop.
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    let ourkeys = Object.keys(filters);
    

    // Loop through all of the filters and keep any data that
    // matches the filter values
    
    //My attempt (1) using the .keys method.  Here I loop through the keys of the filters
    for (var i = 0; i < ourkeys.length; i++) {
      filteredData = filteredData.filter(row => row[ourkeys[i]] === filters[ourkeys[i]]);
    }
    
    //My attempt (2) using .entries to access both the key and value within the loop.  This attempt works
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    //console.log(filters);
    //for (let [k,v] of Object.entries(filters)) {
    //  filteredData = filteredData.filter(row => row[k] === v);
    //  console.log(k);
    //  console.log(v);
    //}

    //My attempt (3) using forEach... This attempt does not appear to work.
    //filteredData = filters.forEach((filtering) => filteredData.filter(row => row[Object.entries(filtering)[0]] === filters[Object.entries(filtering)[0]]));
    
    // Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);

  // Build the table when the page loads
  buildTable(tableData);
