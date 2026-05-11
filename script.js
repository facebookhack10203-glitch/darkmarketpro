let categories =
JSON.parse(localStorage.getItem("categories")) || [];

let products =
JSON.parse(localStorage.getItem("products")) || [];

const categoriesContainer =
document.getElementById("categoriesContainer");

let currentProduct = "";

function loadProducts(){

if(!categoriesContainer) return;

categoriesContainer.innerHTML = "";

if(categories.length === 0){

categoriesContainer.innerHTML = `
<div class="no-products">
No Categories Added
</div>
`;

return;

}

categories.forEach(category=>{

let categoryProducts =
products.filter(
product => product.category === category
);

let productHTML = "";

if(categoryProducts.length === 0){

productHTML = `
<div class="no-products">
No Products Added
</div>
`;

}else{

categoryProducts.forEach(product=>{

productHTML += `

<div class="product">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>৳ ${product.price}</p>

<button class="buy-btn"
onclick="openOrderForm('${product.name}')">

Buy Now

</button>

</div>

`;

});

}

categoriesContainer.innerHTML += `

<div class="category">

<div class="category-title">
${category}
</div>

<div class="products">
${productHTML}
</div>

</div>

`;

});

}

function openOrderForm(productName){

currentProduct = productName;

showPage('orderPage');

}

function continuePayment(){

let fullName =
document.getElementById("fullName").value;

let district =
document.getElementById("district").value;

let village =
document.getElementById("village").value;

let phone =
document.getElementById("phone").value;

if(
fullName === "" ||
district === "" ||
village === "" ||
phone === ""
){

alert("Fill All Fields");
return;

}

showPage('paymentPage');

}

function copyNumber(){

navigator.clipboard.writeText(
"01944875610"
);

alert("Number Copied");

}

function submitOrder(){

let trxid =
document.getElementById("trxid").value;

let paymentMethod =
document.getElementById("paymentMethod").value;

if(trxid === ""){

alert("Enter Transaction ID");
return;

}

let orders =
JSON.parse(localStorage.getItem("adminOrders")) || [];

orders.push({

product: currentProduct,

name:
document.getElementById("fullName").value,

district:
document.getElementById("district").value,

village:
document.getElementById("village").value,

phone:
document.getElementById("phone").value,

trxid,
paymentMethod,
status:"Pending"

});

localStorage.setItem(
"adminOrders",
JSON.stringify(orders)
);

let history =
JSON.parse(localStorage.getItem("orders")) || [];

history.push(currentProduct);

localStorage.setItem(
"orders",
JSON.stringify(history)
);

loadOrders();

alert("Order Submitted Successfully");

showPage('homePage');

}

function loadOrders(){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

let historyContent =
document.getElementById("historyContent");

if(!historyContent) return;

if(orders.length === 0){

historyContent.innerHTML =
"এখনো পর্যন্ত কোনো অর্ডার করা হয়নি";

}else{

historyContent.innerHTML = "";

orders.forEach(order=>{

historyContent.innerHTML += `

<div style="
background:#000;
padding:15px;
margin-top:15px;
border-radius:15px;
">

✅ ${order}

</div>

`;

});

}

}

/* INSTALL APP */

let deferredPrompt;

window.addEventListener(
'beforeinstallprompt',
(e)=>{

e.preventDefault();

deferredPrompt = e;

document.getElementById(
'installBtn'
).style.display = 'inline-block';

});

document.getElementById(
'installBtn'
).addEventListener(
'click',
async ()=>{

if(deferredPrompt){

deferredPrompt.prompt();

}

});

loadProducts();
loadOrders();
