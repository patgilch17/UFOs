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

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};


// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let ourelement = d3.select(this);
    //d3.select(this) knows which of the inputs caused the updatefilters to be called
    //apparently this is usually true for most times when program can watch for a change.

    // 4b. Save the value that was changed as a variable.
    let ourvalue = ourelement.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let ourid = ourelement.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (ourvalue) {
      filters[ourid] = ourvalue ;
    }
    else {
      delete filters[ourid];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    let ourkeys = Object.keys(filters);
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    //filters.forEach((filtering) => filteredData.filter(row => row[filtering])
    for (var i = 0; i < ourkeys.length; i++) {
      filteredData = filteredData.filter(row => row[ourkeys[i]] === filters[ourkeys[i]]);
    }
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  //d3.selectAll("#list-group-item").on("click", handleClick);
  //I know the above code plays an important role.  but the event won't be click
  // and the function is updateFilters
  //d3.selectAll("#datetime").on("change",updateFilters("datetime"))
  //d3.selectAll("#city").on("change",updateFilters("city"))
  //d3.selectAll("#state").on("change",updateFilters("state"))
  //d3.selectAll("#country").on("change",updateFilters("country"))
  //d3.selectAll("#shape").on("change",updateFilters("shape"))
  d3.selectAll("input").on("change", updateFilters);
  // Build the table when the page loads
  buildTable(tableData);
