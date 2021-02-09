import login from "./login.js";
import signup from "./signup.js";
import woofer from "./functions.js";
import menu from "./menu.js";
import head from "./head.js";
import timeline from "./timeline.js";
import reply from "./reply.js";

const app = (() => {
    const app = document.querySelector("#app");

    timeline.insertBefore(head, timeline.querySelector("#main"));
    app.appendChild(login);

// // Event listeners ----------------------------------------

    login.querySelector("p").addEventListener("click", () => {
        login.remove();
        app.appendChild(signup);
    });

    signup.querySelector("p").addEventListener("click", () => {
        signup.remove();
        app.appendChild(login);
    });

    login.querySelector("button").addEventListener("click", () => {
        const email = login.querySelector("input"),
              password = login.querySelectorAll("input")[1];
        
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            let user = userCredential.user;
            login.remove();
            app.append(menu, timeline);
            menu.style.left = (timeline.offsetLeft - 72) + "px";
            woofer.readWoofs(firebase.database(), woofer.renderAllWoofs);
            addWoofListeners();
        })
        .catch((err) => {
            alert(err);
        });

        email.value = "";
        password.value = "";
    });

    signup.querySelector("button").addEventListener("click", () => {
        const email = signup.querySelector("input"),
              password = signup.querySelectorAll("input")[1];
        
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            let user = userCredential.user;
            signup.remove();
            app.append(menu, timeline);
            menu.style.left = (timeline.offsetLeft - 72) + "px";
            woofer.readWoofs(firebase.database(), woofer.renderAllWoofs);
            addWoofListeners();
        })
        .catch((err) => {
            alert(err);
        });

        email.value = "";
        password.value = "";
    });

//     window.addEventListener("resize", () => {
//         menu.style.left = (timeline.offsetLeft - 72) + "px";
//     });

//     menu.querySelector(".fa-home").addEventListener("click", () => {
//         window.location.reload();
//     });

//     head.querySelector("h1").addEventListener("click", () => {
//         window.scrollTo(0, 0);
//     });

//     timeline.querySelector("button").addEventListener("click", () => {
//         const input = timeline.querySelector("#input");

//         if (input.value.length > 0) {
//             const newWoof = {
//                 text: input.value,
//                 fav: 0,
//                 rewoof: 0,
//             }

//             if (woofer.writeWoof(newWoof)) {
//                 input.value = "";
//                 woofer.readWoofs(firebase.database(), woofer.renderNewWoof);
//             } else {
//                 alert("Unable to send woof. Try again in a few seconds.");
//             }
//         }
//     });

// Main woof logic ---------------------------------------

    function addWoofListeners () {
        setTimeout(() => {
            Array.from(document.querySelectorAll(".woof.border")).forEach((element) => {
                const more = element.querySelector(".interact"),
                    h3 = element.querySelector("h3"),
                    h4 = element.querySelector("h4");
                let bool, boolean, prevIndex;

                // for replies -----------------------------------
                more.childNodes[0].addEventListener("click", () => {
                    const mainWoof = more.parentNode.parentNode;

                    let index = Array.from(
                        mainWoof.parentNode.querySelectorAll(".woof.border:not(#reply)")
                    ).indexOf(mainWoof);

                    if (document.querySelector("#reply")) {
                        document.querySelector("#reply").remove();
                    }

                    if (prevIndex === index) {
                        prevIndex = null;
                    } else {
                        mainWoof.parentNode.insertBefore(reply(), 
                            Array.from(
                                mainWoof.parentNode.querySelectorAll(".woof.border")
                            )[index + 1]
                        );
                        prevIndex = index;
                        
                        // event listener for replies
                        document.querySelector("#reply button").addEventListener("click", () => {
                            firebase.database().ref("Woofs/").once("value", (snapshot) => {
                                const objOfWoofs = snapshot.val(),
                                    h4 = mainWoof.querySelector("h4"),
                                    h3 = mainWoof.querySelector("h3");
                                let woofObj;
                
                                for (const woof in objOfWoofs) {
                                    if (`${(new Date(objOfWoofs[woof].time))}`.slice(4, 15) == h4.innerText &&
                                        objOfWoofs[woof].text == h3.innerText) {
                                            woofObj = objOfWoofs[woof];
                                            break;
                                    }
                                }

                                const replyObj = {
                                    text: document.querySelector("#reply input").value,
                                    rewoof: 0,
                                    fav: 0
                                }

                                if(woofer.writeReplyWoof(woofObj, replyObj, mainWoof)) {
                                    document.querySelector("#reply").remove();

                                    woofObj.nextWoof.push(replyObj);
                                    woofer.createWoofHTML(woofObj.nextWoof, woofObj.nextWoof.indexOf(replyObj), true);
                                } else {
                                    console.log("Error, could not append reply.");
                                }
                            });
                        });
                    }

                });

                // for rewoofs --------------------------------------
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
                            if (!bool) {
                                thisWoof.rewoof++;
                                more.querySelectorAll("i")[1].classList.add("rewoof");
                            } else {
                                thisWoof.rewoof--;
                                more.querySelectorAll("i")[1].classList.remove("rewoof");
                            }

                            bool = !bool;
                            if (more.parentNode.parentNode.id) {
                                more.parentNode.querySelectorAll(".inline")[0].innerText = thisWoof.rewoof + " Rewoof" + (
                                    thisWoof.rewoof === 1 ? "" : "s"
                                );
                            } else {
                                more.querySelectorAll(".inline")[1].innerText = thisWoof.rewoof;
                            }
                            firebase.database().ref("Woofs/" + thisWoof.id).update(thisWoof);
                        } else {
                            alert("Error, could not find wolf.");
                        }
                    });
                });

                // for favorites/likes -------------------------------
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
                            if (!boolean) {
                                thisWoof.fav++;
                                more.querySelectorAll("i")[2].classList.add("fav");
                            } else {
                                thisWoof.fav--;
                                more.querySelectorAll("i")[2].classList.remove("fav");
                            }

                            boolean = !boolean;
                            if (more.parentNode.parentNode.id) {
                                more.parentNode.querySelectorAll(".inline")[1].innerText = thisWoof.fav + " Like" + (
                                    thisWoof.fav === 1 ? "" : "s"
                                );
                            } else {
                                more.querySelectorAll(".inline")[2].innerText = thisWoof.fav;
                            }
                            firebase.database().ref("Woofs/" + thisWoof.id).update(thisWoof);
                        } else {
                            alert("Error, could not find wolf.");
                        }
                    });
                });

                // adding woof clickability + reply rendering -----------
                element.querySelector(".text").addEventListener("click", () => {

                    // removing extra elements, switching out styling
                    woofer.removeWoofs(element, element.parentNode);
                    element.id = "focus";
                    element.parentNode.querySelector(".woofbox").classList.add("vanish");
                    element.parentNode.querySelector(".woofbox").classList.remove("woof");
                    element.parentNode.querySelector(".break").classList.add("vanish");
                    
                    // adding a return button
                    if (!element.parentNode.querySelector("#head i")) {
                        const i = document.createElement("i");
                        i.classList.add("fas", "fa-arrow-left");
                        i.addEventListener("click", () => {
                            element.parentNode.querySelector(".woofbox").classList.remove("vanish");
                            element.parentNode.querySelector(".woofbox").classList.add("woof");
                            element.parentNode.querySelector(".break").classList.remove("vanish");
                            element.parentNode.querySelector("h1").innerText = "Home";

                            i.remove();
                            element.remove();
                            
                            woofer.readWoofs(firebase.database(), woofer.renderAllWoofs);
                            addWoofListeners();
                        });
                        element.parentNode.querySelector("#head").insertBefore(i, element.parentNode.querySelector("h1"));
                    }
                    
                    element.parentNode.querySelector("h1").innerText = "Woof";

                    // readjusting the main woof
                    let tempNode = element.querySelector("h4");
                    element.querySelector("h4").remove();
                    element.querySelector(".content").insertBefore(tempNode, element.querySelector(".interact"));

                    // adding extra div
                    tempNode = element.querySelectorAll(".inline");
                    const stats = document.createElement("div");
                    stats.classList.add("stats");

                    Array.from(tempNode).forEach((node) => {
                        let index = Array.from(tempNode).indexOf(node);

                        if (index === 1 || index === 2) {
                            let tempNode2 = node.cloneNode(true);
                            tempNode2.innerText += (
                                index === 1 ? " Rewoof" : (
                                    index === 2 ? " Like" : ""
                                )
                            ) + (
                                Number(tempNode2.innerText) !== 1 ? "s" : ""
                            );
                            stats.appendChild(tempNode2);
                        }

                        node.remove();
                    });
                    
                    element.querySelector(".content").insertBefore(stats, element.querySelector(".interact"));

                    // append replies
                    woofer.readWoofs(firebase.database(), (woofs) => {
                        const h3 = element.querySelector("h3"),
                            h4 = element.querySelector("h4");
                        let thisWoof;
                        
                        for (const woof in woofs) {
                            if (`${(new Date(woofs[woof].time))}`.slice(4, 15) == h4.innerText &&
                                woofs[woof].text == h3.innerText) {
                                    thisWoof = woofs[woof];
                                    break;
                            }
                        }

                        if (thisWoof.nextWoof) {
                            woofer.renderAllWoofs(thisWoof.nextWoof, true);
                        }
                    });
                });
            });
        }, 1000);
    }

})();