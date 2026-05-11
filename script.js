let categories =
JSON.parse(localStorage.getItem("categories")) || [];

let products =
JSON.parse(localStorage.getItem("products")) || [];

const container =
document.getElementById("categoriesContainer");

function loadProducts(){

container.innerHTML = "";

if(categories.length === 0){

container.innerHTML =
"<h2 style='text-align:center'>No Categories Added</h2>";

return;

}

categories.forEach(category=>{

let categoryProducts =
products.filter(
product => product.category === category
);

let html = `
<div style="padding:20px">

<h2 style="color:#00ff99">
${category}
</h2>

<div style="
display:flex;
gap:15px;
overflow:auto;
">
`;

categoryProducts.forEach(product=>{

html += `
<div style="
background:#111;
padding:15px;
border-radius:20px;
min-width:220px;
">

<img src="${product.image}"
style="
width:100%;
height:200px;
object-fit:cover;
border-radius:15px;
">

<h3>${product.name}</h3>

<p style="color:#00ff99">
৳ ${product.price}
</p>

<button style="
width:100%;
padding:12px;
border:none;
border-radius:12px;
background:#00aa66;
color:white;
">

Buy Now

</button>

</div>
`;

});

html += "</div></div>";

container.innerHTML += html;

});

}

function showHome(){
alert("Home Page");
}

function showHistory(){
alert("No Order History");
}

function showSupport(){
window.open(
"https://t.me/Yangchun11"
);
}

loadProducts();
