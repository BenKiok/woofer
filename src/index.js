import woofer from "./functions.js";
import menu from "./menu.js";
import head from "./head.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    woofer.readWoofs(firebase.database(), woofer.renderAllWoofs);

// Event listeners ----------------------------------------

    window.addEventListener("resize", () => {
        menu.style.left = (timeline.offsetLeft - 72) + "px";
    });

    menu.querySelector(".fa-home").addEventListener("click", () => {
        window.location.reload();
    });

    head.querySelector("h1").addEventListener("click", () => {
        window.scrollTo(0, 0);
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
                woofer.readWoofs(firebase.database(), woofer.renderNewWoof);
            } else {
                alert("Unable to send woof. Try again in a few seconds.");
            }
        }
    });

    timeline.insertBefore(head, timeline.querySelector("#main"));
    app.append(menu, timeline);
    menu.style.left = (timeline.offsetLeft - 72) + "px";

})();