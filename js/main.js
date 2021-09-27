// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
const _baseUrl = "https://api.jsonbin.io/b/61518e6a4a82881d6c5643ee";
const _headers = {
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

let _freelancers = [];

async function loadUsers() {
  const url = _baseUrl + "/latest";
  const response = await fetch(url, { headers: _headers });
  const data = await response.json();
  _freelancers = data;
  // appendCategories(_freelancers)

  let cat = _freelancers.filter((categ) => {
    return categ.category.title === "cleaning";
  });
  console.log(cat);

  function appendCategories(categories) {
    const cardsContainer = document.querySelector(".cards-container");
    let html = "";
    for (const category of categories) {
      html += `
        <div class="card area1">
          <div class="card-image">
            <img src="${category.category.image}"
          </div>
          <h4>${category.category.title}</h4>
        </div>
        `;
    }
    cardsContainer.innerHTML = html;
  }

  appendCategories(_freelancers);
}

loadUsers();
