"use strict";

////////////////////////////////////////////////////////////
// DEFINE
// Define html
const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");

//Define variables
const userCurrent = JSON.parse(getFromStorage("currentUser"));

////////////////////////////////////////////////////////////////
// FUNCTION
// renderTask function
function renderTask(data) {
  todoList.innerHTML = "";
  let taskNo = 0;
  data.map((data) => {
    const html = `<li class="${data.isDone}" id="check" data-id="${taskNo}">${data.task}<span class="close" id="close" data-id="${taskNo}">×</span></li>`;
    todoList.insertAdjacentHTML("beforeend", html);
    taskNo++;
  });
}

////////////////////////////////////////////////////////////////
// INIT
todoList.innerHTML = "";
if (userCurrent && userCurrent.task) renderTask(userCurrent.task);
// if (userCurrent) renderTask(userCurrent);

////////////////////////////////////////////////////////////////
// EVENTS
// Add event
btnAdd.addEventListener("click", function (e) {
  if (!userCurrent) {
    alert("Please Login or Register");
    return;
  }
  // Check validation
  const inputTitle = inputTask.value;
  if (!inputTitle) {
    alert(`Please input for Title`);
    return;
  }

  // Insert task into array todoArr and renderTask
  const taskdata = new Task(inputTitle, userCurrent.userName, "None");
  if (!userCurrent.task) userCurrent.task = [taskdata];
  else if (userCurrent.task) userCurrent.task.push(taskdata);
  saveToStorage("currentUser", JSON.stringify(userCurrent));
  console.log(userCurrent);
  renderTask(userCurrent.task);

  // Reset Form
  inputTask.value = "";
});

// Delete Task
todoList.addEventListener("click", function (e) {
  if (e.target.id === "close") {
    const taskNo = e.target.getAttribute("data-id");
    if (!taskNo) return;
    const isConfirm = confirm(
      `Do you want delete task: ${userCurrent.task[taskNo].task}?`
    );
    if (!isConfirm) return;
    console.log(`Delete task: ${userCurrent.task[taskNo].task}`);

    // Remove, save and renderTask
    userCurrent.task.splice(taskNo, 1);
    saveToStorage("currentUser", JSON.stringify(userCurrent));
    renderTask(userCurrent.task);
  }

  if (e.target.id === "check") {
    const taskNo = e.target.getAttribute("data-id");
    if (!taskNo) return;
    const isConfirm = confirm(
      `Do you want confirm task: ${userCurrent.task[taskNo].task}?`
    );
    if (!isConfirm) return;
    console.log(`Cofirm task: ${userCurrent.task[taskNo].task}`);

    //reload
    if (userCurrent.task[taskNo].isDone === "checked")
      userCurrent.task[taskNo].isDone = "none";
    else userCurrent.task[taskNo].isDone = "checked";

    // Save and renderTask
    saveToStorage("currentUser", JSON.stringify(userCurrent));
    renderTask(userCurrent.task);
  }
});
