import woofer from "./functions.js";
import menu from "./menu.js";
import head from "./head.js";
import timeline from "./timeline.js";

const app = (() => {
    const app = document.querySelector("#app");

    woofer.readWoofs(firebase.database(), renderAllWoofs);

// Event listeners ----------------------------------------

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
                woofer.readWoofs(firebase.database(), renderNewWoof);
            } else {
                alert("Unable to send woof. Try again in a few seconds.");
            }
        }
    });

    timeline.insertBefore(head, timeline.querySelector("#main"));
    app.append(menu, timeline);
    menu.style.left = (timeline.offsetLeft - 72) + "px";

// Accessory functions ------------------------------------

    function renderAllWoofs (data) {
        for (const prop in data) {
            createWoofHTML(data, prop);
        }
    }

    function renderNewWoof (data) {
        let dataArr = [],
            i;

        for (const prop in data) {
            dataArr.push(data[prop]);
        }

        i = dataArr.length - 1;

        createWoofHTML(dataArr, i);
    }

    function createWoofHTML (data, prop) {
        const container = document.createElement("div"),
              avatar = document.createElement("span"),
              content = document.createElement("div"),
              text = document.createElement("div"),
              h4 = document.createElement("h4"),
              h3 = document.createElement("h3"),
              more = document.createElement("div");
        let incVal1, incVal2;
        
        container.classList.add("woof", "border");
        avatar.classList.add("avatar");
        content.classList.add("content");
        text.classList.add("text");
        more.classList.add("interact");

        for (let i = 0; i < 4; i++) {
            more.appendChild(document.createElement("span"));
            more.childNodes[i].classList.add("click");
        }

        more.childNodes[0].innerText = (data[prop].newWoof ? data[prop].newWoof.length : "0");
        more.childNodes[1].innerText = data[prop].fav;
        more.childNodes[2].innerText = data[prop].rewoof;
        more.childNodes[3].innerText = "^";

        h4.innerText = `${(new Date(data[prop].time))}`.slice(4, 15);
        h3.innerText = data[prop].text;

        // ******* add event listeners here ********
        more.childNodes[1].addEventListener("click", () => {
            firebase.database().ref("Woofs/").once("value", (snapshot) => {
                const woofs = snapshot.val();
                let thisWoof;

                for (const woof in woofs) {
                    if (`${(new Date(woofs[woof].time))}`.slice(4, 15) == h4.innerText &&
                        woofs[woof].text == h3.innerText) {
                            thisWoof = woofs[woof];
                            break;
                    }
                }

                if (thisWoof) {
                    if (!incVal1) {
                        thisWoof.fav++;
                    } else {
                        thisWoof.fav--;
                    }

                    incVal1 = !incVal1;
                    more.childNodes[1].innerText = thisWoof.fav;
                    firebase.database().ref("Woofs/" + thisWoof.id).update(thisWoof);
                } else {
                    alert("Error, could not find wolf.");
                }
            });
        });

        more.childNodes[2].addEventListener("click", () => {
            firebase.database().ref("Woofs/").once("value", (snapshot) => {
                const woofs = snapshot.val();
                let thisWoof;

                for (const woof in woofs) {
                    if (`${(new Date(woofs[woof].time))}`.slice(4, 15) == h4.innerText &&
                        woofs[woof].text == h3.innerText) {
                            thisWoof = woofs[woof];
                            break;
                    }
                }

                if (thisWoof) {
                    if (!incVal2) {
                        thisWoof.rewoof++;
                    } else {
                        thisWoof.rewoof--;
                    }

                    incVal2 = !incVal2;
                    more.childNodes[2].innerText = thisWoof.rewoof;
                    firebase.database().ref("Woofs/" + thisWoof.id).update(thisWoof);
                } else {
                    alert("Error, could not find wolf.");
                }
            });
        });

        text.append(h4, h3);
        content.append(text, more);
        container.append(avatar, content);
        
        timeline.insertBefore(container, timeline.querySelector(".woof.border"));
    }
})();