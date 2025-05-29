const API_BASE = "https://fakestoreapi.com/products";

// Fetch products by category with pagination support
async function fetchProductsByCategory(category, limit = 6, offset = 0) {
  const response = await fetch(`${API_BASE}/category/${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  const products = await response.json();

  // Simulate pagination with slice
  return products.slice(offset, offset + limit);
}