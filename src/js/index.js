import { changePostTemplate } from "./modules/changePageTelplate.js";
import { buildPostsTable } from "./modules/buildPostsTable.js";
import { deleteUser } from "./modules/deleteUser.js";
import { buildMenu } from "./modules/buildMenu.js";
import { createUserPost } from "./modules/createUserPosr.js";

const container = document.querySelector(".menu-content-wrapper");
const createBtn = document.querySelector(".create-btn");

// build menu
async function fetchData() {
    try {
        const response = await fetch('menu.json');
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

fetchData().then(data => container.replaceWith(buildMenu(data, 0)));

// build posts
buildPostsTable()
    .then(() => {
        deleteUser();
        editUser();
    })
    .catch((err) => new Error(err));


createBtn.addEventListener("click", () => changePostTemplate("Create").then(() => createUserPost()));


async function editUser() {
    const editBtns = document.querySelectorAll(".edit-btn");

    editBtns.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            let item = e.target.closest(".table-item");
            let id = +item.querySelector("td:first-child").textContent;

            await changePostTemplate("Edit");

            const form = document.querySelector(".create-post-form");
            const selectUser = document.getElementById("select-user");
            selectUser.selectedIndex = id;

            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                await fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        userId: id, 
                        ...Object.fromEntries(formData.entries())
                    })
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json));
            });
        });
    });
}






// page navigation
// const routes = {
//   "/": {
//     linkLabel: "Cancel",
//     content: buildPostsTable()
//   },
//   "/create": {
//     linkLabel: "create",
//     content: `<h1>Create page</h1>`
//   },
//   "/edit": {
//     linkLabel: "edit",
//     content: `<h1>Edit page</h1>`
//   }
// };

// const nav = document.querySelector(".nav-link-item");
// const appChangePart = document.querySelector(".posts-container");

// const renderContent = (route) => (appChangePart.innerHTML = routes[route].content);

// const navigate = (e) => {
//   const route = e.target.pathname;
//   window.history.pushState({}, "", route);
//   renderContent(route);
// };

// const registerNavLinks = () => {
//   nav.addEventListener("click", (e) => {
//     e.preventDefault();
//     const { href } = e.target;
//     window.history.pushState({}, "", href);
//     navigate(e);
//   });
// };

// function addRouteName () {
//     const content = `/${nav.textContent.toLowerCase()}`;

//     Object.keys(routes).forEach((route) => {
//         if(content === "/cancel") {
//             nav.href = "/";
//         }

//         if (content === route) {
//             nav.href = route;
//         }
//     });
// }


// const registerBrowserBackAndForth = () => {
//   window.onpopstate = function (e) {
//     const route = window.location.pathname;
//     renderContent(route);
//   };
// };

// const renderInitialPage = () => {
//   const route = window.location.pathname;
//   renderContent(route);
// };

// (function bootup() {
//     addRouteName();
//     registerNavLinks();
//     registerBrowserBackAndForth();
//     renderInitialPage();
// })();
