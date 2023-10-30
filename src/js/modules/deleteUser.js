function confirm(callback) {
    const btns = document.querySelectorAll(".del-popup-btns button");

    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.currentTarget.textContent === "Delete") {
                callback(true);
            }
            callback(false);
        });
    });
}

export function deleteUser() {
    const delBtns = document.querySelectorAll(".del-btn");

    let lastClickedItemId;

    delBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let delPopupCover = document.querySelector(".delete-popup-cover");
            delPopupCover.classList.add("open");

            let item = e.target.closest(".table-item");
            lastClickedItemId = item.querySelector("td:first-child").textContent;

            confirm((isConfirmed) => {
                if (isConfirmed) {
                    delPopupCover.classList.remove("open");
                }

                delPopupCover.classList.remove("open");
            });
        });
    });

    document.querySelector(".confirm-delete").addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${lastClickedItemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
}
