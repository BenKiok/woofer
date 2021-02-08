import reply from "./reply.js";

const functions = (() => {
    const writeWoof = (obj) => {
        let woofId;

        if (typeof obj === "object" && obj) {
            obj.time = (new Date).getTime();
            woofId = firebase.database().ref("/Woofs/").push(obj).key;
            obj.id = woofId;
            firebase.database().ref("/Woofs/" + woofId).update(obj);

            return true;
        }

        return false;
    }

    const writeReplyWoof = (obj, replyObj, node) => {
        let woofId = obj.id;

        if (typeof obj === "object" && obj) {
            if (typeof replyObj === "object" && replyObj) {
                replyObj.time = (new Date).getTime();
                if (obj.nextWoof) {
                    obj.nextWoof.push(replyObj);

                    if (node.id === "focus") {
                        console.log("Appending reply...");
                    }
                } else {
                    obj.nextWoof = [ replyObj ];
                }
                if (node.querySelector("span .inline")) {
                    node.querySelector("span .inline").innerText = obj.nextWoof.length;
                }
                firebase.database().ref("/Woofs/" + woofId).update(obj);

                return true;
            }
        }

        return false;
    }

    const readWoofs = (db, cb) => {
        db.ref("/Woofs/").once("value", 
            (promise) => {
                cb(promise.val());
            });
    }

    function addReplyListener (element) {
        const more = element.querySelector(".interact"),
              h3 = element.querySelector("h3"),
              h4 = element.querySelector("h4");

        if (more) {
            let prevIndex;

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

                            if(writeReplyWoof(woofObj, replyObj, mainWoof)) {
                                document.querySelector("#reply").remove();

                                woofObj.nextWoof.push(replyObj);
                                createWoofHTML(woofObj.nextWoof, woofObj.nextWoof.indexOf(replyObj), true);
                            } else {
                                console.log("Error, could not append reply.");
                            }
                        });
                    });
                }

            });
        }
    }

    function addRewoofListener (element) {
        const more = element.querySelector(".interact"),
              h3 = element.querySelector("h3"),
              h4 = element.querySelector("h4");
        let bool;

        if (more) {
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
        }
    }

    function addFavListener (element) {
        const more = element.querySelector(".interact"),
              h3 = element.querySelector("h3"),
              h4 = element.querySelector("h4");
        let boolean;

        if (more) {
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
        }
    }

    function addFocusListener (element) {
        element.querySelector(".text").addEventListener("click", () => {
            // removing extra elements, switching out styling
            removeWoofs(element, element.parentNode);
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
                    
                    readWoofs(firebase.database(), renderAllWoofs);
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
            readWoofs(firebase.database(), (woofs) => {
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
                    renderAllWoofs(thisWoof.nextWoof, true);
                }
            });
        });
    }

    function renderAllWoofs (data, reverse = false) {
        for (const prop in data) {
            createWoofHTML(data, prop, reverse);
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

    function createWoofHTML (data, prop, reverseRender) {
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
            const span = document.createElement("span"),
                  icon = document.createElement("i"),
                  text = document.createElement("p");
            
            icon.classList.add("click", "fas", 
                (i === 0 ? "fa-reply" : 
                (i === 1 ? "fa-retweet" : 
                (i === 2 ? "fa-heart" :
                (i === 3 ? "fa-share-square" : "")
            ))));

            text.innerText = 
                (i === 0 ? (data[prop].nextWoof ? data[prop].nextWoof.length : "0") : 
                (i === 1 ? data[prop].rewoof : 
                (i === 2 ? data[prop].fav : ""
            )));
            text.classList.add("inline");

            span.append(icon, text);
            more.appendChild(span);
        }
        
        h4.innerText = `${(new Date(data[prop].time))}`.slice(4, 15);
        h3.innerText = data[prop].text;

        text.append(h4, h3);
        content.append(text, more);
        container.append(avatar, content);

        if (reverseRender) {
            timeline.appendChild(container);
        } else {
            addReplyListener(container);
            addRewoofListener(container);
            addFavListener(container);
            addFocusListener(container);
            timeline.insertBefore(container, timeline.querySelector(".woof.border"));
        }
    }

    function removeWoofs (node, parent) {
        const parentObj = { ...parent.querySelectorAll(".woof.border") };
        
        for (const child in parentObj) {
            if (parentObj[child] !== node) {
                parentObj[child].remove();
            }
        }

        if (Array.from(parent.querySelectorAll(".woof.border")).length === 1) {
            return true;
        }

        return false;
    }

    return { 
        writeWoof, 
        readWoofs,
        renderAllWoofs,
        renderNewWoof,
     };
})();

export default functions;