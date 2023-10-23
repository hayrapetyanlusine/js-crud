const jsonData = [
	{
		"group": "Home",
		"pages": [
			{
				"title": "Dashboard",
				"path": "dashboard",
				"icone": "",
				"children": []
			},
			{
				"title": "Menu Style",
				"path": "style-menu",
				"icone": "",
				"children": [
					{
						"title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
					}
				]
			}
		]
	},
	{
		"group": "Pages",
		"pages": [
			{
                "title": "Example",
				"path": "example",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Widgets",
				"path": "widgets",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Categories",
				"path": "categories",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Authentication",
                "path": "authentication",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    },
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Users",
                "path": "users",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Error 404",
                "path": "error 404",
				"icone": "",
				"children": []
            },
            {
                "title": "Error 405",
                "path": "error 405",
				"icone": "",
				"children": []
            },
            {
                "title": "Maintence",
                "path": "maintencs",
				"icone": "",
				"children": []
            }
		]
	},
	{
		"group": "Elements",
        "pages": [
            {
                "title": "Components",
				"path": "components",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Form",
				"path": "form",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Table",
				"path": "table",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            },
            {
                "title": "Icons",
				"path": "icons",
				"icone": "",
				"children": [
                    {
                        "title": " Sub Menu Style",
						"path": "sub-style-menu",
						"icone": "",
						"children": []
                    }
                ]
            }
        ]
	}
]

window.addEventListener("DOMContentLoaded", () => {
    // menu toggle
    const menuBtn = document.querySelector(".menu-toggle-btn");

    menuBtn.addEventListener("click", (e) => {
        console.log(1);
        // if exest some style
    });


    function fillMenuContent(data) {
        console.log(data);
    
        const menuWrapper = document.querySelector(".menu-content-wrapper");
    
        data.forEach(item => {
            let submenuItem = `
                <p>${item.group}</p>
                <li class=""> <a href="#">${item}</a></li>
            `;
    
            menuWrapper.insertAdjacentHTML("beforeend", submenuItem);
    
            // if(item.children.length !== 0) {
            //     console.log("yes");
            // }
            // fillMenuContent(ul, item.submenu);
        });
    }
    
    fillMenuContent(jsonData);
});