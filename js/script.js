// Mobile navigation
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } 
  else {
    x.style.display = "block";
  }
}

const books = [
  {
    id: 1,
    title: 'The Hunger Games',
    price: 12.99
  },
  {
    id: 2,
    title: 'Catching Fire',
    price: 12.99
  },
  {
    id: 3,
    title: 'Mockingjay',
    price: 12.99
  },
  {
    id: 4,
    title: 'The Ballad of Songbirds and Snakes',
    price: 19.99
  }
];

// Function to open the shopping cart
function openCart() {
  var cartModal = document.querySelector('.cart-modal');
  cartModal.classList.add('in-screen');
}

// Function to close the shopping cart
function closeCart() {
  var cartModal = document.querySelector('.cart-modal');
  cartModal.classList.remove('in-screen');
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}


// Create a remove button
function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('add-to-cart')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsById('checkout-btn')[0].addEventListener('click', purchaseClicked)
}



function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}
// Add items to cart
function addToCartClicked(event) {
  console.log(event.innerHTML);
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('item-title')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
  console.log(title , price , imageSrc)
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }

  // Create a var for cartRowContents, and show the items added to cart
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="50" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// Update the cart to show items and price
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total-amount')[0].innerText = `${total}`
}

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const username = form.querySelector('#username').value;
  const password = form.querySelector('#password').value;

});