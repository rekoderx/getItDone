/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
  "#/home": "home",
  "#/search": "search",
  "#/favorites": "favorites",
  "#/profile-page": "profile-page",
  "#/categories": "categories",
};

/**
 * Initialising the router, calling attachNavLinkEvents() and navigateTo()
 */
function initRouter() {
  attachNavLinkEvents();

  let defaultPath = "#/home";
  if (routes[location.hash]) {
    defaultPath = location.hash;
  }
  navigateTo(defaultPath);
}

initRouter();

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", function (event) {
      const path = link.getAttribute("href");
      navigateTo(path);
      event.preventDefault();
    });
  }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
function navigateTo(pathname) {
  hideAllPages();
  const basePath = location.pathname.replace("index.html", "");
  window.history.pushState({}, pathname, basePath + pathname);
  console.log(`#${routes[pathname]}`);
  document.querySelector(`#${routes[pathname]}`).style.display = "block";
  setActiveTab(pathname);
}

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  for (const page of pages) {
    page.style.display = "none";
  }
}

/**
 * sets active tabbar/ menu item
 */
function setActiveTab(pathname) {
  const navLinks = document.querySelectorAll("nav a");
  for (const link of navLinks) {
    if (pathname === link.getAttribute("href")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
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
