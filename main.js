// --- Swiper Slider Config ---
const swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// --- Products Logic ---
let products;
let card = document.getElementById("cards");
let spinner = document.getElementById("spinner");

const getproducts = async () => {
  try {
    spinner.style.display = "inline-block";
    const response = await fetch("https://Fakestoreapi.com/products");
    let data = await response.json();
    products = data;
    setTimeout(() => {
        spinner.style.display = "none";
        filterandsort();
    }, 1000);   
  } catch (error) {  
    spinner.style.display = "none";
    card.innerHTML = `<h1 style="text-align:center;">404 Not Found</h1>`;
  }
}
getproducts();

// --- Welcome Message Logic ---
let welcome = document.getElementById("welcomeMessage");
let close_btn = document.getElementById("closeMessage");
let hi = 0;
if(hi === 1){
    window.removeEventListener("load", timeout);
} else {
    const timeout = () => setTimeout(() => {
        welcome.style = "display:block;opacity:1;";
        localStorage.setItem("message", 1);
        hi = localStorage.getItem("message");
    }, 1000);
    window.addEventListener("load", timeout);
}
close_btn.addEventListener("click", () => {  
  welcome.style = "display:none;";
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

// --- Save Theme in LocalStorage ---
const savetheme = localStorage.getItem("theme");
if(savetheme == "dark"){
    body.classList.replace("light","dark");
} else if(savetheme == "light"){
    body.classList.replace("dark","light");
}

// --- Display Products Function ---
function getdatadisplay(listofproducts) {
  card.innerHTML = null;
  if(listofproducts.length == 0){
      card.innerHTML = `<p style="font-size:2rem;font-weight:900;text-align:center;">Product Not Found</p>`;
  } else {
      listofproducts.forEach((product) => {
          card.innerHTML += 
          `<div class="productcard">
                <div class="img">
                      <img class="img" src=${product.image} alt="">
                  </div>
                  <div class="descrip">
                      <div class="col">
                          <category style="opacity:.7;">${product.category}</category>
                          <span class="title">${product.title}</span>
                          <description class="description" style="color: gray;">${product.description}</description>
                      </div>
                          <rating class="rate">
                              <div class="stars">
                                  ${starRate(product.rating.rate)}
                              </div>
                              <div class="count-rate" style="font-size:1rem;">(${product.rating.count})</div>
                          </rating>
                          <price class="price" style="font-size: 1.4rem; font-weight:600;">$${product.price}</price>
                          <div class="row">
                              <button onclick="exist(${product.id})" class="addto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"   
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        >
                                        <path
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                            />
                                        </svg>
                                        Add to card
                              </button>
                                <button class="heart">
                                  <i class="far fa-heart"></i>
                                </button>
                          </div>
                    </div>
        </div>`;
      });
  }
}

// --- Stars Rating Helper ---
function starRate(rate) {
    let stars = "";
    let fullstar, halfstar; 
    fullstar = Math.floor(rate);
    halfstar = rate % 1 != 0;
    for(let i = 0; i < fullstar; i++){
      stars += `<i class="star fa-solid fa-star"></i>`;
    }
    if(halfstar){
      stars += `<i class="fas fa-star-half-alt"></i>`
    }
    return stars;
}

// --- Filter & Sort Logic (FIXED BUGS) ---
let category = document.getElementById("categories");
let filterprice = document.getElementById("filterby");
let searchbox = document.getElementById("search");
const saveCatego = localStorage.getItem("savecategory");

if(saveCatego != undefined){
    category.value = saveCatego;
} else {
    category.value = "all";
}
setTimeout(() => {
  localStorage.removeItem("savecategory");
}, 60000);

function filterandsort() {
    const selectedcategory = category.value;
    let fiterproducts = [];
    
    // Save category selection
    localStorage.setItem("savecategory", selectedcategory);

    // 1. Filter by Category
    if(selectedcategory !== "all"){
        fiterproducts = products.filter((product) => product.category === selectedcategory);
    } else if(selectedcategory === "all"){
        fiterproducts = products;
    }

    // 2. Filter by Search (Input)
    let searchvalue = searchbox.value.toLowerCase().trim();
    if(searchvalue !== "") {
        fiterproducts = fiterproducts.filter((product) => 
            product.title.toLowerCase().includes(searchvalue)
        );
    }

    // 3. Sort Products (FIXED LOGIC)
    let sortprice = filterprice.value;
    if(sortprice === "price-asc"){
        fiterproducts.sort((a, b) => a.price - b.price);
    } else if(sortprice === "price-desc"){ // Fixed typo "rice-desc" to "price-desc"
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
localStorage.setItem("cart-len", cartbasket.length);

function addcart(id){
    let item = products.find((p) => p.id == id);
    if(!item){ return; }
    cartbasket.push({
        ...item,
        quantity: 1,
    });
    Swal.fire({
        title: "prodect add",
        text: `${item.title}`,
        icon: "success",
        draggable: true
    });      
    localStorage.setItem("cart", JSON.stringify(cartbasket));
    count.textContent = cartbasket.length;
}

function exist(id){
    let exist = cartbasket.find((item) => item.id == id);
    if(exist){
      Swal.fire({
        title: "Prodect already ON",
        text: `${exist.title}`,
        icon: "info",
        draggable: false,
      });
    } else {
        addcart(id);
    }
}

// --- LOGIN/LOGOUT UI LOGIC (FIXED) ---
// Get DOM elements
const loginLink = document.getElementById("loginLink");
const navUser = document.getElementById("navUser");
const logoutBtn = document.getElementById("logoutBtn");

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    // User is logged in
    if (loginLink) loginLink.style.display = "none"; // Hide Login Icon
    
    if (navUser) {
        navUser.style.display = "inline-block"; // Show Name
        navUser.innerText = currentUser.username;
    }
    
    if (logoutBtn) logoutBtn.style.display = "inline-block"; // Show Logout Icon
} else {
    // User is not logged in
    if (loginLink) loginLink.style.display = "block";
    if (navUser) navUser.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
}

// Logout Event
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.reload();
    });
}