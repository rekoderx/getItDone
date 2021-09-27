const _baseUrl = "https://api.jsonbin.io/v3/b/614c0cda4a82881d6c53e8e2";
const _headers = {
  "X-Master-Key":
    "$2b$10$IFgw6rv / nF8X / mCvICNYRuM7HmYVhLvckpnFs.wsj.Hd / yPrDvCJq",
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
