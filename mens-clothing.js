// Cart functionality
let cartItems = [];
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('#cartIcon');
const cartList = document.querySelector('.cart-items');

// Fetch products from the API and display them on the homepage
if (document.querySelector('.product-list')) {
  fetch("https://fakestoreapi.com/products/category/men's clothing")
  .then(response => response.json())
  .then(products => {
    const productContainer = document.querySelector('.product-list');

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');

      // Image element for the product
      const productImage = document.createElement('img');
      productImage.src = product.image; // Replace 'product.image' with the actual image URL property provided by the API
      productImage.alt = product.title;
      productImage.classList.add('product-image');
      productItem.appendChild(productImage);

      const productName = document.createElement('h3');
      productName.textContent = product.title;

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price.toFixed(2)}`;

      const addToCartBtn = document.createElement('button');
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.addEventListener('click', () => addToCart(product));

      productItem.appendChild(productName);
      productItem.appendChild(productPrice);
      productItem.appendChild(addToCartBtn);

      productContainer.appendChild(productItem);
    });
  })
  .catch(error => console.error('Error fetching products:', error));

}

if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    // Pass the cartItems data to the checkout.html page via the URL parameter
    const queryParams = new URLSearchParams({ cart: JSON.stringify(cartItems) });
    const checkoutURL = `checkout.html?${queryParams.toString()}`;
    window.location.href = checkoutURL;
  });
}

function addToCart(product) {
  cartItems.push(product);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cartItems.length;
  saveCartToLocalStorage();
  
  if (cartList) {
    cartList.innerHTML = '';

    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
      cartList.appendChild(cartItem);
    });
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update the cart list on the checkout.html page
function updateCartOnCheckout() {
  if (cartList) {
    cartList.innerHTML = '';

    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
      cartList.appendChild(cartItem);
    });
  }
}

const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
if (Array.isArray(storedCartItems)) {
  cartItems = storedCartItems;
  updateCart();
  updateCartOnCheckout();
}

const checkoutBtn = document.querySelector('.checkout-btn');

// Check if the checkout button exists before adding the event listener
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some products before checkout.');
    } else {
      alert('Thank you for your purchase!');
      cartItems = [];
      updateCart();
      updateCartOnCheckout();
    }
  });
}
updateCart();