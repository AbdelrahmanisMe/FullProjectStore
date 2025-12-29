// --- Dark Mode Toggle ---
let moon = document.getElementById("ToggletoDark");
let body = document.body;

moon.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
    }
});

// --- Save Theme on Load ---
const savetheme = localStorage.getItem("theme");
if (savetheme == "dark") {
    body.classList.replace("light", "dark");
} else if (savetheme == "light") {
    body.classList.replace("dark", "light");
}

// --- Cart Logic ---
let items = document.querySelector(".grid");
let basket = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// دالة لتحديث الرقم فوق السلة (Badge)
function updateBadge() {
    let cartBadge = document.querySelector(".cart-count");
    // فحص إذا كان العنصر موجود عشان ما يعملش ايرور
    if (cartBadge) {
        cartBadge.innerText = basket.length;
    }
}

function displayorder(basket) {
    total = 0;
    items.innerHTML = ""; // مسح المحتوى القديم

    if (basket.length === 0) {
        items.innerHTML = `
            <div style="text-align: center; padding: 50px 0; color: rgba(255,255,255,0.7);">
                <i class="fa-solid fa-cart-shopping" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                <h2 style="font-weight: bold;">Your Cart is Empty</h2>
            </div>`;
        // تحديث الرقم للصفر
        updateBadge();
        return 0;
    }

    basket.forEach(product => {
        items.innerHTML += `
            <div class="item">
                <div class="row">
                    <div class="imge">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div>
                        <h3>${product.title}</h3>
                        <span>${product.category}</span>
                        <div class="price-display">$${product.price}</div>    
                    </div>
                </div> 
                <div class="quantity">
                    <button onclick="decrease(${product.id})">-</button>
                    <span>${product.quantity}</span> 
                    <button onclick="increase(${product.id})">+</button>
                </div>
                <div class="del" onclick="removeitem(${product.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>`;
        total += product.price * product.quantity;
    });
    
    // تحديث الرقم بعد العرض
    updateBadge();
    return total;
}

// تحميل السلة
displayorder(basket);

// --- Decrease Quantity ---
function decrease(id) {
    basket.find(p => {
        if (p.id == id) {
            p.quantity > 1 ? p.quantity -= 1 : p.quantity = 1;
        }
    });
    displayorder(basket);
    updateLocalStorage();
}

// --- Increase Quantity ---
function increase(id) {
    basket.find(p => {
        if (p.id == id) {
            p.quantity < 15 ? p.quantity += 1 : p.quantity = 15;
        }
    });
    displayorder(basket);
    updateLocalStorage();
}

// --- Remove Single Item ---
let removeitem = (id) => {
    Swal.fire({
        title: "Remove it?",
        text: "Are you sure you want to remove this item from cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4757",
        cancelButtonColor: "#333",
        confirmButtonText: "Yes, Remove"
    }).then((result) => {
        if (result.isConfirmed) {
            // ترشيح المصفوفة (حذف المنتج)
            basket = basket.filter(product => product.id != id);
            updateLocalStorage(); // حفظ
            displayorder(basket); // إعادة العرض والرقم هيقل هنا
        }
    });
}

// --- Clear Cart Function ---
function removecart() {
    Swal.fire({
        title: 'Clear Cart?',
        text: "Are you sure you want to clear all items?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, Clear it'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("cart", "[]");
            basket = []; // تفريغ المصفوفة
            displayorder(basket); // الرقم هيصفر هنا
        }
    });
}

// --- Pay / Checkout Function ---
function pay() {
    let currentTotal = displayorder(basket);
    
    if (currentTotal === 0 || basket.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Cart Empty",
            text: "Your cart is empty. Add some products first!",
            confirmButtonColor: "#0099ff"
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Order Successful!",
            html: `Thank you for your purchase!<br><b>Total: $${currentTotal.toFixed(2)}</b>`,
            confirmButtonColor: "#0099ff"
        });
        localStorage.setItem("cart", "[]");
        basket = []; // تفريغ السلة والدفعان
        displayorder(basket); // الرقم هيصفر
    }
}

// --- Helper: Update LocalStorage ---
function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(basket));
}
