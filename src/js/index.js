window.addEventListener("DOMContentLoaded", () => {
   
});

function navigateTo(page) {
    let content;
    switch (page) {
        case 'create':
            content = "";
            break;
        case 'edit':
            content = '<h2>Edit</h2><p>This is a edit page</p>';
            break;
        default:
            content = `Table `;
    }

    document.querySelector(".posts-container").innerHTML = "";
    document.querySelector(".posts-container").insertAdjacentHTML("beforeend", content);
    history.pushState({ page: page }, null, `${page}`);
}

// window.addEventListener("popstate", (e) => {
//     const page = e.state ? e.state.page : '/';
//     navigateTo(page);
// });

// const initialPage = window.location.hash.slice(1) || '/';
// navigateTo(initialPage);