export function editUserPost() {
    const cancelBtn = document.querySelector(".cancel-post-btn");
    const form = document.querySelector(".create-post-form");
    const selectUser = document.getElementById("select-user");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = +selectUser.options[selectUser.selectedIndex].id;
        const formData = new FormData(form);

        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                userId: id, 
                ...Object.fromEntries(formData.entries())
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch(err => console.log(err));

        cancelBtn.click();
    });
}