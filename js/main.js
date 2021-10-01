// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
let _selectedCategoryId; // global variable used to select the clicked category in selectCategory() function
let _selectedFreelancerId; // global variable used to select the clicked user in selectFreelancer() function
let _services = []; // empty services array which is assigned all the data after feetching the json file
let _freelancers = []; // empty freelancers array which is assigned all the data after fetching freelancers json
let _filteredFreelancers = [];

const _servicesUrl = "./json/services.json"; // link to services.json
const _usersUrl = "./json/shared.json"; // link to freelancers.json
const _headers = {
  //headers used from JSONBIN.IO
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

// Function declaration for getting the data from services.json and display them on the screen
async function loadServices() {
  const url = _servicesUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _services = data; // assign the data to the _services array
  appendCategories(_services); // call function to display categories to DOM
}

loadServices(); // calling the above function

// Function declaration for getting the data from shared.json(freelancers) and assign it to the _freelancers array
async function loadFreelancers() {
  const url = _usersUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _freelancers = data; // assign the data to the _services array
}

loadFreelancers();

// Function to append the services to the DOM
function appendCategories(services) {
  const cardsContainer = document.querySelector(".home-cards-container"); // selecting the container holding the new displayed data
  let html = "";
  let area = 1; // variable used as a class name for every div inside the main div. This variable is incremented by one each time the below forof loop runs, so basically all the divs inside will have a class of .area1, .area2, .area3 etc.
  for (const service of services) {
    //iterating through all the services array and for each service, append the data required
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
  cardsContainer.innerHTML = html; // append the content of the html to cardsContainer div
}

// Function to append the freelancers to the DOM
function appendFreelancers(freelancers) {
  const freelancersCards = document.querySelector(
    ".freelancers-cards-container"
  ); // selecting from the HTML the container which will hold the freelancers cards
  const searchCards = document.querySelector(".search-cards-container"); // selecting from the HTML the container which will hold each freelancer from a specific Category

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
            <p class="price">Price: ${freelancer.price}kr.</p>
          </div>
        </div>
      </a>
    `;
  }
  freelancersCards.innerHTML = html;
  searchCards.innerHTML = html;
}

// Function to select the ID of each category clicked by the user
function selectCategory(id) {
  navigateTo("#/freelancers"); // each time a category is clicked, the page swithces to the one with that specific cateogry
  _selectedCategoryId = id; // using the global variable _selectedCategoryId to assign the id of each category
  const service = _services.find(
    (service) => service.id == _selectedCategoryId
  ); // creating a new constant which is assigned the result of FIND method onto the services array
  let pageTitle = document.querySelector(".page-title");
  pageTitle.textContent = service.service; // modifying the category title with the coresponding service name from the services array
  // FILTER FREELANERS BY CATEGORY
  let filteredFreelancer = _freelancers.filter((freelancer) => {
    return freelancer.category === service.service;
  }); // filtering the freelancers array to select only those freelancers which have the same category name as the one in services array
  appendFreelancers(filteredFreelancer); // display only the freelancers with the specific category name
  _filteredFreelancers = filteredFreelancer;
}

// ***********************************************
// ORDER BY Price and By City
function orderBy(value) {
  if (value === "price") {
    sortByPrice();
  } else if (value === "city") {
    sortByCity();
  }
}

function sortByPrice() {
  _filteredFreelancers.sort((freelancer1, freelancer2) => {
    return freelancer1.price - freelancer2.price;
  });
  appendFreelancers(_filteredFreelancers);
}

function sortByCity() {
  _filteredFreelancers.sort((freelancer1, freelancer2) => {
    return freelancer1.city.localeCompare(freelancer2.city);
  });
  appendFreelancers(_filteredFreelancers);
}
// **************************************************

// SELECT FREELANCER ID - same functionality like the above function, this time to get every user ID, when clicked on a card
function selectFreelancer(id) {
  navigateTo("#/freelancer-details");
  _selectedFreelancerId = id;
  const user = _freelancers.find((user) => user.id == _selectedFreelancerId);
}

// MAKING SEEALL BUTTON WORK - GO TO CATEGORIES
// when the user clicks on see all... link, the link's href gets the #/categories route and the pages switches to All Categories
function goToCategories() {
  const seeall = document.querySelector(".seeall");
  seeall.setAttribute("href", "#/categories");
  navigateTo("#/categories");
  window.scrollTo(0, 0);
}

// GO BACK ARROW FUNCTION
// function used for the back arrow in the top left corner, in order to switch back to the last page.
function arrowGoBack() {
  const backArrow = document.querySelector(".back-home");
  backArrow.setAttribute("href", "#/home"); // setting the #home value for the href attribute of the seeall button.
  navigateTo("#/home");
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

// search functionality for the SEARCH page
function search(value) {
  let searchQuery = value.toLowerCase(); // making sure the typed value in the search input is always lowerCase
  let filteredFreelancers = []; // declaring a new empty array
  for (let freelancer of _freelancers) {
    // for of loop to freelancers array
    let name = freelancer.name.toLowerCase(); // get the name property from each freelancer and assigne the loweredCase value to the name variable
    let category = freelancer.category.toLowerCase(); // same functionality as above
    let city = freelancer.city.toLowerCase(); // same functionality as above

    // checking if the diserd properties (name, category and city) includes the typed value in the search input
    if (
      name.includes(searchQuery) ||
      category.includes(searchQuery) ||
      city.includes(searchQuery)
    ) {
      // pushing found values into the new array
      filteredFreelancers.push(freelancer);
    }
  }
  appendFreelancers(filteredFreelancers); // append the results to the DOM
}
