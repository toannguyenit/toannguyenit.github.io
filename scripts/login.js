"use strict";

////////////////////////////////
// DEFINE
// Define html
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");
const areLogin = document.querySelector("body");

class UserData {
  constructor() {
    this.userName = userNameInput.value;
    this.password = passwordInput.value;
  }
  firstName() {
    return this.firstName;
  }
  lastName() {
    return this.lastName;
  }
}

////////////////////////////////
//INIT
// Get from the localStorage
// var currentUser = localStorage.getItem("currentUser");
// let currentUserState = JSON.parse(getFromStorage("currentUser"));
const userArrCheck = JSON.parse(getFromStorage("userArrData"));
var currentUser = JSON.parse(getFromStorage("currentUser"));

// let currentUserState = false;

////////////////////////////////
// FUNCTIONS
// Change JS Object to Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}

// Check valid login
function validation_Form(data) {
  // Function Validate
  const validation_Valid = function () {
    let check_validated2 = false;
    if (!data.userName || !data.password) check_validated2 = false;
    else check_validated2 = true;

    return check_validated2;
  };
  validation_Valid();

  // No fields are missing and valid
  let check_validated = false;
  if (!data.userName) alert(`Please input for Username`);
  else if (!data.password) alert(`Please input for Password`);
  else if (data.password.length < 8)
    alert(`Password must be at least 8 characters`);
  else if (validation_Valid() === true) check_validated = true;

  return check_validated;
}

// Check login status
function checkLoginStatus(data) {
  for (let i = 0; i < userArrCheck.length; i++) {
    if (
      data.userName === userArrCheck[i].userName &&
      data.password === userArrCheck[i].password
    ) {
      currentUser = userArrCheck[i];
      console.log(currentUser);
      saveToStorage("currentUser", JSON.stringify(currentUser));

      // currentUserState = true;
    }
  }
}

function mainLogin() {
  const data = new UserData();
  const valid = validation_Form(data);
  const loginState = checkLoginStatus(data);
  if (currentUser) {
    window.location.href = "../index.html";
  } else if (!currentUser && valid === true) {
    passwordInput.value = "";
    alert(`The account does not exist or the password is incorrect!`);
  }
}

////////////////////////////////
// EVENTS
// Login event
btnLogin.addEventListener("click", function (e) {
  mainLogin();
});

areLogin.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    mainLogin();
  }
});
