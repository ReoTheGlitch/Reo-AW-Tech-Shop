function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, button = null) {
    const cart = getCart();

    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);

    if (button) {
        button.textContent = "Added ✓";
        button.disabled = true;
    }
}
