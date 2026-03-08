function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let existe = cart.find(p => p.name === name)

if(existe){
existe.qty += 1
}else{
cart.push({
name,
price,
image,   // 🔥 AGREGAMOS IMAGEN
qty:1
})
}

localStorage.setItem("cart",JSON.stringify(cart))

updateCart()

alert(name+" agregado al carrito 🌶")

}

function updateCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let contador = document.getElementById("contador")

if(contador){
contador.innerText = cart.length
}

}

/* CONFIRMAR COMPRA */

function confirmarCompra(){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

cart.forEach(p=>{

pedidos.push({
nombre:p.name,
cantidad:p.qty,
total:p.price * p.qty,
fecha:new Date().toLocaleDateString()
})

})

localStorage.setItem("pedidos",JSON.stringify(pedidos))

localStorage.removeItem("cart")

alert("Compra realizada 🌶")

updateCart()

}


/* GUARDAR PRODUCTOS POR PRIMERA VEZ EN LOCALSTORAGE */

let productosGuardados = JSON.parse(localStorage.getItem("productos"))

if(!productosGuardados){

let productosDefault = [

{
name:"Salsa Macha De Arandano",
price:80,
stock:10,
image:"img/salsa-macha-arandano.jpg"
},

{
name:"Salsa Macha Clasica",
price:75,
stock:12,
image:"img/salsa-macha-clasica.jpg"
}

]

localStorage.setItem("productos", JSON.stringify(productosDefault))

}