window.addEventListener("DOMContentLoaded", () => {
    // menu toggle
    const menuBtn = document.querySelector(".menu-toggle-btn");

    menuBtn.addEventListener("click", (e) => {
        console.log(1);
        // if exest some style
    });


    async function loadJson(url) {
        let response = await fetch(url);

        if (response.status == 200) {
            return response.json();
        }
        
        throw new Error(response);
    }

    async function fillMenuContent() {
        const menuWrapper = document.querySelector(".menu-content-wrapper");
        const data = await loadJson("menu.json");

       console.log(data);
        for (const { group, pages } of data) {
            // if(children.length > 0) {
            //     // fillMenuContent(pages);
            // }

            let submenuItem = `
                <p>${group}</p>
                <li class=""> <a href="#">${pages}</a></li>
            `;

            menuWrapper.insertAdjacentHTML("beforeend", submenuItem);
        }
    }

    fillMenuContent()
});