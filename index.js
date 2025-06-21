// Add To Cart
var cart = [];

// Step 1:
// Load cart from localStorage on page load
window.onload = function () {
  var savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = savedCart;
  displayCart();
};

// Step 2:
function addcart(button) {
  var box = button.closest('.box1');

  var imgSrc = box.querySelector('img').src;
  var name = box.querySelector('h5').innerText;
  var desc = box.querySelectorAll('p')[0].innerText;
  var quant = box.querySelector('.display').value;
  var price = box.querySelectorAll('p')[1].innerText;

  if (parseInt(quant) === 0) {
    alert('Please select quantity before adding to cart.');
    return;
  }

  var item = {
    image: imgSrc,
    name: name,
    description: desc,
    quantity: quant,
    price: price,
  };

  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  alert(name + ' added to cart!');
}

// Step 3:
// function displayCart() {
//   var tableBody = document.querySelector('#cartTable tbody');
//   if (!tableBody) return;
//   tableBody.innerHTML = ''; // Clear previous rows

//   cart.forEach(function (item, index) {
//     var newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td><img src="${item.image}" width="60" /></td>
//         <td>${item.name}</td>
//         <td>${item.description}</td>
//         <td>${item.price}</td>
//         <td>${item.quantity}</td>
//       <td>${
//         parseInt(item.quantity) * parseFloat(item.price.replace('$', ''))
//       }</td>
//         <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})"><i class="bx bx-x"></i></button></td>
//       `;
//     tableBody.appendChild(newRow);
//   });
// }

function displayCart() {
  var cartContainer = document.querySelector('#cartCards');
  if (!cartContainer) return;

  cartContainer.innerHTML = ''; // Clear previous items

  cart.forEach(function (item, index) {
    var card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
      <div class="row g-0 ">
        <div class="col-md-5 p-2">
          <img src="${
            item.image
          }" class="img-fluid rounded-start mt-4 ml-5" height="100px" alt="${item.name}">
        </div>
        <div class="col-md-7">
          <div class="card-body text-sm-center mt-2">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mb-1">${item.description}</p>
            <p class="card-text mb-1">Price: <strong>${item.price}</strong></p>
            <p class="card-text mb-1">Quantity: <strong>${
              item.quantity
            }</strong></p>
            <p class="card-text">Total: <strong>$${(
              parseInt(item.quantity) * parseFloat(item.price.replace('$', ''))
            ).toFixed(2)}</strong></p>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">
              <i class="bx bx-x"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `;
    cartContainer.appendChild(card);
  });
}

// Step 4:
function removeItem(index) {
  cart.splice(index, 1); // Remove from array
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  displayCart(); // Refresh UI
}

// Booking Table
var booking = document.querySelector('#booking');
if (booking) {
  booking.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Your Table Has Been Booked Now');
    this.reset();
  });
}

// Email
var message = document.querySelector('#message');
if (message) {
  message.addEventListener('submit', function (i) {
    i.preventDefault();
    alert('Message Sent SuccessFully!');
    this.reset();
  });
}

// quantity
// Select all increase buttons
document.querySelectorAll('.increase').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const input = this.closest('.input-group').querySelector('.display');
    let current = parseInt(input.value) || 0;
    input.value = current + 1;
  });
});

document.querySelectorAll('.decrease').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const input = this.closest('.input-group').querySelector('.display');
    let current = parseInt(input.value) || 0;
    input.value = current - 1;
  });
});

(function () {
  emailjs.init('zQVLYNOVWwAbLx9NW');
})();

document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_2hwulc8', 'template_6wupp6c', this).then(
      () => {
        alert('Message sent successfully!');
      },
      (error) => {
        alert('Failed to send message. Please try again.');
        console.log(error);
      }
    );
    this.reset();
  });
