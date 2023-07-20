// Cart functionality
const cartItems = [];
const cartCount = document.querySelector('.cart-count');
const cartList = document.querySelector('.cart-items');

// Fetch products from the API and display them on the homepage
fetch("https://fakestoreapi.com/products/category/women's clothing")
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


function addToCart(product) {
  cartItems.push(product);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cartItems.length;
  cartList.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
    cartList.appendChild(cartItem);
  });
}

const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Add some products before checkout.');
  } else {
    alert('Thank you for your purchase!');
    cartItems.length = 0;
    updateCart();
  }
});