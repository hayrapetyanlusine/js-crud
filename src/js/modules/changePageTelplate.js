const postsContainer = document.querySelector(".posts-container");

export async function changePostTemplate(actionName) {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const resp = await data.json();

    const postHtml = `
        <div id="posts">
            <div class="action">
                <div class="action-name">${actionName} Post </div>
            </div>

            <form id="form" class="create-post-form">
                <div class="create-post-main">
                    <input type="text" placeholder="Title">
                    <select name="select-user" id="select-user">
                        <option value="" disabled="disabled" selected>Select User</option>
                        ${
                            resp.map((user, i) => {
                                return `<option id=${i} value=${user.name}>${user.name}</option>`
                            })
                        }
                    </select>
                </div>
                <div class="text-div">
                    <textarea name="text" cols="35" rows="3" placeholder="Body"></textarea>
                </div>
            </form>
            
            <div class="create-post-btns">
                <input class="btn-${actionName}" type="submit" value=${actionName}>
                <button class="cancel-post-btn">Cancel</button>
            </div>
        </div>
    `;

    postsContainer.innerHTML = "";
    postsContainer.insertAdjacentHTML("beforeend", postHtml);

    // window.history.pushState({}, "", "/create");
    // history.pushState(postHtml, "post", `${actionName}`);
}

{/* <button class="btn-${actionName}">${actionName}</button> */}