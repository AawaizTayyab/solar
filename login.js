function login(){

let name = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(name.trim()===""){
alert("Enter your name");
return;
}

localStorage.setItem("username", name);

// Admin credentials
let adminUser = "admin";
let adminPass = "FXCH13KRDLTHS5";

if(name === adminUser && pass === adminPass){

localStorage.setItem("admin","true");
window.location.href = "admin.html";

}else{

localStorage.setItem("admin","false");
window.location.href = "index.html";

}

}