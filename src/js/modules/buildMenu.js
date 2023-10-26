const container = document.querySelector(".menu-content-wrapper");

async function fetchData() {
    try {
        const response = await fetch('menu.json');
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

fetchData().then(data => container.replaceWith(buildMenu(data, 0)));

function buildMenu(nodes, level) {
    let wrapper = document.createElement("div");
    wrapper.className = "menu-group";

    for (let node of nodes) {
        let item = document.createElement("div");
        item.className = "menu-item";

        let title = node.group || node.title;
        let prefix = document.createElement("pre");
        for (let i = 0; i < level; i++) {
            prefix.innerText += "      ";
        }
        item.innerHTML = `<p class="title">${title}</p>`;
        item.prepend(prefix);

        let children = node.children || node.pages;
        if (children && children.length) {
            const icon = document.createElement("img");
            icon.src = "./src/img/icon.png";
            item.append(icon);

            item.appendChild(buildMenu(children, level + 1));
        }

        wrapper.appendChild(item);

        item.addEventListener("click", e => {
            e.stopPropagation();
            item.classList.toggle("open");
        })
    }

    return wrapper;
}