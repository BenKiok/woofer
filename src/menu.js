const menu = (() => {
    const container = document.createElement("div"),
          avatar = document.createElement("span");
    
    for (let i = 0; i < 9; i++) {
        container.appendChild(document.createElement("span"));
    }
    
    avatar.classList.add("avatar");

    container.id = "menu";
    container.appendChild(avatar);
    return container;
})();

export default menu;