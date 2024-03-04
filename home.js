// dont try to read my code its too گدود you cant  it

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

let order = [["Green tea", 0]];

let addCard = document.querySelectorAll(".add-card");
let orderPrices = document.querySelector(".order-prices");
let orderItamPrice = document.querySelector(".totalPrice");
let thanksOrdaringMessage = document.querySelector(".thanks-ordaring-message");
let completeOrder = document.querySelector("#complete-order");
let paymentCard = document.querySelector(".payment-card");
let continair = document.querySelector(".continair");
document.addEventListener("click", (e) => {
  console.log(e.target.dataset);
});
function popup(snapshot) {
  document.querySelector("#email").value = snapshot.val().email;
  document.querySelector(".popup").style.display = "flex";

  document.querySelector(
    ".popupDescription"
  ).innerHTML = ` You have successfully entered your account with your <br />
   email: <span class="email-nam">${
     snapshot.val().email
   }</span> <br />name: <span class="email-nam">${
    snapshot.val().name
  }</span> <br />Click the Accept button to confirm
  your information<br />Here, all your information is safe!`;
  continair.style.pointerEvents = "none";
  continair.style.filter = "blur(20px)";
}
document.querySelector(".acceptButton").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "none";
  continair.style.pointerEvents = "auto";
  continair.style.filter = "blur(0px)";
});

document.querySelector(".declineButton").addEventListener("mouseenter", () => {
  document.querySelector(".buttonContainer").classList.toggle("btn-rev");
});

addCard.forEach((card) => {
  let orderItamRemoveBtn = document.querySelectorAll(".order-itam-remove-btn");
  orderItamRemoveBtn.forEach((item, index) => {
    item.addEventListener("click", () => {
      order.splice(index, 1);
    });
  });
  card.addEventListener("click", () => {
    var prevSibling = card.previousElementSibling;
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
          <button class="order-itam-remove-btn" data-remove>remove</button>
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
  continair.style.pointerEvents = "none";
  continair.style.filter = "blur(20px)";
});
let paymentForm = document.querySelector("#payment-form");
let bn = document.querySelector(".bn");
get(ref(db, "data/" + uuid))
  .then((snapshot) => {
    popup(snapshot);
  })
  .catch((err) => {
    console.log(err);
  });

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    e.target.discount.value == "SulimanHakimi" ||
    e.target.discount.value == "KarimBakhsh" ||
    e.target.discount.value == "JamshidHashimi" ||
    e.target.discount.value == "FuziaKargar"
  ) {
    thanksOrdaringMessage.innerHTML = `<p class="message">Thanks, All the food for you on this website is free because you used the special discount code <br> please check your email you received an email <br><br><span class="email-mess">if  you have not received an email please check the spam section</span></p></p>
    `;
    bn.style.display = "none";
    thanksOrdaringMessage.style.display = "flex";
    paymentCard.style.display = "none";
    continair.style.pointerEvents = "auto";
    continair.style.filter = "blur(0px)";
  } else {
    thanksOrdaringMessage.innerHTML = `<p class="message">Thanks! Your order is on its way! <br> please check your email you received an email <br></p>
    `;
    thanksOrdaringMessage.style.display = "flex";
    bn.style.display = "none";
    paymentCard.style.display = "none";
    continair.style.pointerEvents = "auto";
    continair.style.filter = "blur(0px)";
  }
  Email.send({
    SecureToken: "293cbc03-ab9d-45d4-af64-ac1a79eaa894 ",
    To: e.target.email.value,
    From: "afgsuliman50@gmail.com",
    Subject: "Thank you for your order!",
    Body: `<h1>Hi Customer</h1>

     <p> We are so happy that you chose Kunduz Kabob for your meal. We hope you enjoyed our Foods. Your satisfaction is our priority.<br>
      
     Your order number is 23 . It should arrive at your doorstep within 30 min.<br>
  
     We would love to hear your feedback on our service and food quality.
  
     Thank you for your order and your support. We look forward to serving you again soon!</p>
  
     <h4>Sincerely,<br>
     Kunduz Kabob Team</h4>
     <br>
     <div style="width:480px"><iframe allow="fullscreen" frameBorder="0" height="320" src="https://giphy.com/embed/L0owGTy0mQ4L5PVmUo/video" width="480"></iframe></div>
  
     `,
  }).then((message) => console.log(message));
});
