"use strict";

////////////////////////////////
// DEFINES
// Defines html
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSaveSettings = document.getElementById("btn-submit");

// Defines variables
const passerbyCurrent = JSON.parse(getFromStorage("passerbyData"));
const userCurrent = JSON.parse(getFromStorage("currentUser"));
console.log(userCurrent);

////////////////////////////////
// INIT
if (!userCurrent) {
  inputPageSize.value = passerbyCurrent.perpage;
  inputCategory.value = passerbyCurrent.category;
} else if (userCurrent && userCurrent.perpage_category) {
  inputPageSize.value = userCurrent.perpage_category.perpage;
  inputCategory.value = userCurrent.perpage_category.category;
}

////////////////////////////////
// EVENTS
// Save settings events
btnSaveSettings.addEventListener("click", function () {
  const data = {
    perpage: inputPageSize.value,
    category: inputCategory.value,
  };
  if (!data.perpage) alert("Please input News per page");
  else if (data.perpage < 1) alert("Please input News per page >= 1");
  else if (!data.category || data.category === "General")
    alert("Please chose News category");
  else {
    if (!userCurrent) {
      passerbyCurrent.perpage = data.perpage;
      passerbyCurrent.category = data.category;
      saveToStorage("passerbyData", JSON.stringify(passerbyCurrent));
      console.log(passerbyCurrent);
    } else if (userCurrent) {
      userCurrent.perpage_category = data;
      saveToStorage("currentUser", JSON.stringify(userCurrent));
      console.log(userCurrent);
    }
  }
});
