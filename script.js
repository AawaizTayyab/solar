// PRODUCT DATA
let products = JSON.parse(localStorage.getItem("products")) || [];

// DISPLAY PRODUCTS
function displayProducts(list){
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if(list.length === 0){
        productList.innerHTML = "<p class='text-muted'>No products found</p>";
        return;
    }

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-4";
        div.innerHTML = `
            <div class="product">
                <img src="${p.img}">
                <h6>${p.name}</h6>
                <p><b>${p.desc ? p.desc : ''}</b></p>
                <p>Rs ${p.price}</p>
            </div>
        `;
        productList.appendChild(div);
    });
}

// SHOW ALL PRODUCTS INITIALLY
displayProducts(products); // <--- This makes all products visible on page load

// CATEGORY FILTER
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-cat");
        if(cat==="all") displayProducts(products);
        else displayProducts(products.filter(p=>p.cat===cat));
    });
});

// ADMIN PASSWORD
document.getElementById("adminPassword").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        const password = this.value.trim();
        if(password === "admin123"){
            window.location.href = "admin.html";
        } else {
            alert("Wrong Password");
            this.value="";
        }
    }
});

// SHOW ALL PRODUCTS INITIALLY
displayProducts(products);

// Optionally, update every 2 seconds to get new admin products
setInterval(() => {
    products = JSON.parse(localStorage.getItem("products")) || [];
    displayProducts(products);
}, 2000);



document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-cat");

        // Filter products and display
        if(cat === "all") displayProducts(products);
        else displayProducts(products.filter(p => p.cat === cat));

        // Keep selected category highlighted
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active-category"));
        btn.classList.add("active-category");

        // Close mobile offcanvas after selection
        const offcanvasEl = document.getElementById("mobileSidebar");
        if(offcanvasEl.classList.contains("show")){
            bootstrap.Offcanvas.getInstance(offcanvasEl).hide();
        }
    });
});

// Store currently selected category
let currentCategory = "all";

// Function to display products based on currentCategory
function showCurrentCategoryProducts() {
    if(currentCategory === "all") displayProducts(products);
    else displayProducts(products.filter(p => p.cat === currentCategory));
}

// Category button click
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.getAttribute("data-cat"); // update current category

        // Display products for selected category
        showCurrentCategoryProducts();

        // Highlight the selected button
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active-category"));
        btn.classList.add("active-category");

        // Close mobile offcanvas if open
        const offcanvasEl = document.getElementById("mobileSidebar");
        if(offcanvasEl.classList.contains("show")){
            bootstrap.Offcanvas.getInstance(offcanvasEl).hide();
        }
    });
});

// Initially display products of default category
showCurrentCategoryProducts();

document.addEventListener("DOMContentLoaded", function(){

let username = localStorage.getItem("username");

if(username){

let loginBtn = document.getElementById("loginBtn");
let profile = document.getElementById("profileCircle");

if(loginBtn){
loginBtn.style.display="none";
}

if(profile){

profile.classList.remove("d-none");

let initials = username
.split(" ")
.map(word => word.charAt(0))
.join("")
.toUpperCase();

profile.innerText = initials;

}

}

});