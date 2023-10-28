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
                    <input type="text" placeholder="Title" name="title" required>
                    <select name="userName" id="select-user" required>
                        <option value="" disabled="disabled" selected>Select User</option>
                        ${resp.map(user => {
                          return `<option id=${user.id} value=${user.name}>${user.name}</option>`;
                        })}
                    </select>
                </div>
                <div class="text-div">
                    <textarea name="body" cols="35" rows="3" placeholder="Body"></textarea>
                </div>

                <div class="create-post-btns">
                    <button class="create-user-btn" type="submit"> ${actionName} </button>
                    <a class="cancel-post-btn nav-link-item">Cancel</a>
                </div>
            </form>
            
        </div>
    `;

    postsContainer.innerHTML = "";
    postsContainer.insertAdjacentHTML("beforeend", postHtml);
}