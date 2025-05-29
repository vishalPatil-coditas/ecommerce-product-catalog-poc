const productListEl = document.getElementById("product-list");
const productDetailsEl = document.getElementById("product-details");
const cartItemsEl = document.getElementById("cart-items");

function clearProductList() {
  productListEl.innerHTML = "";
}

function renderProducts(products) {
  products.forEach(product => {
    const productEl = document.createElement("div");
    productEl.className = "product";
    productEl.dataset.id = product.id;
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price.toFixed(2)}</p>
    `;
    productListEl.appendChild(productEl);
  });
}

function renderProductDetails(product) {
  productDetailsEl.classList.remove("hidden");
  productDetailsEl.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" style="max-width: 300px;" />
    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
    <p>${product.description}</p>
    <label>Quantity: <input type="number" id="quantity-input" value="1" min="1" style="width: 50px;" /></label>
    <button id="add-to-cart-btn">Add to Cart</button>
    <button id="close-details-btn">Close</button>
  `;
}

function hideProductDetails() {
  productDetailsEl.classList.add("hidden");
  productDetailsEl.innerHTML = "";
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  const items = getCartItems();
  if (items.length === 0) {
    cartItemsEl.innerHTML = "<li>Cart is empty</li>";
    return;
  }
  items.forEach(({ product, quantity }) => {
    const li = document.createElement("li");
    li.textContent = `${product.title} - Qty: ${quantity}`;
    cartItemsEl.appendChild(li);
  });
}