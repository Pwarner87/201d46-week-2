'use strict'

// Global variables
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var storesArray = [];

//This function calculates a random number
//Copied from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Making constructor function
function storeInfo(location, min, max, avgCookie, hours, numCustomers, avgSales){
    this.location = location;
    this.minNumCustomers = min;
    this.maxNumCustomers = max;
    this.avgCookiePerCustomer = avgCookie;
    this.hoursOfOperation = hours;
    this.numCustomersArray = numCustomers;
    this.avgSalesPerHour = avgSales;
}

// Creating random numbers for each store object
storeInfo.prototype.numCustomers = function(){
    var randomNumCustomers = getRandomIntInclusive(this.minNumCustomers, this.maxNumCustomers);
    return randomNumCustomers;
};

// Calculating avg sales per hours 
storeInfo.prototype.avgSales = function(index){
    var avgCookiesPerHour = Math.floor(this.avgCookiePerCustomer * this.numCustomersArray[index]);
    return avgCookiesPerHour;
};

// Calculating total cookies
storeInfo.prototype.totalSales = function(){
    var totalCookies = 0;
    for(var j =0; j < this.avgSalesPerHour.length; j++){
        totalCookies = totalCookies + this.avgSalesPerHour[j];
    }
    return totalCookies;
};

storeInfo.prototype.listEverything = function(){
    console.log(`${this.location} Results`);
  
    for(var i = 0; i < this.hoursOfOperation.length; i++){
      this.numCustomersArray.push(this.numCustomers());
      this.avgSalesPerHour.push(this.avgSales(i));
      console.log(`${this.hoursOfOperation[i]}: ${this.avgSalesPerHour[i]} cookies`);
    }
    console.log(`Total Cookies: ${this.totalSales()}`);
  };

  //References a table element ("parent")
var tableEl = document.getElementById('salesTable');

//Header follows different format compared to the rest of the table
//This function will render the header
function buildHeader() {
  var header_tr = document.createElement('tr');
  var blankSpace = document.createElement('td');
  // blankSpace.textContent = ''; //optional
  header_tr.appendChild(blankSpace);

  for(var l = 0; l < hoursOfOperation.length; l++){
    var nextHeader_td = document.createElement('td');
    nextHeader_td.textContent = hoursOfOperation[l];
    header_tr.appendChild(nextHeader_td);
  }
  var total_td = document.createElement('td');
  total_td.textContent = 'Daily Location Total';
  header_tr.appendChild(total_td);
  tableEl.appendChild(header_tr);
}


//This will add data to the rows
storeInfo.prototype.addData = function(next_tr, location, totalSales) {
  var title_td = document.createElement('td');
  title_td.textContent = location;
  next_tr.appendChild(title_td);

  for(var m = 0; m < this.hoursOfOperation.length; m++){
    var next_td = document.createElement('td');
    next_td.textContent = this.avgSalesPerHour[m];
    next_tr.appendChild(next_td);
  }

  var sumCookies = document.createElement('td');
  sumCookies.textContent = totalSales;
  next_tr.appendChild(sumCookies);
};

// //This will add rows to the table 
storeInfo.prototype.addRow = function() {
    var location = this.location;
    var sumCookies = this.totalSales();
    var next_tr = document.createElement('tr');
    this.addData(next_tr, location, sumCookies);
    tableEl.appendChild(next_tr);
  };

  var hourlyTotalArray = [];

  function totalPerHour() {
    for (var n = 0; n < hoursOfOperation.length; n++) { // every hour
      var sum = 0;
      for (var i in storesArray) { // add all the totals
        sum = sum + storesArray[i].avgSalesPerHour[n];
      }
      hourlyTotalArray.push(sum);
    }
  }

  function buildFooter() {
    var footer_tr = document.createElement('tr');
    var footer_td = document.createElement('td');
    footer_td.textContent = 'Total';
    footer_tr.appendChild(footer_td);
    for(var q = 0; q < hoursOfOperation.length; q++){
      var nextFooter_td = document.createElement('td');
      nextFooter_td.textContent = hourlyTotalArray[q];
      footer_tr.appendChild(nextFooter_td);
    }
    var dailyTotal_td = document.createElement('td');
    dailyTotal_td.textContent = dailyTotal;
    footer_tr.appendChild(dailyTotal_td);
    tableEl.appendChild(footer_tr);
  }

  var pike = new storeInfo('1st and Pike', 23, 65, 6.3, hoursOfOperation, [], []);
storesArray.push(pike);
// pike.listEverything();

var seatacAirport = new storeInfo('SeaTac Airport', 3, 24, 1.2, hoursOfOperation, [], []);
storesArray.push(seatacAirport);
// seatacAirport.listEverything();

var seattleCenter = new storeInfo('Seattle Center', 11, 38, 3.7, hoursOfOperation, [], []);
storesArray.push(seattleCenter);
// seattleCenter.listEverything();

var capHill = new storeInfo('Capitol Hill', 20, 38, 2.3, hoursOfOperation, [], []);
storesArray.push(capHill);
// capHill.listEverything();

var alki = new storeInfo('Alki', 23, 65, 6.3, hoursOfOperation, [], []);
storesArray.push(alki);
// alki.listEverything();

//Calculate daily total between all stores

for(var i in storesArray){ // for(var i = 0; i < storesArray.length; i++)
  storesArray[i].listEverything();
}

//Build Table
totalPerHour();
var dailyTotal = pike.totalSales() + seatacAirport.totalSales() + seattleCenter.totalSales() + capHill.totalSales() + alki.totalSales();

buildHeader(); // builds the header

//use the array to render each store
for(var i = 0; i < storesArray.length; i++){
  storesArray[i].addRow();
}
// pike.addRow(); // add the row of pike
// seatacAirport.addRow(); // ''
// seattleCenter.addRow(); // ''
// capHill.addRow();// ''
// alki.addRow(); // ''
buildFooter(); // ''
  
var cookieForm = document.getElementById('add-store');

function makeNewStore(event){
  // var event = <event>
  event.preventDefault();
  console.log('Making a new store');
  // details about store: name: min: max: avg

  // Collect a value <event>.target.<name>.value
  var name = event.target.location.value;
  var min = event.target.minNumCustomers.value;
  var max = event.target.maxNumCustomers.value;
  var avg = event.target.avgCookiePerCustomer.value;

  console.log(name, min, max, avg);

  var newStore = new storeInfo(name, min, max, avg);

  console.log(newStore);
}
  newStore.render();
