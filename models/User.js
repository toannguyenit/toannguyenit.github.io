"use strict";

////////////////////////////////////////////////////////////////
//CLASSES
//Class User
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
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
  task() {
    return this.task;
  }
  perpage_category() {
    return this.perpage_category;
  }
}

// Task class
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
  task() {
    return this.task;
  }
  owner() {
    return this.owner;
  }
  isDone() {
    return this.isDone;
  }
}

// Perpage and category class
class PerpageCategory {
  constructor(perpage, country, category) {
    this.perpage = perpage;
    this.country = country;
    this.category = category;
  }
  perpage() {
    return this.perpage;
  }
  country() {
    return this.country;
  }
  category() {
    return this.category;
  }
}

////////////////////////////////
// DEFINE
//Define variables
const userArr = [
  new User("Toan", "Nguyen", "songtoan", "songtoan96"),
  new User("Nam", "Nguyen", "namnguyen", "namnguyen96"),
];

const todoArr = [
  new Task("Finish Assignment 1", "songtoan", "checked"),
  new Task("Finish Assignment 2", "songtoan", "checked"),
  new Task("Finish Assignment 3", "songtoan", "none"),
];

const perpage_category = new PerpageCategory(10, "us", "Business");
const passerby = new PerpageCategory(7, "us", "Health");

userArr[0].task = todoArr;
userArr[0].perpage_category = perpage_category;
