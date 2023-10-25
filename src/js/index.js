window.addEventListener("DOMContentLoaded", () => {
    // menu toggle
    const menuBtn = document.querySelector(".menu-toggle-btn");

    menuBtn.addEventListener("click", (e) => {
        console.log(1);
        // if exest some style
    });



    // create menu json tree 
    const container = document.querySelector(".menu-content-wrapper");

    const menuData = fetch("menu.json")
        .then(jsonData => jsonData.json())
        .then(data => createTree(container, data));

    function createTree(container, data) {
        container.insertAdjacentHTML("beforeend", createTreeText(data));
    }

    function createTreeText(arr) {
        if (!arr || arr.length === 0) {
            return "";
        }

        let menuHTML = "<ul>";
        for (const node of arr) {
            menuHTML += `<li>${node.group || node.title}`;
            menuHTML += createTreeText(node.pages || node.children);
            menuHTML += "</li>";
        }
        menuHTML += "</ul>";
    
        return menuHTML;
    }




    // function fillMenuContent(data) {
    //     const menuWrapper = document.querySelector(".menu-content-wrapper");

    //     if(!Object.keys(obj).length) return;

    //     for (let item of data) {
    //         let li = document.createElement('li');
    //         li.innerHTML = item;

    //         let childrenUl = createTreeDom(data[item]);
    //         if (childrenUl) {
    //         li.append(childrenUl);
    //         }

    //         ul.append(li);
    //     }
    // }


    // function fillMenuContent(data) {
    //     const menuWrapper = document.querySelector(".menu-content-wrapper");

    //     // if (!Object.keys(data).length) return;
    //     // if(!data.length) return;

    //     for (const item of data) {
    //         const values = Object.values(item);

    //         let groupName = item.group ? `<h3 class="group-name">${item.group}</h3>` : "";
    //         menuWrapper.insertAdjacentHTML("beforeend", groupName);

    //         let submenuItem = item.title ? `<li><a href="#">${item.title}</a></li>` : "";

    //         values.forEach((val) => {
    //             if (Array.isArray(val) && val.length !== 0) {
    //                 fillMenuContent(val);
    //             }

    //             // let submenuItem = val.title ? `<li><a href="#">${val.title}</a></li>` : "";
    //             // document.querySelector(".group-name").insertAdjacentHTML("beforeend", submenuItem);
    //         });

    //         // menuWrapper.insertAdjacentHTML("beforeend", groupName);
    //         menuWrapper.insertAdjacentHTML("beforeend", submenuItem);

    //         document.querySelector(".group-name").insertAdjacentHTML("beforeend", submenuItem);
    //     }
    // }

    // fillMenuContent(data);




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
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8707 10.796L19.6667 9C20.212 8.45475 20.4846 8.18213 20.6303 7.88803C20.9076 7.32848 20.9076 6.67153 20.6303 6.11197C20.4846 5.81788 20.212 5.54525 19.6667 5C19.1215 4.45475 18.8488 4.18213 18.5547 4.03639C17.9952 3.75911 17.3382 3.75911 16.7787 4.03639C16.4846 4.18213 16.212 4.45475 15.6667 5L13.848 6.81866C14.8119 8.46926 16.1981 9.84482 17.8707 10.796ZM12.3936 8.27312L5.52308 15.1436C5.09802 15.5687 4.88549 15.7812 4.74576 16.0423C4.60602 16.3034 4.54708 16.5981 4.42919 17.1876L3.81379 20.2646C3.74727 20.5972 3.71401 20.7635 3.80862 20.8581C3.90322 20.9527 4.06953 20.9194 4.40214 20.8529L7.47912 20.2375C8.06857 20.1196 8.3633 20.0607 8.6244 19.9209C8.88549 19.7812 9.09802 19.5687 9.52308 19.1436L16.4125 12.2542C14.7908 11.2386 13.4191 9.87628 12.3936 8.27312Z" fill="#222222"/>
                            </svg>
                        </td>
                    </tr>
                `;

                tbody.insertAdjacentHTML("beforeend", usersHtml);
            });
        });

    
    async function getUsersInfo() {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");

        return await data.json()
    }
    

    // create post
    function createPost() {
        const postsContainer = document.querySelector(".posts-container");
        const createBtn = document.querySelector(".create-btn");

        createBtn.addEventListener("click", () => {
            // const url = window.location.href;

            const usersData = getUsersInfo();

            usersData.then(users => {
                users.map((user) => {
                    // user.name
                });
            });

            const postHtml = `
                <div id="posts">
                    <div class="action">
                        <div class="action-name">Create Post</div>
                    </div>

                    <form class="create-post-form">
                        <div class="create-post-main">
                            <input type="text" placeholder="Title">
                            <select name="select-user" id="select-user">
                                <option value=${name}>${name}</option>
                            </select>
                        </div>
                        <div class="text-div">
                            <textarea name="text" cols="35" rows="3"></textarea>
                        </div>
                    </form>
                    
                    <div class="create-post-btns">
                        <button class="create-post-btn">Create</button>
                        <button class="cancel-post-btn">Cancel</button>
                    </div>
                </div>
            `;

            postsContainer.innerHTML = "";
            postsContainer.insertAdjacentHTML("beforeend", postHtml);

            window.history.pushState({}, "", "/create");
        });
    }

    createPost();
});
