const productContainer = document.getElementById("products");
const productCountSelect = document.getElementById("product-count");
const popupClose = document.getElementById("popupClose");
const popupOverlay = document.getElementById("popupOverlay");
const productsSection = document.querySelector(".products");

let currentCount = 20;
let currentPage = 1;
const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
let isLoading = false;

const fetchProducts = async (pageNumber, pageSize) => {
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
};

const createProduct = (product) => {
  const productElement = document.createElement("div");

  productElement.classList.add("product");
  const productText = document.createElement("p");
  productText.textContent = product.id ? `ID: ${product.id}` : "Produkt";
  productElement.appendChild(productText);

  productElement.addEventListener("click", () => openPopup(product));
  return productElement;
};

const loadProducts = async (pageNumber, pageSize) => {
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
};

productCountSelect.addEventListener("change", () => {
  currentCount = parseInt(productCountSelect.value, 10);
  productContainer.innerHTML = "";
  currentPage = 1;
  loadProducts(currentPage, currentCount);
});

const openPopup = (product) => {
  popupContent.innerHTML = `<p>ID: ${product.id}</p><p>Nazwa: ${
    Object.keys(product)[1]
  }</p><p>Wartość: ${product.text}</p>`;
  popup.style.display = "flex";
  popupOverlay.style.display = "block";
};

const closePopup = () => {
  popup.style.display = "none";
  popupOverlay.style.display = "none";
};

popupClose.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", closePopup);

const productObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        productObserver.unobserve(productsSection);
        loadProducts(currentPage, currentCount);
      }
    });
  },
  {threshold: 0.5}
);

productObserver.observe(productsSection);

window.addEventListener("scroll", () => {
  if (isLoading) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    currentPage++;
    loadProducts(currentPage, currentCount);
  }
});
