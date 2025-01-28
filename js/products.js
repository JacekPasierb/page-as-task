const productContainer = document.getElementById("products");
const productCountSelect = document.getElementById("product-count");
let currentCount = 20;
let currentPage = 1;
const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
let isLoading = false;

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
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function createProduct(product) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.textContent = ` ID: ${product.id}` || `Produkt`;
  return productElement;
}

async function loadProducts(pageNumber, pageSize) {
  if (isLoading) return;
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

productCountSelect.addEventListener("change", () => {
  currentCount = parseInt(productCountSelect.value, 10);
  productContainer.innerHTML = "";
  currentPage = 1;
  loadProducts(currentPage, currentCount);
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    currentPage++;
    loadProducts(currentPage, currentCount);
  }
});

loadProducts(currentPage, currentCount);
