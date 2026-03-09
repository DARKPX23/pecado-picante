function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || []

let existe = cart.find(p => p.name === name)

if(existe){
existe.qty += 1
}else{
cart.push({
name,
price,
image,
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

let total = 0

cart.forEach(p=>{
total += p.qty
})

contador.innerText = total

}

}

/* CONFIRMAR COMPRA */

function confirmarCompra(){

let cart = JSON.parse(localStorage.getItem("cart")) || []

if(cart.length === 0){
alert("El carrito está vacío")
return
}

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
let productos = JSON.parse(localStorage.getItem("productos")) || []

cart.forEach(p=>{

pedidos.push({
nombre:p.name,
cantidad:p.qty,
total:p.price * p.qty,
fecha:new Date().toLocaleDateString()
})

let producto = productos.find(prod =>
prod.name.toLowerCase() === p.name.toLowerCase()
)

if(producto){

producto.stock -= p.qty

if(producto.stock < 0){
producto.stock = 0
}

}

})

localStorage.setItem("pedidos",JSON.stringify(pedidos))
localStorage.setItem("productos",JSON.stringify(productos))

localStorage.removeItem("cart")

alert("Compra realizada 🌶")

updateCart()

window.location = "tienda.html"

}

updateCart()