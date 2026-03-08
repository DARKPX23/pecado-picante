let products = JSON.parse(localStorage.getItem("productos")) || [

{
name:"Salsa Macha De Arandano",
price:80,
stock:10,
image:"/img/salsa-macha-arandano.jpg"
},

{
name:"Salsa Macha Clasica",
price:75,
stock:12,
image:"/img/salsa-macha-clasica.jpg"
}

]

let container = document.getElementById("productos")

function mostrarProductos(lista){

container.innerHTML=""

lista.forEach(p=>{

container.innerHTML += `

<div class="producto">

<img src="${p.image}">

<div class="producto-content">

<h3>${p.name}</h3>

<p class="price">$${p.price}</p>

<p class="stock ${p.stock<=5?'low-stock':''}">

Stock: ${p.stock}

</p>

<button onclick="addToCart('${p.name}',${p.price},'${p.image}')">

Agregar al carrito

</button>

</div>

</div>

`

})

}

mostrarProductos(products)

function buscarProducto(){

let texto = document.getElementById("buscador").value.toLowerCase()

let filtrados = products.filter(p=>p.name.toLowerCase().includes(texto))

mostrarProductos(filtrados)

}

localStorage.setItem("productos", JSON.stringify(products))