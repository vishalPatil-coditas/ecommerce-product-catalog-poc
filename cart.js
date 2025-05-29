const cart = [];

// Add product to cart with quantity validation
function addToCart(product, quantity) {
  const qty = Number(quantity);
  if (!qty || qty < 1) {
    alert("Please enter a valid quantity (1 or more).");
    return false;
  }

  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ product, quantity: qty });
  }
  return true;
}

// Get cart items
function getCartItems() {
  return cart;
}