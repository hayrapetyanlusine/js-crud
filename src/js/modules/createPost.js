const postsContainer = document.querySelector(".posts-container");
const createBtn = document.querySelector(".create-btn");

createBtn.addEventListener("click", (e) => {
    e.preventDefault();

    createPost();
});

async function createPost() {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const resp = await data.json();

    const postHtml = `
        <div id="posts">
            <div class="action">
                <div class="action-name">Create Post</div>
            </div>

            <form class="create-post-form">
                <div class="create-post-main">
                    <input type="text" placeholder="Title">
                    <select name="select-user" id="select-user">
                        ${
                            resp.map(user => {
                                return `<option value=${user.name}>${user.name}</option>`
                            })
                        }
                        <option value=${"name"}>${"name"}</option>
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

    // window.history.pushState({}, "", "/create");
    history.pushState(postHtml, "post", "/create");
}


// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const inpVal = input.value.trim();

//     if (inpVal !== "") {
//         const formData = new FormData(form);
//         const data = JSON.stringify(Object.fromEntries(formData.entries()));

//         async function action(DB_URL, data) {
//             await fetch(DB_URL, {
//                 method: "POST",
//                 headers: {
//                     "content-type" : "application/json"
//                 },
//                 body: data
//             })
//         }
    
//         action(DB_URL, data)
//             .then(() => console.log("done"))
//             .catch(() => console.log("server error"))   
//     }
// })
