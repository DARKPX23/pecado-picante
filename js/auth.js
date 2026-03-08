function login(){

let email = document.getElementById("email").value.trim()
let pass = document.getElementById("password").value.trim()

// ADMIN
if(email === "admin@pecadopicante.com" && pass === "admin123"){

localStorage.setItem("role","admin")
window.location.href = "admin.html"
return

}

// USER
if(email === "user@pecadopicante.com" && pass === "user123"){

localStorage.setItem("role","user")
window.location.href = "tienda.html"
return

}

alert("Correo o contraseña incorrectos")

}


/* PROTEGER ADMIN */

function checkAdmin(){

let role = localStorage.getItem("role")

if(role !== "admin"){
alert("No tienes permisos")
window.location.href = "index.html"
}

}


/* PROTEGER USUARIO */

function checkUser(){

let role = localStorage.getItem("role")

if(!role){
window.location.href = "index.html"
}

}


/* CERRAR SESIÓN */

function logout(){

localStorage.removeItem("role")
window.location.href = "index.html"

}