//Final Practical assignment
// Subject: Web Programming I
// Student: Aleksandr Tselikovskii

// initial variables
var amount = []; // array to save amount of product
var subTotal = []; // array to save subtotal
var orderTotal = 0 // total order amount
var price = [] // array to save price
var shopCartList = []; // save all products from JSON + add amount
// const currentFullFormatDate = new Date();
// let currentDate = currentFullFormatDate.toDateString();

// Create a class with a method
class ShopCart {
  constructor(name,weight,price,amount){
    this.name = name;
    this.weight = weight;
    this.price = price;
    this.amount = amount;
  }
  shopCartOutput() {
    var name_row = "Product: " + this.name + "\n";
    var weight_row = "weight: " + this.weight + "\n";
    var price_row = "price: " + this.price + "\n";
    var amount_row = "amount: " + this.amount + "\n";
    return (name_row + weight_row + price_row + amount_row);
  }
}

var totalValueOutput = document.querySelector('#orderTotal'); // for changing the value of total order sum on the screen
totalValueOutput.value = orderTotal;

function customerOutput() { // output validated customer inormation
  const formData = new FormData(document.querySelector('#orderForm'));

  for (var pair of formData.entries()) {
      if (pair[1] == '') { //empty user data
        continue;
      }
      console.log(pair[0] + ': ' + pair[1]);
      var myList = document.querySelector('#userInfo');
      var newListElement = document.createElement('li');
      var textForElement = document.createTextNode(pair[1]);
      newListElement.appendChild(textForElement);
      myList.appendChild(newListElement);
  }
  const myHeading = document.querySelector('#userInfo');
  var heading = document.createElement('h5');
  heading.setAttribute('class', 'tmpHeading');
  var textForHeading = document.createTextNode('Customer info:');
  heading.appendChild(textForHeading);
  myHeading.insertBefore(heading, myHeading.childNodes[0]);
}

function orderOutput () {
  for (let item of shopCartList) {
      var myList = document.querySelector('#orderedProducts');
          if (item.amount != 0) {
            var newListElement = document.createElement('li');
            myList.appendChild(newListElement);
            newListElement.innerText = item.shopCartOutput()
    }
  }

  const myHeadingTotal = document.querySelector('#orderedProducts');
  var headingTotal = document.createElement('h5');
  headingTotal.setAttribute('class', 'tmpHeading');
  var textForHeadingTotal = document.createTextNode('Total: ' + orderTotal + ' CAD');
  headingTotal.appendChild(textForHeadingTotal);
  myHeadingTotal.insertBefore(headingTotal, myHeadingTotal.childNodes[0]);

  const myHeading = document.querySelector('#orderedProducts');
  var heading = document.createElement('h5');
  heading.setAttribute('class', 'tmpHeading');
  var textForHeading = document.createTextNode('You ordered:');
  heading.appendChild(textForHeading);
  myHeading.insertBefore(heading, myHeading.childNodes[0]);
}

function removeForms() {
  orderTotal = 0;
  let userInfo = document.querySelectorAll('#userInfo');
  let orderedProducts = document.querySelectorAll('#orderedProducts');
  let tmpHeading = document.querySelectorAll('.tmpHeading'); // headings in the order

  // deleting and reseting everything
  for (let item of userInfo) {
    item.remove();
  }
  for (let item2 of orderedProducts) {
    item2.remove();
  }
  for (let item3 of tmpHeading) {
    item3.remove();
  }
  for (let item4 of shopCartList) {
    item4.amount = 0
  }
// reseting amount outut for every product
  for (let index = 0; index < amount.length; index++) {
    amount[index] = 0;
    subTotal[index] = 0;

  let amountOutput = document.querySelector('#itemAmount_' + index); // changing value on the screen
  amountOutput.textContent = 0;

  let subTotalOutput = document.querySelector('#sabTotal_' + index); // changing value on the screen
  subTotalOutput.textContent = 0; // rounding for 2 dec places
}

  // restoring deleted sections for client's info and order outputs
  let newUserInfo = document.querySelector('.orderList')
  var newListElement = document.createElement('ul');
  newListElement.setAttribute('id', 'userInfo');
  newUserInfo.appendChild(newListElement);

  let newOrderedProducts = document.querySelector('.orderList')
  var newProductElement = document.createElement('ol');
  newProductElement.setAttribute('id', 'orderedProducts');
  newOrderedProducts.appendChild(newProductElement);
}

// --- Getting data from Json file ----
const header = document.querySelector('header');
const section = document.querySelector('.grid');

let requestURL = 'data.json';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onreadystatechange = function(){
console.log('...Processing the server response...')
if (request.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
    console.log('The state an XMLHttpRequest client: ', request.readyState, ' - send() has been called, and headers and status are available.');
} else {
    if (request.readyState === XMLHttpRequest.LOADING) {
        console.log('The state an XMLHttpRequest client: ', request.readyState, " - Downloading; response's body is being received");
    }
}
if (request.readyState === XMLHttpRequest.DONE) {
   console.log('Everything is good, the response was received');
      // Now verify the response and extract the data
if (request.status === 200) {
    console.log('HTTP response status: ', request.status);
    console.log('The resource has been fetched and is transmitted in the message body');
    console.log('Loading...');
    request.onload = function() {
        const product = request.response;
        populateHeader(product);
        showItems(product);
        console.log('All data extracted');
    }
} else {
    console.log('There was a problem with the request');
      // For example, the response may have a 404 (Not Found) // or 500 (Internal Server Error) response
}
} else {
    console.log('Server response is not ready') // Not ready yet.
}
};

// product and type heading
function populateHeader(obj) {
  const myH1 = document.createElement('h3');
  myH1.textContent = obj['product'];
  header.appendChild(myH1);

  const myH2 = document.createElement('h4');
  myH2.textContent = obj['type'];
  header.appendChild(myH2);
}

function showItems(obj) {
  const product = obj['items'];

  console.log('obj', obj);
  console.log(obj['items']);

  for (let i = 0; i < product.length; i++) {

    // building an array of items (amount=0) in the cart
    let newCartItem = new ShopCart(product[i].name, product[i].weight, product[i].price, 0);
    shopCartList.push(newCartItem);
    console.log('shopcart element', shopCartList[i]);

    const myItem = document.createElement('div');
    const myItem2 = document.createElement('div');
    const myItem3 = document.createElement('div');
    const myItem4 = document.createElement('div');

    const myPlusButton = document.createElement('button');
    const myMinusButton = document.createElement('button');

    myMinusButton.setAttribute('data-id', i); // data-id - index of product
    myPlusButton.setAttribute('data-id', i); // data-id - index of product

    const myH2 = document.createElement('h2');
    const myPara1 = document.createElement('p');
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myList = document.createElement('ul');

    amount[i] = 0;
    price[i] = product[i].price
    subTotal[i] = amount[i] * price[i]

    myH2.textContent = product[i].name + ' ' + product[i].weight;
    myH2.style.background = 0;
    myPara1.textContent = product[i].price;

    myPara2.textContent = amount[i];
    myPara2.setAttribute('id', 'itemAmount_' + i);
    myPara3.textContent = subTotal[i];
    myPara3.setAttribute('id', 'sabTotal_' + i);

    myMinusButton.textContent = '-';
    myMinusButton.addEventListener("click", getAmountMinus);

    myPlusButton.textContent = '+';
    myPlusButton.addEventListener("click", getAmountPlus);

    const imageArray = product[i].photoGallery;
    console.log('pictures ' + imageArray);
    for (let j = 0; j < imageArray.length; j++) {
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        image.setAttribute('src', imageArray[j]);

        listItem.appendChild(image);
        myList.appendChild(listItem);
    }

    myItem.appendChild(myH2); // first column for the table
    myItem.appendChild(myPara1); // second column for the table
    myItem.appendChild(myPara2);
    myItem.appendChild(myList);

    myItem2.appendChild(myPara1);
    myItem3.appendChild(myPara2);
    myItem3.appendChild(myPlusButton);
    myItem3.appendChild(myMinusButton);
    myItem4.appendChild(myPara3);

    section.appendChild(myItem);
    section.appendChild(myItem2);
    section.appendChild(myItem3);
    section.appendChild(myItem4);
  }
}

function getAmountMinus() {
  const selectedButton = this;
  let buttonId = selectedButton.getAttribute('data-id');
  console.log('buttonID: ', buttonId) //, cardArray[cardId], 'next card value', cardArray[parseInt(cardId) + 9]);
  if (amount[buttonId] > 0) {
      amount[buttonId]--;

      shopCartList[buttonId].amount = amount[buttonId] // changing amount of item in the shopCart
      console.log('shopCartList[buttonId] = ', shopCartList[buttonId]);

      subTotal[buttonId] = price[buttonId] * amount[buttonId];
      console.log('subtotal =', subTotal[buttonId]);
      orderTotal = (Number(orderTotal) - price[buttonId]).toFixed(2); // rounding, needs to be improve
      console.log('order total:', orderTotal);
  }

  let amountOutput = document.querySelector('#itemAmount_' + buttonId); // changing value on the screen
  amountOutput.textContent = amount[buttonId];

  let subTotalOutput = document.querySelector('#sabTotal_' + buttonId); // changing value on the screen
  subTotalOutput.textContent = parseFloat(subTotal[buttonId]).toFixed(2);
  totalValueOutput.value = orderTotal;
}


function getAmountPlus() {
  const selectedButton = this;
  let buttonId = selectedButton.getAttribute('data-id');
  console.log('buttonID: ', buttonId) //, cardArray[cardId], 'next card value', cardArray[parseInt(cardId) + 9]);
  if (amount[buttonId] < 10) { // for simplifying let amount of items be nomer the 10
      amount[buttonId]++;

      shopCartList[buttonId].amount = amount[buttonId] // changing amount of item in the shopCart
      console.log('shopCartList[buttonId] = ', shopCartList[buttonId]);

      subTotal[buttonId] = price[buttonId] * amount[buttonId];
      // console.log('subtotal =', subTotal[buttonId]);
      orderTotal = (Number(orderTotal) + price[buttonId]).toFixed(2); // rounding, needs to be improve
      console.log('order total:', orderTotal);
  }
  let amountOutput = document.querySelector('#itemAmount_' + buttonId); // changing value on the screen
  amountOutput.textContent = amount[buttonId];

  let subTotalOutput = document.querySelector('#sabTotal_' + buttonId); // changing value on the screen;
  subTotalOutput.textContent = parseFloat(subTotal[buttonId]).toFixed(2); // rounding for 2 dec places
  totalValueOutput.value = orderTotal;
}
