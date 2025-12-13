document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");

    const title = document.getElementById("productsTitle");
    const cards = document.querySelectorAll(".product-card");

    /* ================= CATEGORY FILTER ================= */
    cards.forEach(card => (card.style.display = "flex"));

    if (category) {
        title.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);

        cards.forEach(card => {
            if (card.dataset.category !== category) {
                card.style.display = "none";
            }
        });
    } else {
        title.textContent = "All Products";
    }

    /* ================= CART BUTTONS ================= */
    const cart = getCart(); // ✅ unified cart API

    document.querySelectorAll(".product-card").forEach(card => {
        const id = card.dataset.id;
        const button = card.querySelector(".add-to-cart");

        if (!id || !button) return;

        // Already in cart → lock button
        if (cart[id]) {
            button.textContent = "Added ✓";
            button.disabled = true;
            return;
        }

        button.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();

            addToCart(id, button); // ✅ button handled inside util
        });
    });
});
