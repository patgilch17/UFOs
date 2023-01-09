// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    //clears out any existing data
    tbody.html("")

    //loop through each object in the data and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        //appends a row and creates a variable for the row
        let row = tbody.append("tr");
        //loops through the data for each row
        Object.values(dataRow).forEach((val) => {
            //appends the data
            let cell = row.append("td");
            cell.text(val);
            }
          );
    });
}

function handleClick() {
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
}

d3.selectAll("#filter-btn").on("click", handleClick);

buildTable(tableData);

//function hello(name) {
 //   console.log("Hello World! This is " + name)
//}

// Simple JavaScript console.log statement
//function printHello() {
 //   console.log("Hello there!");
  //}

//printHello;

//function addition(a,b) {
 //   return a + b;
//};

//function doubleAddition(c,d) {
//    var total = addition(c,d) * 2;
//    return total;
//}

// Converted to an arrow function
//let addition2 = (a, b) => a + b;

//var doubleAddition2 = (a,b) => addition2(a,b) *2;

//let friends = ["Sarah", "Greg", "Cindy", "Jeff"];

//function listLoop(userList) {
//    for (var i = 0; i < userList.length; i++) {
//      console.log(userList[i]);
//    };

// if-statement syntax
//if ( condition ) { code to execute }