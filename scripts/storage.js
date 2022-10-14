"use strict";

////////////////////////////////
// FUNCTIONS
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

////////////////////////////////
//INIT
// Save to localStorage userArr
var userArrData = localStorage.getItem("userArrData");
if (userArrData) {
} else {
  saveToStorage("userArrData", JSON.stringify(userArr));
}

var passerbyData = localStorage.getItem("passerby");
if (passerbyData) {
} else {
  saveToStorage("passerbyData", JSON.stringify(passerby));
}

// Save to localStorage LoginCheck
// var currentUser = localStorage.getItem("currentUser");
// if (currentUser) {
// } else {
//   saveToStorage("currentUser", JSON.stringify(loginCheck));
// }
