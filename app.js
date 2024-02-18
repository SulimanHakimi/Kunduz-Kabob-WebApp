let loginForm = document.getElementById("login-form");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  ref,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBF7FXoguwBOpkH68JYLbQJGL5UQEwgFf0",
  authDomain: "order-food-app-d8736.firebaseapp.com",
  databaseURL:
    "https://order-food-app-d8736-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "order-food-app-d8736",
  storageBucket: "order-food-app-d8736.appspot.com",
  messagingSenderId: "305840154363",
  appId: "1:305840154363:web:96618bdb744b9c0a59f25e",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
let uuid = crypto.randomUUID().toString();
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addData(e, uuid);
});
window.localStorage.setItem("id",uuid)
function addData(e, uuid) {
  set(ref(db, "data/" + uuid), {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  })
    .then(() => {
      window.location.href = "./home.html";
    })
    .catch((err) => {
      console.log(err);
    });
}


// //////////////////////////////////////////////////////////////////////////
// // Define the cart as an array
// var cart = [];

// // Function to add an item to the cart
// function addItem(item) {
//   // Check if the item is already in the cart
//   if (cart.indexOf(item) === -1) {
//     // Add the item to the cart
//     cart.push(item);
//     // Display the updated cart
//     displayCart();
//   }
// }

// // Function to display the cart
// function displayCart() {
//   var cartList = document.getElementById("cart-list");
//   cartList.innerHTML = "";
//   for (var i = 0; i < cart.length; i++) {
//     cartList.innerHTML += "<li>" + cart[i] + "</li>";
//   }
// }

// // Add items to the cart when they are clicked
// document.getElementById("item-1").addEventListener("click", function () {
//   addItem("Item 1");
// });
// document.getElementById("item-2").addEventListener("click", function () {
//   addItem("Item 2");
// });
// document.getElementById("item-3").addEventListener("click", function () {
//   addItem("Item 3");
// });

// // Display the cart when the page loads
// displayCart();