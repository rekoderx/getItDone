// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
const _servicesUrl = "./json/services.json";
const _headers = {
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

let _services = [];

// GET THE USERS FROM THE JSON FILE
async function loadServices() {
  const url = _servicesUrl; // get the link to json file
  const response = await fetch(url); // wait for the response
  const data = await response.json(); // wait for data
  _services = data; // assign the data to the _services array
  appendCategories(_services); // call function to display categories to DOM
}

loadServices();

// FUNCTION TO APPEND THE SERVICES TO THE DOM
function appendCategories(services) {
  const cardsContainer = document.querySelector(".home-cards-container");
  let html = "";
  let area = 1;
  for (const service of services) {
    html += `
      <a href="">
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
