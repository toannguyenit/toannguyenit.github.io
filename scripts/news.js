"use strict";

////////////////////////////////
// DEFINES
// Defines html
const newContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

// Defines variables
const passerbyArr = JSON.parse(getFromStorage("passerbyData"));
const userCurrent = JSON.parse(getFromStorage("currentUser"));

let countryCurrent = "us";
let categoryCurrent = passerbyArr.category;
let pageSizeCurrent = passerbyArr.perpage;
let pageCurrent = 1;
let totalNews = 0;

////////////////////////////////////////////////////////////////////////
// INIT
newContainer.innerHTML = "";
if (!userCurrent) {
  categoryCurrent = passerbyArr.category;
  pageSizeCurrent = passerbyArr.perpage;
  fetchData();
} else if (userCurrent && userCurrent.perpage_category) {
  categoryCurrent = userCurrent.perpage_category.category;
  pageSizeCurrent = userCurrent.perpage_category.perpage;
  fetchData();
}

////////////////////////////////////////////////////////////////////////
// FUNCTIONS
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

// Function fetch and renderData
function fetchData() {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCurrent}&category=${categoryCurrent}&pageSize=${pageSizeCurrent}&page=${pageCurrent}&apiKey=03c9b1a392a34fa5b749586053ddf0c6`
  )
    .then((response) => response.json())
    .then((data) => {
      totalNews = data.totalResults;
      renderNews(data);
    });
}

////////////////////////////////////////////////////////////////
// EVENTS
// Event btnPrev click
btnPrev.addEventListener("click", function () {
  if (pageCurrent > 1) {
    pageCurrent--;
    fetchData();
  }
});

// Event btnPrev click
btnNext.addEventListener("click", function () {
  if (pageCurrent < totalNews / pageSizeCurrent) {
    pageCurrent++;
    fetchData();
  }
});
