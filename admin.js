// Load products from localStorage or start with empty array
let products = JSON.parse(localStorage.getItem("products")) || [];
// Protect admin page
if(localStorage.getItem("admin") !== "true"){
    window.location.href = "index.html";
}

// ===== ADD PRODUCT =====
function addProduct() {
    let name = document.getElementById("addName").value.trim();
    let price = document.getElementById("addPrice").value.trim();
    let desc = document.getElementById("addDesc").value.trim();
    let cat = document.getElementById("addCategory").value;
    let imgFile = document.getElementById("addImage").files[0];

    if(!name || !price || !desc || !imgFile){
        alert("Please fill all fields and choose an image");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(){
        let product = { name, price, desc, cat, img: reader.result };
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product Added Successfully!");

        // Clear Add Product Fields
        document.getElementById("addName").value = "";
        document.getElementById("addPrice").value = "";
        document.getElementById("addDesc").value = "";
        document.getElementById("addImage").value = "";

        loadProducts(); // refresh update panel
    };
    reader.readAsDataURL(imgFile);
}

// ===== LOAD PRODUCTS FOR UPDATE =====
function loadProducts(){
    const cat = document.getElementById("updateCategory").value;
    const list = document.getElementById("productList");
    list.innerHTML = "";

    if(!cat) return;

    // Filter and get original array indexes
    const filteredIndexes = [];
    products.forEach((p, index) => { if(p.cat===cat) filteredIndexes.push(index); });

    filteredIndexes.forEach((indexInProducts)=>{
        const p = products[indexInProducts];
        list.innerHTML += `
        <div class="card mb-2 p-2">
            <div class="d-flex justify-content-between align-items-start">
                <div style="flex:1;">
                    <b>${p.name}</b><br>
                    Rs ${p.price}<br>
                    ${p.desc}<br>
                    <img src="${p.img}" style="width:100px; margin-top:5px; border-radius:5px;">
                    <br>
                    <input type="file" id="imgInput${indexInProducts}" style="margin-top:5px;">
                    <button class="btn btn-sm btn-success mt-1" id="uploadBtn${indexInProducts}">Upload</button>
                </div>
                <div class="d-flex flex-column align-items-end">
                    <button class="btn btn-sm btn-primary mb-1" onclick="editProduct(${indexInProducts})">✏</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${indexInProducts})">🗑</button>
                </div>
            </div>
        </div>
        `;

        // Upload button event
        const uploadBtn = document.getElementById(`uploadBtn${indexInProducts}`);
        uploadBtn.addEventListener('click', function(){
            const fileInput = document.getElementById(`imgInput${indexInProducts}`);
            const file = fileInput.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = function(){
                    products[indexInProducts].img = reader.result; // update actual product
                    localStorage.setItem("products", JSON.stringify(products));
                    loadProducts(); // refresh list
                    alert("Image uploaded successfully!");
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please choose a file first!");
            }
        });
    });
}

// ===== EDIT PRODUCT TEXT =====
function editProduct(i){
    let p = products[i];
    let newName = prompt("Edit Name", p.name);
    let newPrice = prompt("Edit Price", p.price);
    let newDesc = prompt("Edit Description", p.desc);

    if(newName) p.name = newName;
    if(newPrice) p.price = newPrice;
    if(newDesc) p.desc = newDesc;

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Updated!");
    loadProducts();
}

// ===== DELETE PRODUCT =====
function deleteProduct(i){
    if(confirm("Are you sure you want to delete this product?")){
        products.splice(i, 1); // remove from array
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product Deleted!");
        loadProducts();
    }
}
function logout(){

localStorage.removeItem("adminLoggedIn");

window.location.href = "index.html";

}