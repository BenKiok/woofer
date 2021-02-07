const reply = () => {
    const replybox = document.createElement("div"),
          avatar = document.createElement("span"),
          content = document.createElement("div"),
          input = document.createElement("input"),
          more = document.createElement("div"),
          button = document.createElement("button");

    replybox.id = "reply";
    replybox.classList.add("woof", "border");
    avatar.classList.add("avatar");
    content.classList.add("content");
    input.type = "text";
    input.placeholder = "Type your response...";
    input.classList.add("text");
    input.id = "input";
    more.classList.add("more");
    button.innerText = "Woof";
    button.classList.add("click");

    for (let i = 0; i < 5; i++) {
        const icon = document.createElement("i");

        icon.classList.add("click", "fas", 
                (i == 0 ? "fa-camera" : 
                (i == 1 ? "fa-image" : 
                (i == 2 ? "fa-chart-bar" :
                (i == 3 ? "fa-smile" :
                (i == 4 ? "fa-calendar-alt" : "")
        )))));

        more.appendChild(icon);
    }

    more.appendChild(button);
    content.append(input, more);
    replybox.append(avatar, content);

    return replybox;
};

export default reply;