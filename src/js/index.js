import { changePostTemplate } from "./modules/changePageTelplate.js";
import { buildPostsTable } from "./modules/buildPostsTable.js";
import { deleteUser } from "./modules/deleteUser.js";
import { buildMenu } from "./modules/buildMenu.js";

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



createBtn.addEventListener("click", () => changePostTemplate("Create").then(() => getUserId()));

function getUserId() {
    const selectUser = document.getElementById("select-user");

    let userName = selectUser.options[selectUser.selectedIndex].value;
    let id = selectUser.options[selectUser.selectedIndex].id;

    selectUser.addEventListener("change", () => {
        userName = selectUser.options[selectUser.selectedIndex].value;
        id = selectUser.options[selectUser.selectedIndex].id;

        createUserPost(id);
    });
}

function createUserPost(id) {
    const cancelBtn = document.querySelector(".cancel-post-btn");
    const addUserBtn = document.querySelector(".btn-Create");
    const form = document.querySelector(".create-post-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log(1111);

        // const formData = new FormData(form);
        // const data = JSON.stringify(Object.fromEntries(formData.entries()));

        // console.log(data);

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: "foo",
                body: "bar",
                userId: id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    // addUserBtn.addEventListener("click", () => {
    //     const formData = new FormData(form);
    //     const data = JSON.stringify({id, ...Object.fromEntries(formData.entries())});

    //     async function action(url, data) {
    //         await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "content-type" : "application/json"
    //             },
    //             body: data
    //         })
    //     }
    
    //     action("https://jsonplaceholder.typicode.com/posts", data)
    //         .then(() => console.log("done", data))
    //         .catch(() => console.log("server error")) 
    // });
}









// edit user
// function editUser() {
//     const editBtns = document.querySelectorAll(".edit-btn");

//     editBtns.forEach(btn => {
//         btn.addEventListener("click", (e) => {
//             // let item = e.target.closest(".table-item");
//             // let id = item.querySelector("td:first-child").textContent;

//             changePostTemplate("Edit").then(() => {
//                 const addUserBtn = document.querySelector(".btn-Edit");
//                 const cancelBtn = document.querySelector(".cancel-post-btn");
//                 const selectUser = document.getElementById("select-user");
//             });
//         });
//     });
// }













// function navigateTo(page) {
//     let content;
//     switch (page) {
//         case 'create':
//             content = "";
//             break;
//         case 'edit':
//             content = '<h2>Edit</h2><p>This is a edit page</p>';
//             break;
//         default:
//             content = `Table `;
//     }

//     document.querySelector(".posts-container").innerHTML = "";
//     document.querySelector(".posts-container").insertAdjacentHTML("beforeend", content);
//     history.pushState({ page: page }, null, `${page}`);
// }

// window.addEventListener("popstate", (e) => {
//     const page = e.state ? e.state.page : '/';
//     navigateTo(page);
// });

// const initialPage = window.location.hash.slice(1) || '/';
// navigateTo(initialPage);