const cartContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(id, delta) {
    const cart = getCart();

    if (!cart[id]) return;

    cart[id] += delta;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    saveCart(cart);
    renderCart();
}

function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = "";
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "";
        return;
    }

    for (const id in cart) {
        const product = PRODUCTS[id];
        const qty = cart[id];
        const subtotal = product.price * qty;
        total += subtotal;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            
            <div>
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>

                <div class="qty-controls">
                    <button class="qty-btn" onclick="changeQty('${id}', -1)">−</button>
                    <span class="qty">${qty}</span>
                    <button class="qty-btn" onclick="changeQty('${id}', 1)">+</button>
                </div>
            </div>

            <div>
                <p class="desc">$${subtotal}</p>
                <button class="btn back-btn" onclick="changeQty('${id}', -${qty})">
                    Remove
                </button>
            </div>
        `;

        cartContainer.appendChild(item);
    }

    cartTotalEl.textContent = `Total: $${total}`;
}

renderCart();
