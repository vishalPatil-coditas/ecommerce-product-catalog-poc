let currentCategory = "electronics";
let currentOffset = 0;
const PAGE_SIZE = 6;

const categorySelectEl = document.getElementById("category-select");
const loadMoreBtn = document.getElementById("load-more-btn");

// Initialize app
async function loadProducts(reset = false) {
  try {
    if (reset) {
      clearProductList();
      currentOffset = 0;
      hideProductDetails();
    }
    const products = await fetchProductsByCategory(currentCategory, PAGE_SIZE, currentOffset);
    renderProducts(products);
    currentOffset += PAGE_SIZE;

    // Hide load more if less than PAGE_SIZE items returned
    if (products.length < PAGE_SIZE) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  } catch (err) {
    alert("Error loading products: " + err.message);
  }
}

// Event: category change
categorySelectEl.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  loadProducts(true);
});

// Event: Load more button
loadMoreBtn.addEventListener("click", () => {
  loadProducts();
});

// Event: click product to show details (event delegation)
productListEl.addEventListener("click", async (e) => {
  const productEl = e.target.closest(".product");
  if (!productEl) return;

  const productId = productEl.dataset.id;
  try {
    const response = await fetch(`${API_BASE}/${productId}`);
    if (!response.ok) throw new Error("Failed to load product details");
    const product = await response.json();
    window.currentProduct = product;  // save globally for add to cart
    renderProductDetails(product);
  } catch (err) {
    alert("Error loading product details: " + err.message);
  }
});

// Event: Add to cart and Close buttons in product details (event delegation)
productDetailsEl.addEventListener("click", (e) => {
  if (e.target.id === "add-to-cart-btn") {
    const quantityInput = document.getElementById("quantity-input");
    const qty = quantityInput.value;

    if (!window.currentProduct) {
      alert("No product selected.");
      return;
    }

    const success = addToCart(window.currentProduct, qty);
    if (success) {
      alert("Added to cart");
      renderCart();
    }
  }

  if (e.target.id === "close-details-btn") {
    hideProductDetails();
  }
});

// Start
loadProducts(true);
renderCart();