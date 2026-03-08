
/* PRODUCTOS */
let productos = JSON.parse(localStorage.getItem("productos"))

/* PRODUCTOS POR DEFECTO (LOS DE LA TIENDA) */
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

/* DASHBOARD */
function actualizarDashboard(){

let total = productos.length
let valor = 0

productos.forEach(p=>{
valor += p.price * p.stock
})

document.getElementById("totalProductos").innerText = total
document.getElementById("valorInventario").innerText = "$" + valor
document.getElementById("ventasTotales").innerText = pedidos.length

}

/* AGREGAR PRODUCTO */
function agregarProducto(){

let nombre = document.getElementById("nombreProducto").value
let precio = Number(document.getElementById("precioProducto").value)
let stock = Number(document.getElementById("stockProducto").value)
let imagen = document.getElementById("imagenProducto").value

let nuevo = {
name:nombre,
price:precio,
stock:stock,
image:imagen
}

productos.push(nuevo)

localStorage.setItem("productos",JSON.stringify(productos))

alert("Producto agregado 🌶")

actualizarPedidosYDashboard()

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

new Chart(document.getElementById("graficaVentas"),{

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

/* ACTUALIZAR SISTEMA COMPLETO */
function actualizarPedidosYDashboard(){

pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

actualizarDashboard()
mostrarPedidos()
graficaVentas()

}

/* CERRAR SESION */
function cerrarSesion(){
window.location.href="login.html"
}

/* INICIAR */
actualizarPedidosYDashboard()