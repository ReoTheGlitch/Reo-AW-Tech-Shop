document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = PRODUCTS[id];
    if (!product) return;

    document.getElementById("productTitle").textContent = product.title;
    document.getElementById("productPrice").textContent = "$" + product.price;
    document.getElementById("productImage").src = product.image;

    // Optional description fallback
    if (document.getElementById("productDesc")) {
        document.getElementById("productDesc").textContent =
            product.desc || "High quality tech product from Reo AW.";
    }

    // Specs
    const specsEl = document.getElementById("productSpecs");
    if (product.specs && specsEl) {
        specsEl.innerHTML = "";
        product.specs.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            specsEl.appendChild(li);
        });
    }

    /* ================= ADD TO CART ================= */
    const btn = document.getElementById("addToCartBtn");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (cart[id]) {
        btn.textContent = "Added ✓";
        btn.disabled = true;
    }

    btn.addEventListener("click", () => {
        addToCart(id);
        btn.textContent = "Added ✓";
        btn.disabled = true;
    });

});
