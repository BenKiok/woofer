import woofer from "./functions.js";
import menu from "./menu.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    app.append(menu, timeline);
})();