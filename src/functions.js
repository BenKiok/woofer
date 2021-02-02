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

    const readWoofs = (db, cb) => {
        db.ref("/Woofs/").once("value", 
            (promise) => {
                cb(promise.val());
            });
    }

    const setNextWoof = (obj1, obj2) => {
        if (obj1 && (obj1.nextWoof || obj1.nextWoof === null)) {
            if (obj2 && obj2.id) {
                obj1.nextWoof = obj2.id;

                firebase.database().ref("/Woofs/" + obj1.id).update(obj1);

                return true;
            }
        } else {
            return false;
        }
    }

    function addWoofListeners (element) {
        const more = element.querySelector(".interact"),
              h3 = element.querySelector("h3"),
              h4 = element.querySelector("h4");
        let bool, boolean;

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
                            thisWoof.fav++;
                        } else {
                            thisWoof.fav--;
                        }
    
                        bool = !bool;
                        more.querySelectorAll(".inline")[1].innerText = thisWoof.fav;
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
                        if (!boolean) {
                            thisWoof.rewoof++;
                        } else {
                            thisWoof.rewoof--;
                        }
    
                        boolean = !boolean;
                        more.querySelectorAll(".inline")[2].innerText = thisWoof.rewoof;
                        firebase.database().ref("Woofs/" + thisWoof.id).update(thisWoof);
                    } else {
                        alert("Error, could not find wolf.");
                    }
                });
            });
        }
    }

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
                (i === 0 ? (data[prop].newWoof ? data[prop].newWoof.length : "0") : 
                (i === 1 ? data[prop].fav : 
                (i === 2 ? data[prop].rewoof : ""
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

        addWoofListeners(container);

        timeline.insertBefore(container, timeline.querySelector(".woof.border"));
    }

    function removeWoofs (node, parent) {
        const parentArr = Array.from(parent.childNodes);

        parentArr.forEach((child) => {
            if (child != node) {
                child.remove();
                parentArr.splice(parentArr.indexOf(child), 1);
            }
        });

        if (parentArr.length < 2) {
            return true;
        }

        return false;
    }

    return { 
        writeWoof, 
        readWoofs, 
        setNextWoof, 
        addWoofListeners, 
        renderAllWoofs,
        renderNewWoof,
        createWoofHTML,
        removeWoofs
     };
})();

export default functions;