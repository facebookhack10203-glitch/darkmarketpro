let categories =
JSON.parse(localStorage.getItem("categories")) || [];

let products =
JSON.parse(localStorage.getItem("products")) || [];

const categoriesContainer =
document.getElementById("categoriesContainer");

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
onclick="buyProduct('${product.name}')">

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

function buyProduct(productName){

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

orders.push(productName);

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

loadOrders();

alert(productName + " Ordered");

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

loadProducts();
loadOrders();
