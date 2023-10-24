window.addEventListener("DOMContentLoaded", () => {
    // menu toggle
    const menuBtn = document.querySelector(".menu-toggle-btn");

    menuBtn.addEventListener("click", (e) => {
        console.log(1);
        // if exest some style
    });

    // const allPromises = Promise.all([
    //     fetch("menu.json")
    // ]);

    // promise all and only then render

    const data = [
        {
            "group": "Home",
            "pages": [
                {
                    "title": "Dashboard",
                    "path": "dashboard",
                    "icone": "",
                    "children": []
                },
                {
                    "title": "Menu Style",
                    "path": "style-menu",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "group": "Pages",
            "pages": [
                {
                    "title": "Example",
                    "path": "example",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Widgets",
                    "path": "widgets",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Categories",
                    "path": "categories",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Authentication",
                    "path": "authentication",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        },
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Users",
                    "path": "users",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Error 404",
                    "path": "error 404",
                    "icone": "",
                    "children": []
                },
                {
                    "title": "Error 405",
                    "path": "error 405",
                    "icone": "",
                    "children": []
                },
                {
                    "title": "Maintence",
                    "path": "maintencs",
                    "icone": "",
                    "children": []
                }
            ]
        },
        {
            "group": "Elements",
            "pages": [
                {
                    "title": "Components",
                    "path": "components",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Form",
                    "path": "form",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Table",
                    "path": "table",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                },
                {
                    "title": "Icons",
                    "path": "icons",
                    "icone": "",
                    "children": [
                        {
                            "title": " Sub Menu Style",
                            "path": "sub-style-menu",
                            "icone": "",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]

    async function fillMenuContent(data) {
        const menuWrapper = document.querySelector(".menu-content-wrapper");
        // const data = await loadJson("menu.json");

        if (!Object.keys(data).length) return;
        // if(!data.length) return;

        for (const item of data) {
            const values = Object.values(item);

            let groupName = item.group ? `<h3 class="group-name">${item.group}</h3>` : "";
            menuWrapper.insertAdjacentHTML("beforeend", groupName);
            // let submenuItem = item.title ? `<li><a href="#">${item.title}</a></li>` : "";

            values.forEach((val) => {
                if (Array.isArray(val) && val.length !== 0) {
                    fillMenuContent(val);
                }

                let submenuItem = val.title ? `<li><a href="#">${val.title}</a></li>` : "";
                document.querySelector(".group-name").insertAdjacentHTML("beforeend", submenuItem);
            });

            // menuWrapper.insertAdjacentHTML("beforeend", groupName);
            // menuWrapper.insertAdjacentHTML("beforeend", submenuItem);

            // document.querySelector(".group-name").insertAdjacentHTML("beforeend", submenuItem);
        }
    }

    fillMenuContent(data);




    // creating posts table
    const responses = Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/users"),
    ]);

    responses
        .then((streams) => {
            return Promise.all(streams.map((stream) => stream.json()));
        })
        .then((data) => {
            const tbody = document.querySelector("tbody");

            const [postsData, usersData] = data;

            postsData.map(post => {
                let username;

                usersData.map(user => {
                    if (user.id === post.userId) {
                        username = user.name;
                    }
                })

                const usersHtml = `
                    <tr>
                        <td>${post.id}</td>
                        <td>${username}</td>
                        <td>${post.title}</td>
                        <td>${"action"}</td>
                    </tr>
                `;

                tbody.insertAdjacentHTML("beforeend", usersHtml);
            });
        });

    
    // create post
    function createPost() {
        const postsContainer = document.querySelector(".posts-container");
        const createBtn = document.querySelector(".create-btn");

        createBtn.addEventListener("click", () => {
            postsContainer.innerText = "Hello";

            let stateObject = { content: 'create' };
            let title = 'Updated Content';
            let newUrl = '/create';

            history.pushState(stateObject, title, newUrl);
        });
    }

    createPost();
});
