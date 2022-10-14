"use strict";

////////////////////////////////////////////////////////////////////////
// DEFINE
// Define html
const inputKeySearch = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const newContainer = document.getElementById("news-container");

// Define variables
// let countryCurrent = "us";
// let categoryCurrent = passerbyArr.category;
let pageSizeCurrent = 10;
let pageCurrent = 1;
let totalNews = 0;
let keySearch = inputKeySearch.value;

////////////////////////////////////////////////////////////////////////
// FUNCTIONS
// Render News Search Results
// Render the NEWS
function renderNews(data) {
  newContainer.innerHTML = "";
  if (pageCurrent === 1) btnPrev.style.display = "none";
  else if (pageCurrent === totalNews / pageSizeCurrent)
    btnNext.style.display = "none";
  else {
    btnPrev.style.display = "flex";
    btnNext.style.display = "flex";
  }
  pageNum.textContent = pageCurrent;
  for (let i = 0; i < pageSizeCurrent; i++) {
    const html = `
    <div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${data.articles[i].urlToImage}"
            class="card-img"
            alt="${data.articles[i].title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${data.articles[i].title}"></h5>
            <p class="card-text">${data.articles[i].description}</p>
            <a href="${data.articles[i].url}"
              class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>`;
    newContainer.insertAdjacentHTML("beforeend", html);
  }
}

function fetchData(data) {
  fetch(
    `https://newsapi.org/v2/everything?q=${data}&pageSize=${pageSizeCurrent}&page=${pageCurrent}&apiKey=03c9b1a392a34fa5b749586053ddf0c6`
  )
    .then((response) => response.json())
    .then((data) => {
      totalNews = data.totalResults;
      renderNews(data);
    });
}

////////////////////////////////////////////////////////////////////////
// INIT
newContainer.innerHTML = "";

////////////////////////////////////////////////////////////////
// EVENT
// Search event
btnSearch.addEventListener("click", function (e) {
  keySearch = inputKeySearch.value;
  if (!keySearch) alert(`Plese insert key words into search`);
  else fetchData(keySearch);
});

// Event btnPrev click
btnPrev.addEventListener("click", function () {
  if (!keySearch) alert(`Plese insert key words into search`);
  else if (pageCurrent > 1) {
    pageCurrent--;
    fetchData(keySearch);
  }
});

// Event btnPrev click
btnNext.addEventListener("click", function () {
  if (!keySearch) alert(`Plese insert key words into search`);
  else if (pageCurrent < totalNews / pageSizeCurrent) {
    pageCurrent++;
    fetchData(keySearch);
  }
});

const arr = [1, 2, 3, 4, 5];
const newArr = arr.map((i) => (i === 3 ? i * 2 : i));
console.log(newArr);
