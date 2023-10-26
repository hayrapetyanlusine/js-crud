const tbody = document.querySelector("tbody");

async function buildPostsTable(container) {
    try {
        const responses = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const data = await Promise.all(responses.map((response) => response.json()));

        const [postsData, usersData] = data;
    
        postsData.forEach((post) => {
            const user = usersData.find((user) => user.id === post.userId);
            const username = user ? user.name : "Unknown User";

            const usersHtml = `
                <tr>
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

buildPostsTable(tbody);