// --- Swiper Slider Config ---
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
});

// --- Products Logic ---
let products;
let card = document.getElementById("cards");
let spinner = document.getElementById("spinner");

const getproducts = async () => {
    try {
        spinner.style.display = "block";
        const response = await fetch("https://Fakestoreapi.com/products");
        let data = await response.json();
        products = data;
        setTimeout(() => {
            spinner.style.display = "none";
            filterandsort();
        }, 1000);   
    } catch (error) {  
        spinner.style.display = "none";
        card.innerHTML = `<h2 class="text-center text-white w-100">404 Not Found</h2>`;
    }
}
getproducts();

// --- Welcome Message Logic ---
let welcome = document.getElementById("welcomeMessage");
let close_btn = document.getElementById("closeMessage");
let hi = localStorage.getItem("message");

if(hi != "1"){
    const timeout = () => setTimeout(() => {
        welcome.style.display = "flex";
        welcome.style.opacity = "1";
        localStorage.setItem("message", "1");
    }, 1000);
    window.addEventListener("load", timeout);
} else {
    welcome.style.display = "none";
}
close_btn.addEventListener("click", () => {  
  welcome.style.display = "none";
});

// --- Dark/Light Mode Toggle ---
let moon = document.getElementById("ToggletoDark");
let body = document.body;

moon.addEventListener("click", () => {
  if(body.classList.contains("light")){
    body.classList.replace("light","dark");
    localStorage.setItem("theme","dark");
  } else {
    body.classList.replace("dark","light");
    localStorage.setItem("theme","light");
  }
});

const savetheme = localStorage.getItem("theme");
if(savetheme == "dark") body.classList.replace("light","dark");

// --- Display Products Function (Bootstrap Cards) ---
function getdatadisplay(listofproducts) {
  card.innerHTML = "";
  if(listofproducts.length == 0){
      card.innerHTML = `<h3 class="text-white w-100 text-center">Product Not Found</h3>`;
  } else {
      listofproducts.forEach((product) => {
          card.innerHTML += 
          `<div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 glass-card">
                    <div class="card-img-top-container">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${product.title}</h5>
                        <p class="card-text text-white-50 small text-truncate" style="max-height: 40px; overflow:hidden;">${product.description}</p>
                        
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="text-warning small">
                                    <i class="fas fa-star"></i> ${product.rating.rate}
                                </span>
                                <span class="fw-bold text-info h5 mb-0">$${product.price}</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button onclick="exist(${product.id})" class="btn btn-glass w-100">
                                    <i class="fas fa-cart-plus"></i> Add
                                </button>
                                <button class="btn btn-glass-icon">
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
      });
  }
}

// --- Stars (Simplified for Bootstrap UI) ---
// (Removed helper star function as we just show rating number)

// --- Filter & Sort Logic ---
let category = document.getElementById("categories");
let filterprice = document.getElementById("filterby");
let searchbox = document.getElementById("search");

function filterandsort() {
    const selectedcategory = category.value;
    let fiterproducts = [];
    
    if(selectedcategory !== "all"){
        fiterproducts = products.filter((product) => product.category === selectedcategory);
    } else {
        fiterproducts = products;
    }

    // Search
    let searchvalue = searchbox.value.toLowerCase().trim();
    if(searchvalue !== "") {
        fiterproducts = fiterproducts.filter((product) => 
            product.title.toLowerCase().includes(searchvalue)
        );
    }

    // Sort
    let sortprice = filterprice.value;
    if(sortprice === "price-asc"){
        fiterproducts.sort((a, b) => a.price - b.price);
    } else if(sortprice === "price-desc"){
        fiterproducts.sort((a, b) => b.price - a.price);
    } else if(sortprice === "rating-desc"){
        fiterproducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    getdatadisplay(fiterproducts);
}

searchbox.addEventListener("input", filterandsort);
category.addEventListener("change", filterandsort);
filterprice.addEventListener("change", filterandsort);

// --- Add to Cart Logic ---
let count = document.querySelector(".cart-count");
let cartbasket = JSON.parse(localStorage.getItem("cart")) || [];
count.innerText = cartbasket.length;

function addcart(id){
    let item = products.find((p) => p.id == id);
    if(!item){ return; }
    cartbasket.push({...item, quantity: 1});
    Swal.fire({ title: "Product add", text: `${item.title}`, icon: "success" });      
    localStorage.setItem("cart", JSON.stringify(cartbasket));
    count.textContent = cartbasket.length;
}

function exist(id){
    let exist = cartbasket.find((item) => item.id == id);
    if(exist){
      Swal.fire({ title: "Already ON", text: `${exist.title}`, icon: "info" });
    } else {
        addcart(id);
    }
}

// --- LOGIN/LOGOUT UI ---
const loginLink = document.getElementById("loginLink");
const navUser = document.getElementById("navUser");
const logoutBtn = document.getElementById("logoutBtn");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    if (loginLink) loginLink.classList.add("d-none");
    if (navUser) {
        navUser.classList.remove("d-none");
        navUser.innerText = currentUser.username;
    }
    if (logoutBtn) logoutBtn.classList.remove("d-none");
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.reload();
    });
}