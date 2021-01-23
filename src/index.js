import woofer from "./functions.js";
import menu from "./menu.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    woofer.readWoofs(firebase.database(), (data) => {
        for (const woof in data) {
            console.log("Creating HTML for woof....");

            const container = document.createElement("div"),
                  avatar = document.createElement("span"),
                  content = document.createElement("div"),
                  text = document.createElement("div"),
                  h4 = document.createElement("h4"),
                  h3 = document.createElement("h3"),
                  more = document.createElement("div");
            
            container.classList.add("woof");
            avatar.classList.add("avatar");
            content.classList.add("content");
            text.classList.add("text");
            more.classList.add("more");

            for (let i = 0; i < 3; i++) {
                more.appendChild(document.createElement("span"));
            }

            more.childNodes[0].innerText = data[woof].fav;
            more.childNodes[1].innerText = data[woof].rewoof;

            h4.innerText = `${(new Date(data[woof].time))}`.slice(4, 10);
            h3.innerText = data[woof].text;
            
            content.append(h4, h3, more);
            container.append(avatar, content);

            console.log("Appending woof to page...");

            timeline.appendChild(container);

            console.log("Added woof " + woof.id + " to timeline.");
        }

        console.log("Completed parsing woofs onto timeline.");
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

    app.append(menu, timeline);
})();