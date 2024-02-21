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
window.localStorage.setItem("id", uuid);
function addData(e, uuid) {
  set(ref(db, "data/" + uuid), {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  })
    .then(() => {
      welcomeEmailSend(e, uuid);
      window.location.href = "./home.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
function welcomeEmailSend() {
  Email.send({
    SecureToken: "293cbc03-ab9d-45d4-af64-ac1a79eaa894 ",
    To: e.target.email.value,
    From: "afgsuliman50@gmail.com",
    Subject: "Welcome to Kunduz Kabob Food Ordering App!",
    Body: `<h1>Dear New User</h1>,

   <p> Welcome to Kunduz Kabob Food Ordering App! 🎉<br>
    
    We're thrilled to have you join our community. Whether you're craving delicious kabobs, mouthwatering pizzas, or authentic Afghan rice dishes, we've got you covered.<br>
    
    Here's what you can expect from our app:<br>
    
    1. Easy Ordering: Browse our menu, customize your favorite dishes, and place your order hassle-free.<br>
    2. Speedy Delivery: Our team is committed to delivering your food promptly, so you can enjoy it while it's still hot.<br>
    3. Quality Ingredients: We take pride in using fresh, high-quality ingredients to create flavorful meals.<br>
    4. Variety: From kabobs to pizzas, we offer a diverse range of options to satisfy every craving.<br>
    
    Special Offer for New Users:
    As a token of our appreciation, use code SulimanHakimi during checkout to get 100% off your first order!<br>
    
    If you have any questions or need assistance, feel free to reach out to our friendly customer support team at 00937777777<br>
    
    Thank you for choosing Kunduz Kabob Food Ordering App. We look forward to serving you delicious meals!</p>
    
  
     <strong>Your authentication code is ${uuid}</strong>

     <h4>Best regards,<br>
     The Kunduz Kabob Team</h4>
     <br>
     <div style="width:480px"><iframe allow="fullscreen" frameBorder="0" height="320" src="https://giphy.com/embed/L0owGTy0mQ4L5PVmUo/video" width="480"></iframe></div>
  
     `,
  }).then((message) => console.log(message));
}
