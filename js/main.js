// CREATING DEFAULT LINK VARIABLES
// AND HEADERS
const _baseUrl = "https://api.jsonbin.io/b/61518e6a4a82881d6c5643ee";
const _headers = {
  "X-Master-Key":
    "$2b$10$lLZ4Z9H3WZUcJ4XWsirYUO3B5Hk6B/qbX5zeBLvZPl/vbePHGTrii",
  "Content-Tupe": "application/json",
};

async function loadUsers() {
  const url = _baseUrl + "/latest";
  const response = await fetch(url, { headers: _headers });
  //   console.log(response);
  const data = await response.json();
  console.log(JSON.stringify(data.record));
}

loadUsers();
