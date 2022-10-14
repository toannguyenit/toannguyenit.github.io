"use strict";

////////////////////////////////
// DEFINE
// Define html
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");
const areRegister = document.querySelector("body");

// Define Array
// const userArr = [];

////////////////////////////////
//INIT
// Get from the localStorage
const userArrCheck = JSON.parse(getFromStorage("userArrData"));

////////////////////////////////////////////////////////////////
//CLASSES
//Class User
class UserData {
  constructor() {
    this.firstName = firstNameInput.value;
    (this.lastName = lastNameInput.value),
      (this.userName = userNameInput.value),
      (this.password = passwordInput.value),
      (this.passwordConfirm = passwordConfirmInput.value);
  }
  firstName() {
    return this.firstName;
  }
  lastName() {
    return this.lastName;
  }
  userName() {
    return this.userName;
  }
  password() {
    return this.password;
  }
}

////////////////////////////////
// FUNCTIONS
// Check validation
function validation_Form(data) {
  // Function Validate
  const validation_Valid = function () {
    let check_validated2 = false;
    if (
      !data.firstName ||
      !data.lastName ||
      !data.userName ||
      !data.password ||
      !data.passwordConfirm
    )
      check_validated2 = false;
    else check_validated2 = true;

    return check_validated2;
  };
  validation_Valid();

  // Check ID duplicates
  let same_user = false;
  for (let i = 0; i < userArrCheck.length; i++) {
    if (data.userName === userArrCheck[i].userName) {
      same_user = true;
    }
  }

  // No fields are missing and valid
  let check_validated = false;
  if (!data.firstName) alert(`Please input for First Name`);
  else if (!data.lastName) alert(`Please input for Last Name`);
  else if (!data.userName) alert(`Please input for Username`);
  else if (same_user == true) alert(`User must unique`);
  else if (!data.password) {
    console.log(!data.password);
    alert(`Please input for Password`);
  } else if (data.password.length < 8)
    alert(`Password must be at least 8 characters`);
  else if (!data.passwordConfirm) alert(`Please input for Confirm Password`);
  else if (data.passwordConfirm !== data.password)
    alert(`Confirm Password must the same the Password`);
  else if (validation_Valid() === true) check_validated = true;

  return check_validated;
}

function mainRegister() {
  // Get data from Register Form
  // const data = {
  //   firstName: firstNameInput.value,
  //   lastName: lastNameInput.value,
  //   userName: userNameInput.value,
  //   password: passwordInput.value,
  //   passwordConfirm: passwordConfirmInput.value,
  // };
  const data = new UserData();

  // Check validation_Form
  const checkValidate = validation_Form(data);

  // Save userArr to localStorage
  if (checkValidate) {
    userArrCheck.push(data);
    saveToStorage("userArrData", JSON.stringify(userArrCheck));
    alert(`Register completed successfully`);
    // Chang to page
    window.location.href = "../pages/login.html";
  }
}

////////////////////////////////
// EVENTS
// Register event
btnRegister.addEventListener("click", function () {
  mainRegister();
});

areRegister.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    mainRegister();
  }
});
