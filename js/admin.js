/* PRODUCTOS */
let productos = JSON.parse(localStorage.getItem("productos"))

if(!productos){

productos = [

{
name:"Salsa Macha de Arandano",
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

}

/* PEDIDOS */
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

let grafica


/* DASHBOARD */
function actualizarDashboard(){

let total = productos.length
let valor = 0
let stockTotal = 0
let ganancias = 0

productos.forEach(p=>{
valor += p.price * p.stock
stockTotal += p.stock
})

pedidos.forEach(p=>{
ganancias += p.total
})

document.getElementById("totalProductos").innerText = total
document.getElementById("valorInventario").innerText = "$" + valor
document.getElementById("ventasTotales").innerText = pedidos.length

document.getElementById("stockTotal").innerText = stockTotal
document.getElementById("gananciasTotales").innerText = "$" + ganancias

}


/* AGREGAR PRODUCTO */
function agregarProducto(){

let nombre = document.getElementById("nombreProducto").value
let precio = Number(document.getElementById("precioProducto").value)
let stock = Number(document.getElementById("stockProducto").value)

let file = document.getElementById("imagenProducto").files[0]

if(file){

let reader = new FileReader()

reader.onload = function(e){

let nuevo = {
name:nombre,
price:precio,
stock:stock,
image:e.target.result
}

productos.push(nuevo)

localStorage.setItem("productos",JSON.stringify(productos))

alert("Producto agregado 🌶")

actualizarPedidosYDashboard()

}

reader.readAsDataURL(file)

}

}


/* MOSTRAR PRODUCTOS */
function mostrarProductos(){

let tabla = document.getElementById("tablaProductos")

if(!tabla) return

tabla.innerHTML=""

productos.forEach((p,i)=>{

tabla.innerHTML += `
<tr>

<td>
<img src="${p.image}" width="50">
</td>

<td>${p.name}</td>

<td>$${p.price}</td>

<td>${p.stock}</td>

<td>

<button onclick="editarProducto(${i})">Editar</button>

<button onclick="eliminarProducto(${i})">Eliminar</button>

</td>

</tr>
`

})

}


/* EDITAR PRODUCTO */
function editarProducto(i){

let p = productos[i]

let nombre = prompt("Nombre",p.name)
let precio = prompt("Precio",p.price)
let stock = prompt("Stock",p.stock)

productos[i].name = nombre
productos[i].price = Number(precio)
productos[i].stock = Number(stock)

localStorage.setItem("productos",JSON.stringify(productos))

actualizarPedidosYDashboard()

}


/* ELIMINAR PRODUCTO */
function eliminarProducto(i){

if(confirm("Eliminar producto?")){

productos.splice(i,1)

localStorage.setItem("productos",JSON.stringify(productos))

actualizarPedidosYDashboard()

}

}


/* PEDIDOS */
function mostrarPedidos(){

let tabla = document.getElementById("tablaPedidos")

tabla.innerHTML = ""

pedidos.forEach(p=>{

tabla.innerHTML += `
<tr>
<td>${p.nombre}</td>
<td>${p.cantidad}</td>
<td>$${p.total}</td>
<td>${p.fecha}</td>
</tr>
`

})

}


/* GRAFICA */
function graficaVentas(){

let ventas = {}

pedidos.forEach(p=>{

if(!ventas[p.nombre]){
ventas[p.nombre] = 0
}

ventas[p.nombre] += p.cantidad

})

let nombres = Object.keys(ventas)
let cantidades = Object.values(ventas)

if(grafica){
grafica.destroy()
}

grafica = new Chart(document.getElementById("graficaVentas"),{

type:"bar",

data:{
labels:nombres,
datasets:[{
label:"Ventas",
data:cantidades
}]
}

})

}


/* TOP PRODUCTOS */
function topProductosVendidos(){

let ventas = {}

pedidos.forEach(p=>{

if(!ventas[p.nombre]){
ventas[p.nombre] = 0
}

ventas[p.nombre] += p.cantidad

})

let lista = Object.entries(ventas)

lista.sort((a,b)=> b[1]-a[1])

let top = lista.slice(0,5)

let tabla = document.getElementById("topProductos")

if(!tabla) return

tabla.innerHTML=""

top.forEach(p=>{

tabla.innerHTML += `
<tr>
<td>${p[0]}</td>
<td>${p[1]}</td>
</tr>
`

})

}


/* ACTUALIZAR SISTEMA */
function actualizarPedidosYDashboard(){

pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

actualizarDashboard()
mostrarPedidos()
mostrarProductos()
graficaVentas()
topProductosVendidos()

}


/* CERRAR SESION */
function cerrarSesion(){
window.location.href="login.html"
}


/* INICIAR */
actualizarPedidosYDashboard()