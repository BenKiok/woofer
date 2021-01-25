import woofer from "./functions.js";
import menu from "./menu.js";
import head from "./head.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    woofer.readWoofs(firebase.database(), (data) => {
        for (const woof in data) {
            const container = document.createElement("div"),
                  avatar = document.createElement("span"),
                  content = document.createElement("div"),
                  text = document.createElement("div"),
                  h4 = document.createElement("h4"),
                  h3 = document.createElement("h3"),
                  more = document.createElement("div");
            
            container.classList.add("woof", "border");
            avatar.classList.add("avatar");
            content.classList.add("content");
            text.classList.add("text");
            more.classList.add("interact");

            for (let i = 0; i < 4; i++) {
                more.appendChild(document.createElement("span"));
            }

            more.childNodes[0].innerText = data[woof].fav;
            more.childNodes[1].innerText = data[woof].rewoof;
            more.childNodes[2].innerText = "^";
            more.childNodes[3].innerText = "^";

            h4.innerText = `${(new Date(data[woof].time))}`.slice(4, 15);
            h3.innerText = data[woof].text;
            
            text.append(h4, h3);
            content.append(text, more);
            container.append(avatar, content);

            timeline.appendChild(container);
        }
    });

    window.addEventListener("resize", () => {
        menu.style.left = (timeline.offsetLeft - 72) + "px";
    });

    timeline.querySelector("button").addEventListener("click", () => {
        const input = timeline.querySelector("#input");

        if (input.value.length > 0) {
            const newWoof = {
                text: input.value,
                fav: 0,
                rewoof: 0,
            }

            if (woofer.writeWoof(newWoof)) {
                input.value = "";
            } else {
                alert("Unable to send woof. Try again in a few seconds.");
            }
        }
    });

    timeline.insertBefore(head, timeline.querySelector("#main"));
    app.append(menu, timeline);
})();