import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
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
let uuid = window.localStorage.getItem("id");

let order = [["Tea", 0]];
let addCard = document.querySelectorAll(".add-card");
let orderPrices = document.querySelector(".order-prices");
let orderItamPrice = document.querySelector(".totalPrice");
let thanksOrdaringMessage = document.querySelector(".thanks-ordaring-message");
let completeOrder = document.querySelector("#complete-order");
let paymentCard = document.querySelector(".payment-card");
let continair = document.querySelector(".continair");
addCard.forEach((card) => {
  let orderItamRemoveBtn = document.querySelectorAll(".order-itam-remove-btn");
  orderItamRemoveBtn.forEach((item, index) => {
    item.addEventListener("click", () => {
      order.splice(index, 1);
    });
  });
  card.addEventListener("click", () => {
    var prevSibling = card.previousElementSibling;
    console.log();
    let itemName = prevSibling.querySelector("div>span").firstChild.nodeValue;
    let itemPrice = prevSibling
      .querySelector(".price")
      .firstChild.nodeValue.split(" ")[0];
    let totalPrice = 0;
    order.push([itemName, itemPrice]);

    orderPrices.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="crds-price-order">
        <div class="dvp">
            <span class="order-itam-name">${order[order.length - 1][0]}</span>
            <button class="order-itam-remove-btn">remove</button>
        </div>
        <p class="order-itam-price">${order[order.length - 1][1]} Af</p>
    </div>
`
    );

    for (let i = 0; i < order.length; i++) {
      totalPrice += Number(order[i][1]);
    }
    orderItamPrice.innerHTML = `${totalPrice} Af`;
  });
});

completeOrder.addEventListener("click", () => {
  paymentCard.style.display = "flex";
  continair.classList.add("acive-blur");
  continair.style.pointerEvents = "none";
});
let paymentForm = document.querySelector("#payment-form");
let bn = document.querySelector(".bn");
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    e.target.discount.value == "SulimanHakimi" ||
    e.target.discount.value == "KarimBakhsh" ||
    e.target.discount.value == "JamshidHashimi" ||
    e.target.discount.value == "FuziaKargar"
  ) {
    thanksOrdaringMessage.innerHTML = `<p class="message">Thanks, All the food for you on this website is free for you because you used the special discount code</p>
    `;
    bn.style.display = "none";
    thanksOrdaringMessage.style.display = "flex";
    paymentCard.style.display = "none";
    continair.classList.remove("acive-blur");
    continair.style.pointerEvents = "";
  } else {
    thanksOrdaringMessage.innerHTML = `<p class="message">Thanks! Your order is on its way!</p>
    `;
    thanksOrdaringMessage.style.display = "flex";
    bn.style.display = "none";

    paymentCard.style.display = "none";
    continair.classList.remove("acive-blur");
    continair.style.pointerEvents = "";
  }
});

get(ref(db, "data/" + uuid))
  .then((snapshot) => {
    document.querySelector("#email").value = snapshot.val().email;
  })
  .catch((err) => {
    console.log(err);
  });
