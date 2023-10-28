function EditUserPost() {
    const cancelBtn = document.querySelector(".cancel-post-btn");
    const form = document.querySelector(".create-post-form");
    const selectUser = document.getElementById("select-user");
    
    let id = +selectUser.options[selectUser.selectedIndex].id;
    selectUser.addEventListener("change", () => {
        id = +selectUser.options[selectUser.selectedIndex].id;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                userId: id, 
                ...Object.fromEntries(formData.entries())
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    cancelBtn.addEventListener("click", () => {
        console.log("cancel");
    })
}
