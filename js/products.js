const productContainer = document.getElementById("products");
const productCountSelect = document.getElementById("product-count");
let currentCount = 20;
let currentPage = 1;
const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
let isLoading = false;

// Fetch products from API
async function fetchProducts(pageNumber, pageSize) {
  try {
    const response = await fetch(
      `${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      console.error("Failed to fetch products", response.statusText);
      return [];
    }
    const data = await response.json();
    console.log("API Response:", data); // Debugging: log the response
    return Array.isArray(data) ? data : data.data || []; // Adjust to match actual API structure
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Generate a single product
function createProduct(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.textContent = ` ID: ${product.id}` || `Produkt`;
  return productElement;
}

// Load products from API and render them
async function loadProducts(pageNumber, pageSize) {
  if (isLoading) return; // Prevent multiple calls
  isLoading = true;
  const products = await fetchProducts(pageNumber, pageSize);
  if (!Array.isArray(products)) {
    console.error("Invalid product data format:", products);
    return;
  }
  products.forEach((product) => {
    productContainer.appendChild(createProduct(product));
  });
  isLoading = false;
}

// Handle select change event
productCountSelect.addEventListener("change", () => {
  currentCount = parseInt(productCountSelect.value, 10);
  productContainer.innerHTML = "";
  currentPage = 1;
  loadProducts(currentPage, currentCount);
});

// Infinite scroll functionality
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    // Add offset for better UX
    console.log("Loading more products...");
    currentPage++;
    loadProducts(currentPage, currentCount);
  }
});

// Initial load
loadProducts(currentPage, currentCount);
