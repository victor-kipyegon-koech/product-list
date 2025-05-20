

const menuItems = [
  { name: "Waffle with Berries", price: 6.5, img: "./images/image-waffle-desktop.jpg" },
  { name: "Vanilla Bean Crème Brûlée", price: 7.0, img: "./images/image-creme-brulee-desktop.jpg" },
  { name: "Macaron Mix of Five", price: 8.0, img: "./images/image-macaron-desktop.jpg" },
  { name: "Classic Tiramisu", price: 5.5, img: "./images/image-tiramisu-desktop.jpg" },
  { name: "Pistachio Baklava", price: 4.0, img: "./images/image-baklava-desktop.jpg" },
  { name: "Lemon Meringue Pie", price: 5.0, img: "./images/image-meringue-desktop.jpg" },
  { name: "Strawberry Shortcake", price: 6.0, img: "./images/image-cake-desktop.jpg" },
  { name: "Brownie Deluxe", price: 5.5, img: "./images/image-brownie-desktop.jpg" },
  { name: "Vanilla Panna Cotta", price: 6.5, img: "./images/image-panna-cotta-desktop.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};
const menuContainer = document.getElementById("menu-items");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const confirmBtn = document.getElementById("confirm-btn");

function renderMenu() {
  menuItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="info">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    menuContainer.appendChild(card);
  });
}


function addToCart(index) {
  const item = menuItems[index];
  if (cart[item.name]) {
    cart[item.name].qty += 1;
  } else {
    cart[item.name] = { price: item.price, qty: 1 };
  }
  updateCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name].qty -= 1;
    if (cart[name].qty <= 0) delete cart[name];
    updateCart();
  }
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.keys(cart).forEach(name => {
    const { price, qty } = cart[name];
    total += price * qty;
    count += qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${qty}x ${name} - $${(price * qty).toFixed(2)}
      <button onclick=\"removeFromCart('${name}')\">&minus;</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
  localStorage.setItem('cart', JSON.stringify(cart));
}

confirmBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Order confirmed! Thank you.");
  cart = {};
  localStorage.removeItem('cart');
  updateCart();
});

renderMenu();
updateCart();