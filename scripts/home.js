"use strict";

////////////////////////////////
// DEFINE
// Define html
const loginDisplay = document.querySelector(".row");
const displayUser = document.querySelector("p");

const btnLogout = document.getElementById("btn-logout");

////////////////////////////////
//INIT
// Get from the localStorage
const currentUser = JSON.parse(getFromStorage("currentUser"));
const userArrCheck = JSON.parse(getFromStorage("userArrData"));

if (currentUser) {
  loginDisplay.style.display = "none";
  displayUser.textContent = `Welcome to ${currentUser.firstName}`;
} else {
  btnLogout.style.display = "none";
}

////////////////////////////////
// EVENTS
// Login event
btnLogout.addEventListener("click", function (e) {
  localStorage.removeItem("currentUser");
  loginDisplay.style.display = "flex";
  btnLogout.style.display = "none";
  displayUser.textContent = `Please Login or Register`;

  for (let i = 0; i < userArrCheck.length; i++) {
    if (userArrCheck[i].userName === currentUser.userName) {
      userArrCheck[i] = currentUser;
    }
  }

  // const data = userArrCheck.map(
  //   (data) =>
  //     data.userName === currentUser.userName
  //       ? (userArrCheck = currentUser)
  //       : data
  //   // if (data.userName === currentUser.userName) {
  //   //   userArrCheck = currentUser;
  //   // }
  // );

  console.log(userArrCheck);
  saveToStorage("userArrData", JSON.stringify(userArrCheck));
});
