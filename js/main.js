// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
let _selectedCategoryId;
let _selectedFreelancerId;
let _services = [];
let _freelancers = [];

const _servicesUrl = "./json/services.json";
const _usersUrl = "./json/shared.json";
const _headers = {
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

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
  const searchCards = document.querySelector(".search-cards-container");

  let html = "";
  for (const freelancer of freelancers) {
    html += `
      <a onclick="selectFreelancer(${freelancer.id})">
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
      </a>
    `;
  }
  freelancersCards.innerHTML = html;
  searchCards.innerHTML = html;
}

// SELECT CATEGORY ID
function selectCategory(id) {
  navigateTo("#/freelancers");
  _selectedCategoryId = id;
  const service = _services.find(
    (service) => service.id == _selectedCategoryId
  );
  console.log(service);
  let pageTitle = document.querySelector(".page-title");
  pageTitle.textContent = service.service;
  // FILTER FREELANERS BY CATEGORY
  let filteredFreelancer = _freelancers.filter((freelancer) => {
    return freelancer.category === service.service;
  });
  appendFreelancers(filteredFreelancer);
}

// SELECT FREELANCER ID
function selectFreelancer(id) {
  navigateTo("#/freelancer-details");
  _selectedFreelancerId = id;
  const user = _freelancers.find((user) => user.id == _selectedFreelancerId);
  console.log(user);
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

// ORDER BY PRICE
function orderBy() {
  _freelancers.sort((freelancer1, freelancer2) => {
    return freelancer1.city.localeCompare(freelancer2.city);
  });
  console.log();
}

//SEARCH FUNCTIONALITY
function search(value) {
  resetFilterByName();
  value = value.toLowerCase();
  const results = _freelancers.filter((freelancer) => {
    const category = freelancer.category.toLowerCase();
    if (category.includes(value)) {
      return freelancer;
    }
  });
  appendFreelancers(results);
}

// function search(value) {
//   value = value.toLowerCase();
//   console.log(value);

//   let _usersUrl = [];
//   for (const freelancer of _freelancers) {
//     let category = category.freelancer.toLowerCase();

//     if (category.includes(value)) {
//       results.push(freelancer);
//     }
//   }
//   console.log(_freelancers);
//   appendFreelancers(_freelancers);
// }

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredFreelancers = [];
  for (let freelancer of _freelancers) {
    let name = freelancer.name.toLowerCase();
    let category = freelancer.category.toLowerCase();
    let city = freelancer.city.toLowerCase();

    if (
      name.includes(searchQuery) ||
      category.includes(searchQuery) ||
      city.includes(searchQuery)
    ) {
      filteredFreelancers.push(freelancer);
    }
  }
  console.log(filteredFreelancers);
  appendFreelancers(filteredFreelancers);
}
