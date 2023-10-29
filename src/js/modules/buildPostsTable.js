export async function getPostsData() {
    try {
        const responses = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/posts"),
            fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const data = await Promise.all(responses.map((response) => response.json()));
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export function buildPostsTable(data = []) {
    let tableHTML = `
        <div id="posts">
            <div class="action">
                <div class="action-name">Posts</div>
                <a class="create-btn nav-link-item">Edit</a>
            </div>

            <table id="table" border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (data.length > 0) {
        const [postsData, usersData] = data;

        postsData.forEach((post) => {
            const user = usersData.find(user => user.id === post.userId);

            tableHTML += `
                <tr class="table-item">
                    <td>${post.id}</td>
                    <td>${user.name}</td>
                    <td>${post.title}</td>
                    <td>
                        <a class="nav-link-item">
                            <img class="edit-btn" src="./src/img/Edit_fill.png" alt="edit">
                        </a>
                        <img class="del-btn" src="./src/img/del_alt_duotone_line.png" alt="del">
                    </td>
                </tr>`;
        });
    }

    tableHTML += `
                </tbody>
            </table>
        </div>`;

    return tableHTML;
}