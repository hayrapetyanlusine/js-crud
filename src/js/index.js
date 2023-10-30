import { buildPostHTML, getUserData } from "./modules/changePageTelplate.js";
import { buildPostsTable, getPostsData } from "./modules/buildPostsTable.js";
import { createUserPost } from "./modules/createUserPost.js";
import { editUserPost } from "./modules/edituserPost.js";
import { deleteUser } from "./modules/deleteUser.js";
import { buildMenu } from "./modules/buildMenu.js";

const appChangePartContainer = document.querySelector(".posts-container");
const menuContainer = document.querySelector(".menu-content-wrapper");

// build menu
async function getMenuData() {
  try {
    const response = await fetch("menu.json");
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
}

getMenuData().then((data) => menuContainer.replaceWith(buildMenu(data, 0)));

//page navigation
async function renderContent(route) {
  const data = await getPostsData();
  const userData = await getUserData().then((data) => data);

  const routes = {
    "/": {
      linkLabel: "Cancel",
      content: buildPostsTable(data),
    },
    "/create": {
      linkLabel: "create",
      content: buildPostHTML(userData, "Create"),
    },
    "/edit": {
      linkLabel: "edit",
      content: buildPostHTML(userData, "Edit"),
    },
  };

  appChangePartContainer.innerHTML = "";
  appChangePartContainer.insertAdjacentHTML("beforeend", routes[route].content);

  const editBtns = document.querySelectorAll(".edit-btn");
  let nav = document.querySelector(".nav-link-item");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const a = document.createElement("a");
      a.classList.add("nav-link-item");
      a.innerText = "Edit";
      a.href = "/edit";

      nav = a;
      addRouteName();
      registerNavLinks();
      nav.click();
    });
  });

  function addRouteName() {
    const content = `/${nav.textContent.toLowerCase()}`;

    Object.keys(routes).forEach((route) => {
      if (content === "/cancel") {
        nav.href = "/";
      }

      if (content === route) {
        nav.href = route;
      }
    });
  }

  function registerNavLinks() {
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", e.target.href);
      navigate(e);
    });
  }

  addRouteName();
  registerNavLinks();
  deleteUser();

  if (window.location.pathname === "/create") {
    createUserPost();
  }

  if (window.location.pathname === "/edit") {
    editUserPost();
  }
}

function navigate(e) {
  const route = e.target.pathname;
  window.history.pushState({}, "", route);
  renderContent(route);
}

function registerBrowserBackAndForth() {
  window.addEventListener("popstate", () => {
    const route = window.location.pathname;
    renderContent(route);
  });
}

function renderInitialPage() {
  const route = window.location.pathname;
  renderContent(route);
}

(function bootup() {
  registerBrowserBackAndForth();
  renderInitialPage();
})();
