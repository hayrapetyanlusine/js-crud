const tbody = document.querySelector("tbody");

async function buildPostsTable(container) {
    try {
        const responses = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const data = await Promise.all(responses.map((response) => response.json()));

        const [postsData, usersData] = data;
    
        postsData.map((post) => {
            let username;

            usersData.map(user => {
                if(user.id === post.userId){
                    username = user.name;
                }
            })

            const usersHtml = `
                <tr class="table-item">
                    <td>${post.id}</td>
                    <td>${username}</td>
                    <td>${post.title}</td>
                    <td>
                        <img class="edit-btn" src="./src/img/Edit_fill.png" alt="edit">
                        <img class="del-btn" src="./src/img/del_alt_duotone_line.png" alt="del">
                    </td>
                </tr>
            `;

            container.insertAdjacentHTML("beforeend", usersHtml);
        });
    } catch (err) {
        throw new Error(err);
    }
}

buildPostsTable(tbody)
    .then(() => {
        deleteUser();
        editUser();
    });

function deleteUser() {
    const delBtn = document.querySelectorAll(".del-btn");

    delBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let item = e.target.closest(".table-item");
            let id = item.querySelector('td:first-child').textContent;
            
            fetch(`'https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        })
    });
}

function editUser() {
    
}