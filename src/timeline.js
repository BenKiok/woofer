const timeline = (() => {
    const container = document.createElement("div"),
          main = document.createElement("div"),
          woofbox = document.createElement("div"),
            avatar = document.createElement("span"),
            content = document.createElement("div"),
            input = document.createElement("input"),
            more = document.createElement("div"),
                button = document.createElement("button"),
          breakline = document.createElement("div");

    container.id = "timeline";
    main.id = "main";
    main.classList.add("border");
    woofbox.classList.add("woof");
    avatar.classList.add("avatar");
    content.classList.add("content");
    input.type = "text";
    input.placeholder = "What's happening?";
    input.classList.add("text");
    input.id = "input";
    more.classList.add("more");
    button.innerText = "Woof";
    breakline.classList.add("break");

    for (let i = 0; i < 5; i++) {
        more.appendChild(document.createElement("span"));
    }

    more.appendChild(button);
    content.append(input, more);
    woofbox.append(avatar, content);
    main.append(woofbox, breakline);
    container.appendChild(main);

    return container;
})();

export default timeline;