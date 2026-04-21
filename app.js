// Mock Data for JWELLJIVE Products
const products = [
    {
        id: 1,
        title: "Kundan Antique Choker Set",
        price: "₹18,500",
        image: "assets/jwelljive_necklace_1776396239567.png",
        category: "necklace"
    },
    {
        id: 2,
        title: "Royal Emerald Chandelier Earrings",
        price: "₹6,200",
        image: "assets/jwelljive_earrings_1776396255364.png",
        category: "earrings"
    },
    {
        id: 3,
        title: "Temple Jewellery Bridal Long Haar",
        price: "₹24,000",
        image: "assets/jwelljive_necklace_1776396239567.png", // reusing image for demo
        category: "necklace"
    },
    {
        id: 4,
        title: "Ruby Studded Jhumkas",
        price: "₹4,800",
        image: "assets/jwelljive_earrings_1776396255364.png", // reusing image for demo
        category: "earrings"
    }
];

// DOM Elements
const productContainer = document.getElementById('product-container');
const header = document.getElementById('header');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');

// Cart DOM Elements
const cartIconContainer = document.getElementById('cart-icon-container');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCount = document.getElementById('cart-count');

// Cart State
let cartItems = [];

// Render Products
function renderProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.title}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productContainer.appendChild(card);
    });
}

// Add to Cart Logic
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    cartItems.push(product);
    renderCart();

    toastMsg.innerText = `${product.title} has been added to your cart.`;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Remove from Cart Logic
window.removeFromCart = function(index) {
    cartItems.splice(index, 1);
    renderCart();
}

// Render Cart Drawer
function renderCart() {
    // Update Badge
    cartCount.innerText = cartItems.length;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        cartTotalAmount.innerText = '₹0';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        // Convert string price to number (remove ₹ and commas)
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        total += priceNum;

        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    
    // Format Total
    cartTotalAmount.innerText = '₹' + total.toLocaleString('en-IN');
}

// Cart Drawer Toggles
cartIconContainer.addEventListener('click', () => {
    cartOverlay.classList.add('show');
    cartDrawer.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
    cartDrawer.classList.remove('open');
});

cartOverlay.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
    cartDrawer.classList.remove('open');
});

// Scroll Effect for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '1rem 2rem';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
        header.style.padding = '1.5rem 2rem';
        header.style.boxShadow = 'none';
    }
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
