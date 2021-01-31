const menu = (() => {
    const container = document.createElement("div"),
          avatar = document.createElement("span");
    
    for (let i = 0; i < 10; i++) {
        const icon = document.createElement("i");

        icon.classList.add("click", "fas", 
            (i === 0 ? "fa-dog" : 
            (i === 1 ? "fa-home" : 
            (i === 2 ? "fa-search" :
            (i === 3 ? "fa-bell" :
            (i === 4 ? "fa-envelope" :
            (i === 5 ? "fa-bookmark":
            (i === 6 ? "fa-file-alt" :
            (i === 7 ? "fa-user" :
            (i === 8 ? "fa-ellipsis-h" :
            (i === 9 ? "avatar" : "")
        ))))))))));

        container.appendChild(icon);
    }
    
    avatar.classList.add("avatar");

    container.id = "menu";
    container.appendChild(avatar);
    return container;
})();

export default menu;