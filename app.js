document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const overlay = document.querySelector(".overlay");
  const cartBtn = document.querySelector(".cart-btn");
  const cartModal = document.querySelector(".cart-modal");
  const quantityElement = document.querySelector(".quantity");
  const minusBtn = document.querySelector(".minus");
  const plusBtn = document.querySelector(".plus");
  const addToCartBtn = document.querySelector(".add-to-cart");
  const cartCount = document.querySelector(".cart-count");
  const cartItemsContainer = document.querySelector(".cart-items");
  const checkoutBtn = document.querySelector(".checkout-btn");

  let quantity = 0;
  let cart = [];

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.add("active");
    overlay.style.display = "block";
  });

  closeMenuBtn.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  function closeMobileMenu() {
    mobileNav.classList.remove("active");
    overlay.style.display = "none";
  }

  // Cart Toggle
  cartBtn.addEventListener("click", () => {
    cartModal.style.display =
      cartModal.style.display === "block" ? "none" : "block";
  });

  // Quantity Controls
  const updateDisplay = () => {
    quantityElement.textContent = quantity;
    cartCount.textContent = quantity; // Live Cart Update
    cartCount.style.display = quantity > 0 ? "block" : "none";
  };

  minusBtn.addEventListener("click", () => {
    if (quantity > 0) quantity--;
    updateDisplay();
  });

  plusBtn.addEventListener("click", () => {
    quantity++;
    updateDisplay();
  });

  // Add to Cart
  addToCartBtn.addEventListener("click", () => {
    if (quantity === 0) return;

    const newItem = {
      name: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity: quantity,
      total: (125.0 * quantity).toFixed(2),
      image: "images/image-product-1-thumbnail.jpg",
    };

    // Clear existing items and add new item
    cartItems = [newItem];

    updateCartDisplay();
    updateCartCount();
    quantity = 0;
    quantityDisplay.textContent = quantity;

    // Force show cart modal after adding item
    cartModal.style.display = "block";
  });

  // Update Cart Display
  function updateCartDisplay() {
    const itemsContainer = document.querySelector(".items");
    itemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
      document.querySelector(".empty").style.display = "block";
      document.querySelector(".checkout").style.display = "none";
      return;
    }

    document.querySelector(".empty").style.display = "none";
    document.querySelector(".checkout").style.display = "block";

    cartItems.forEach((item) => {
      const itemHTML = `
            <div class="cart-item">
            <img src="images/image-product-1-thumbnail.jpg" alt="Delete" class="cart-display-img">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity} <strong>$${item.total}</strong></p>
                </div>
                <img src="images/icon-delete.svg" alt="Delete" class="delete-item">
            </div>
        `;
      itemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Update Cart Count
    function updateCartCount() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? "block" : "none";
    }

    // Close cart when clicking outside
    document.addEventListener("click", (e) => {
      if (!cartBtn.contains(e.target) && !cartModal.contains(e.target)) {
        cartModal.style.display = "none";
      }
    });

    // Add delete functionality
    document.querySelectorAll(".delete-item").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        cartItems = [];
        updateCartDisplay();
        updateCartCount();
        cartModal.style.display = "block"; // Keep cart open after deletion
      });
    });
  }
});

// Lightbox Functionality
const mainImage = document.querySelector(".main-image img");
const thumbnails = document.querySelectorAll(".thumbnails img");
const lightbox = document.querySelector(".lightbox");
const lightboxMainImg = document.querySelector(".lightbox-main-image");
const lightboxThumbnails = document.querySelector(".lightbox-thumbnails");
let currentImageIndex = 0;

// Initialize Lightbox
thumbnails.forEach((thumbnail, index) => {
  // Clone thumbnails for lightbox
  const clone = thumbnail.cloneNode();
  clone.addEventListener("click", () => updateLightboxImage(index));
  lightboxThumbnails.appendChild(clone);
});

// Open Lightbox
mainImage.addEventListener("click", () => {
  lightbox.style.display = "flex";
  updateLightboxImage(0);
});

// Close Lightbox
document.querySelector(".close-lightbox").addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Carousel Controls
document.querySelector(".carousel-prev").addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  updateLightboxImage(currentImageIndex);
});

document.querySelector(".carousel-next").addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  updateLightboxImage(currentImageIndex);
});

function updateLightboxImage(index) {
  currentImageIndex = index;
  const newSrc = thumbnails[index].src.replace("-thumbnail", "");
  lightboxMainImg.src = newSrc;

  // Update active thumbnail
  lightboxThumbnails.querySelectorAll("img").forEach((img, i) => {
    i === index ? img.classList.add("active") : img.classList.remove("active");
  });
}

// Mobile Touch Swipe (Optional)
let touchStartX = 0;
lightboxMainImg.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

lightboxMainImg.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    } else {
      currentImageIndex =
        (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    }
    updateLightboxImage(currentImageIndex);
  }
});
