// Product data
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    image: "product1.jpg",
    category: "Category 1"
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    price: 24.99,
    image: "product2.jpg",
    category: "Category 2"
  },
  // Add more products here
];

// Cart data
let cart = [];

// Function to render product cards
function renderProductCards(products, container) {
  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Function to render category cards
function renderCategoryCards(categories, container) {
  container.innerHTML = "";
  categories.forEach(category => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.innerHTML = `
      <img src="${category.image}" alt="${category.name}">
      <h3>${category.name}</h3>
      <a href="#" onclick="filterProducts('${category.name}')">Shop Now</a>
    `;
    container.appendChild(card);
  });
}

// Function to filter products by category
function filterProducts(category) {
  const filteredProducts = products.filter(product => product.category === category);
  renderProductCards(filteredProducts, document.querySelector(".product-grid"));
}

// Function to add product to cart
function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  showCartNotification();
}

// Function to update cart UI
function updateCartUI() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";
  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });
  updateCartTotal();
}

// Function to remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Function to increase item quantity
function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
    updateCartUI();
  }
}

// Function to decrease item quantity
function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
    updateCartUI();
  }
}

// Function to update cart total
function updateCartTotal() {
  const cartTotal = document.querySelector(".cart-total");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle checkout
function checkout() {
  // Implement checkout logic here
  // e.g., send cart data to server, process payment, etc.
  alert("Thank you for your purchase!");
  cart = [];
  updateCartUI();
}

// Function to show cart notification
function showCartNotification() {
  const cartNotification = document.createElement("div");
  cartNotification.classList.add("cart-notification");
  cartNotification.textContent = "Item added to cart!";
  document.body.appendChild(cartNotification);
  setTimeout(() => {
    cartNotification.remove();
  }, 2000);
}

// Render product cards on page load
renderProductCards(products, document.querySelector(".product-grid"));

// Render category cards
const categories = Array.from(new Set(products.map(product => product.category)));
renderCategoryCards(categories, document.querySelector(".category-grid"));

// Add event listeners
document.querySelector(".search-bar button").addEventListener("click", () => {
  const searchQuery = document.querySelector(".search-bar input").value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)
  );
  renderProductCards(filteredProducts, document.querySelector(".product-grid"));
});

document.querySelector(".cart-button").addEventListener("click", () => {
  const cartOverlay = document.querySelector(".cart-overlay");
  cartOverlay.classList.toggle("show");
  updateCartUI();
});

document.querySelector(".checkout-button").addEventListener("click", checkout);

// Add event listener for closing cart overlay
document.querySelector(".cart-overlay").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.remove("show");
  }
});