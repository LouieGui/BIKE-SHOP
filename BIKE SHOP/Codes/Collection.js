// Save cart to LocalStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Load cart from LocalStorage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
      cart = JSON.parse(storedCart);
      updateCart();
  }
};

// -------------------------------------------------------------------------------

// CART OPEN/CLOSE
document.querySelector('a[href="#Cart"]').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor link behavior
  var cartProduct = document.querySelector('.cartTab');
  var cartIcon = document.querySelector('a[href="#Cart"] img'); 

  // Check if the cart is already visible
  if (cartProduct.style.left === 'calc(100% - 500px)') {
      cartProduct.style.left = '100%';
      cartIcon.style.backgroundColor = 'white';
      cartIcon.style.borderRadius = '%';
      cartIcon.style.padding = '';
      cartIcon.style.transition = '0.3s';
  } else {
      cartProduct.style.left = 'calc(100% - 500px)'; 
      cartIcon.style.backgroundColor = '#74C0FC';
      cartIcon.style.borderRadius = '50%';
      cartIcon.style.padding = '5px';
      cartIcon.style.transition = '0.3s';
  }
});

// -------------------------------------------------------------------------------

// Function to open checkout form
function checkoutOpen() {
  if (cart.length === 0) {
      alert("Cart is empty. Please buy first before checkout.");
  } else {
      document.getElementById('checkPop').style.visibility = 'visible';
  }
}

// -------------------------------------------------------------------------------

// Listener
document.addEventListener("DOMContentLoaded", function() {
  loadCartFromLocalStorage();

  const checkoutButtons = document.querySelectorAll("#checkoutButton");
  const checkoutForm = document.getElementById("checkoutForm");
  const successMessage = document.getElementById("successMessage");
  const cardSection = document.getElementById("card");
  const gcashSection = document.getElementById("gcash");
  const cashSection = document.getElementById("checkoutForm");

  checkoutButtons.forEach(button => {
    button.addEventListener("click", function() {
      checkoutForm.style.display = "none";
      cardSection.style.display = "none";
      gcashSection.style.display = "none";
      successMessage.classList.add("show");
      successMessage.style.display = "block";
    });
  });

  // Dropdown 
  const paymentSelect = document.getElementById('mode-of-payment');
  paymentSelect.addEventListener('change', function() {
    const selectedValue = paymentSelect.value;

    cardSection.style.display = 'none';
    gcashSection.style.display = 'none';
    cashSection.style.display = 'none';

    if (selectedValue === 'Card') {
      cardSection.style.display = 'flex';
    } else if (selectedValue === 'Gcash') {
      gcashSection.style.display = 'flex';
    } else if (selectedValue === 'Cash') {
      cashSection.style.display = 'flex';
    }
  });
});

// Close Checkout Thing
function checkoutClose() {
  document.getElementById('checkPop').style.visibility = 'hidden';
  resetCheckout();
}

// Success Message
function showSuccessMessage() {
  document.getElementById('checkoutForm').style.display = 'none';
  document.getElementById('card').style.display = 'none';
  document.getElementById('gcash').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('successMessage').classList.add('show');
}

function closeSuccessMessage() {
  document.getElementById('checkPop').style.visibility = 'hidden';
  document.getElementById('checkoutForm').style.display = 'block';
  document.getElementById('successMessage').classList.remove('show');
  setTimeout(function() {
    document.getElementById('successMessage').style.display = 'none';
    resetCheckout();
  }, 500);

  cart = [];
  saveCartToLocalStorage();
  updateCart();
}

function resetCheckout() {
  const checkoutForm = document.getElementById("checkoutForm");
  const cardSection = document.getElementById("card");
  const gcashSection = document.getElementById("gcash");
  const paymentSelect = document.getElementById('mode-of-payment');

  checkoutForm.style.display = "none";
  cardSection.style.display = "none";
  gcashSection.style.display = "none";
  paymentSelect.selectedIndex = 0; // Reset dropdown to default option
  document.getElementById('checkPop').style.visibility = 'none';
  document.getElementById('mode-of-payment').style.display = 'block'; // Ensure the payment selection is visible
}

// Cart Logic
let cart = [];

const addToCart = (productTitle, imgSrc, price) => {
  const cartItem = cart.find(item => item.title === productTitle);

  if (cartItem) {
      cartItem.quantity += 1;
  } else {
      cart.push({ title: productTitle, quantity: 1, imgSrc: imgSrc, price: price });
  }

  saveCartToLocalStorage();
  updateCart();
};

const updateCart = () => {
  const cartContainer = document.querySelector('.listCart');
  cartContainer.innerHTML = '';

  cart.forEach((product, index) => {
      const productElem = document.createElement('div');
      productElem.classList.add('productGet');
      productElem.innerHTML = `
          <div class="imgHolder">
              <img id="imgHolder" src="${product.imgSrc}" alt="${product.title}" />
          </div>
          <div class="contentHolder">
              <h4 class="productTitle">${product.title}</h4>
              <div class="btnQty">
                  <a class="plus"><img src="add-button.png" alt="Increase Quantity"></a>
                  <p class="productQty">${product.quantity}</p>
                  <a class="minus"><img src="minus-button.png" alt="Decrease Quantity"></a>
              </div>
          </div>
          <a class="btnDelete"><img width="50" height="50" src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="Delete Product" /></a>
      `;
      cartContainer.appendChild(productElem);

      productElem.querySelector('.plus').addEventListener('click', () => {
          product.quantity += 1;
          saveCartToLocalStorage();
          updateCart();
      });

      productElem.querySelector('.minus').addEventListener('click', () => {
          if (product.quantity > 1) {
              product.quantity -= 1;
          } else {
              cart.splice(index, 1);
          }
          saveCartToLocalStorage();
          updateCart();
      });

      productElem.querySelector('.btnDelete').addEventListener('click', () => {
          cart.splice(index, 1);
          saveCartToLocalStorage();
          updateCart();
      });
  });

  document.querySelector(".quantity").innerText = cart.length;

  totalPrice();
  saveCartToLocalStorage();
};

function totalPrice() {
  let total = 0;
  cart.forEach(item => {
      total += item.price * item.quantity;
  });
  document.getElementById('totalPrice').innerText = total.toFixed(2);
}