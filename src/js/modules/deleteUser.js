function confirm(callback) {
    const btns = document.querySelectorAll(".del-popup-btns button");

    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (e.currentTarget.textContent === "Delete") {
                callback(true);
            }
            callback(false);
        });
    });
}
    

export function deleteUser() {
    const delBtn = document.querySelectorAll(".del-btn");
    
    delBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let delPopupCover = document.querySelector(".delete-popup-cover");
            delPopupCover.classList.add("open");

            confirm((isConfirmed) => {
                if (isConfirmed) {
                    let item = e.target.closest(".table-item");
                    let id = item.querySelector("td:first-child").textContent;

                    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    delPopupCover.classList.remove("open");
                }

                delPopupCover.classList.remove("open");
            });
        });
    });
}