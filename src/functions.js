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
        removeWoofs
     };
})();

export default functions;