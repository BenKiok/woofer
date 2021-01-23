import woofer from "./functions.js";
import menu from "./menu.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    timeline.querySelector("button").addEventListener("click", () => {
        const input = timeline.querySelector("#input");

        console.log("Building woof...");

        if (input.value.length > 0) {
            const newWoof = {
                text: input.value,
                fav: 0,
                rewoof: 0,
            }
            console.log("Sending woof to database...")

            if (woofer.writeWoof(newWoof)) {
                console.log("Woof has been sent!");
                input.value = "";
            }
        }
    });

    app.append(menu, timeline);
})();