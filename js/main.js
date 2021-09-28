// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
let _selectedCategoryId;
const _servicesUrl = "./json/services.json";
const _usersUrl = "./json/shared.json";
const _headers = {
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

let _services = [];
let _freelancers = [];

async function loadServices() {
  const url = _servicesUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _services = data; // assign the data to the _services array
  appendCategories(_services); // call function to display categories to DOM
}

loadServices();

// GET THE FREELANCERS FROM THE JSON FILE
async function loadFreelancers() {
  const url = _usersUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _freelancers = data; // assign the data to the _services array
}

loadFreelancers();

// FUNCTION TO APPEND THE SERVICES TO THE DOM
function appendCategories(services) {
  const cardsContainer = document.querySelector(".home-cards-container");
  let html = "";
  let area = 1;
  for (const service of services) {
    html += `
      <a onclick="selectCategory(${service.id})">
        <div class="card area${area++}">
          <div class="card-image">
            <img src="${service.img}">
          </div>
          <h4>${service.service}</h4>
          <p>5 freelancers</p>
        </div>
      </a>
      `;
  }
  cardsContainer.innerHTML = html;
}

// FUNCTION TO APPEND THE FREELANCERS FOR EACH CATEGORY
function appendFreelancers(freelancers) {
  const freelancersCards = document.querySelector(
    ".freelancers-cards-container"
  );
  let html = "";
  for (const freelancer of freelancers) {
    html += `
      <div class="freelancers-card">
        <div class="request-image">
          <img src="${freelancer.img}" alt="Client Image">
        </div>
        <div class="request-text">
          <img src="./images/5stars.png">
          <h4>${freelancer.profession}, ${freelancer.city}</h4>
          <p>${freelancer.name}</p>
          <p class="price">Avg. Price ${freelancer.price}</p>
        </div>
      </div>
    `;
  }
  freelancersCards.innerHTML = html;
}

// SELECT CATEGORY ID
function selectCategory(id) {
  navigateTo("#/freelancers");
  _selectedCategoryId = id;
  const service = _services.find(
    (service) => service.id == _selectedCategoryId
  );
  let pageTitle = document.querySelector(".page-title");
  pageTitle.textContent = service.service;
  // FILTER FREELANERS BY CATEGORY
  let filteredFreelancer = _freelancers.filter((freelancer) => {
    return freelancer.category === service.service;
  });
  appendFreelancers(filteredFreelancer);
}

// MAKING SEEALL BUTTON WORK - GO TO CATEGORIES
function goToCategories() {
  const seeall = document.querySelector(".seeall");
  seeall.setAttribute("href", "#/categories");
  navigateTo("#/categories");
  window.scrollTo(0, 0);
}

// GO BACK ARROW FUNCTION
function arrowGoBack() {
  const backArrow = document.querySelector(".back-home");
  backArrow.setAttribute("href", "#/home");
  navigateTo("#/home");
}

// GO TO FREELANCERS SECTION FOR EACH CATEGORY
