const menu = (() => {
    const container = document.createElement("div"),
          div = document.createElement("div");
    
    for (let i = 0; i < 10; i++) {
        div.appendChild(document.createElement("span"));
    }

    div.childNodes[9].classList.add("avatar");

    container.id = "menu";
    container.appendChild(div);
    return container;
})();

export default menu;