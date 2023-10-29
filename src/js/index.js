import { buildPostHTML, getUserData } from "./modules/changePageTelplate.js";
import { buildPostsTable, getPostsData } from "./modules/buildPostsTable.js";
import { createUserPost } from "./modules/createUserPost.js";
import { buildMenu } from "./modules/buildMenu.js";
import { editUserPost } from "./modules/edituserPost.js";

const appChangePartContainer = document.querySelector(".posts-container");
const menuContainer = document.querySelector(".menu-content-wrapper");

// build menu
async function getMenuData() {
    try {
        const response = await fetch('menu.json');
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

getMenuData().then(data => menuContainer.replaceWith(buildMenu(data, 0)));



//when click edit buttons coose currect 

// async function editUser() {
//     const editBtns = document.querySelectorAll(".edit-btn");

//     editBtns.forEach(btn => {
//         btn.addEventListener("click", async (e) => {
//             console.log("clickbtn");

//             let item = e.target.closest(".table-item");
//             let id = +item.querySelector("td:first-child").textContent;

//             await changePostTemplate("Edit");

//             const form = document.querySelector(".create-post-form");
//             const selectUser = document.getElementById("select-user");
//             selectUser.selectedIndex = id;

//             form.addEventListener("submit", async (e) => {
//                 e.preventDefault();

//                 const formData = new FormData(form);

//                 await fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-type": "application/json; charset=UTF-8"
//                     },
//                     body: JSON.stringify({
//                         userId: id, 
//                         ...Object.fromEntries(formData.entries())
//                     })
//                 })
//                     .then((response) => response.json())
//                     .then((json) => console.log(json));
//             });
//         });
//     });
// }

// editUser();



async function renderContent(route) {
    const data = await getPostsData();
    const userData = await getUserData().then(data => data);

    const routes = {
        "/": {
            linkLabel: "Cancel",
            content: buildPostsTable(data)
        },
        "/create": { 
            linkLabel: "create",
            content: buildPostHTML(userData, "Create")
        },
        "/edit": {
            linkLabel: "edit",
            content: buildPostHTML(userData, "Edit")
        }
    };

    appChangePartContainer.innerHTML = "";
    appChangePartContainer.insertAdjacentHTML("beforeend", routes[route].content);

    let nav = document.querySelector(".nav-link-item");

    const editBtns = document.querySelectorAll(".edit-btn");

    editBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const a = document.createElement("a");
            a.classList.add("nav-link-item");
            a.innerText = "Edit";
            a.href = "/edit";

            nav = a;

            // create that when click change edit page
        });
    })

    function addRouteName () {
        const content = `/${nav.textContent.toLowerCase()}`;
    
        Object.keys(routes).forEach((route) => {
            if(content === "/cancel") {
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
    };

    addRouteName();
    registerNavLinks();
    console.log("--nav--", nav);

    if(window.location.pathname === "/create") {
        createUserPost();
    }

    if(window.location.pathname === "/edit") {
        editUserPost();
    }
}

const navigate = (e) => {
  const route = e.target.pathname;
  window.history.pushState({}, "", route);
  renderContent(route);
};

const registerBrowserBackAndForth = () => {
  window.onpopstate = function (e) {
    const route = window.location.pathname;
    renderContent(route);
  };
};

const renderInitialPage = () => {
  const route = window.location.pathname;
  renderContent(route);
};

(function bootup() {
  registerBrowserBackAndForth();
  renderInitialPage();
})();
