(()=>{"use strict";const e=(()=>{const e=(e,t)=>{e.ref("/Woofs/").once("value",(e=>{t(e.val())}))};function t(e){const t=e.querySelector(".interact");if(e.querySelector("h3"),e.querySelector("h4"),t){let e;t.childNodes[0].addEventListener("click",(()=>{const r=t.parentNode.parentNode;let n=Array.from(r.parentNode.querySelectorAll(".woof.border:not(#reply)")).indexOf(r);document.querySelector("#reply")&&document.querySelector("#reply").remove(),e===n?e=null:(r.parentNode.insertBefore((()=>{const e=document.createElement("div"),t=document.createElement("span"),r=document.createElement("div"),o=document.createElement("input"),n=document.createElement("div"),a=document.createElement("button");e.id="reply",e.classList.add("woof","border"),t.classList.add("avatar"),r.classList.add("content"),o.type="text",o.placeholder="Type your response...",o.classList.add("text"),o.id="input",n.classList.add("more"),a.innerText="Woof",a.classList.add("click");for(let e=0;e<5;e++){const t=document.createElement("i");t.classList.add("click","fas",0==e?"fa-camera":1==e?"fa-image":2==e?"fa-chart-bar":3==e?"fa-smile":4==e?"fa-calendar-alt":""),n.appendChild(t)}return n.appendChild(a),r.append(o,n),e.append(t,r),e})(),Array.from(r.parentNode.querySelectorAll(".woof.border"))[n+1]),e=n,document.querySelector("#reply button").addEventListener("click",(()=>{firebase.database().ref("Woofs/").once("value",(e=>{const t=e.val(),n=r.querySelector("h4"),a=r.querySelector("h3");let l;for(const e in t)if(`${new Date(t[e].time)}`.slice(4,15)==n.innerText&&t[e].text==a.innerText){l=t[e];break}const c={text:document.querySelector("#reply input").value,rewoof:0,fav:0};((e,t,r)=>{let o=e.id;return!("object"!=typeof e||!e||"object"!=typeof t||!t||(t.time=(new Date).getTime(),e.nextWoof?(e.nextWoof.push(t),"focus"===r.id&&console.log("Appending reply...")):e.nextWoof=[t],r.querySelector("span .inline")&&(r.querySelector("span .inline").innerText=e.nextWoof.length),firebase.database().ref("/Woofs/"+o).update(e),0))})(l,c,r)?(document.querySelector("#reply").remove(),l.nextWoof.push(c),o(l.nextWoof,l.nextWoof.indexOf(c),!0)):console.log("Error, could not append reply.")}))})))}))}}function r(e,t=!1){for(const r in e)o(e,r,t)}function o(o,n,a){const l=document.createElement("div"),c=document.createElement("span"),d=document.createElement("div"),i=document.createElement("div"),s=document.createElement("h4"),f=document.createElement("h3"),u=document.createElement("div");l.classList.add("woof","border"),c.classList.add("avatar"),d.classList.add("content"),i.classList.add("text"),u.classList.add("interact");for(let e=0;e<4;e++){const t=document.createElement("span"),r=document.createElement("i"),a=document.createElement("p");r.classList.add("click","fas",0===e?"fa-reply":1===e?"fa-retweet":2===e?"fa-heart":3===e?"fa-share-square":""),a.innerText=0===e?o[n].nextWoof?o[n].nextWoof.length:"0":1===e?o[n].rewoof:2===e?o[n].fav:"",a.classList.add("inline"),t.append(r,a),u.appendChild(t)}var m;s.innerText=`${new Date(o[n].time)}`.slice(4,15),f.innerText=o[n].text,i.append(s,f),d.append(i,u),l.append(c,d),a?timeline.appendChild(l):(t(l),function(e){const t=e.querySelector(".interact"),r=e.querySelector("h3"),o=e.querySelector("h4");let n;t&&t.childNodes[1].addEventListener("click",(()=>{firebase.database().ref("Woofs/").once("value",(e=>{const a=e.val();let l;for(const e in a)if(`${new Date(a[e].time)}`.slice(4,15)==o.innerText&&a[e].text==r.innerText){l=a[e];break}l?(n?(l.rewoof--,t.querySelectorAll("i")[1].classList.remove("rewoof")):(l.rewoof++,t.querySelectorAll("i")[1].classList.add("rewoof")),n=!n,t.parentNode.parentNode.id?t.parentNode.querySelectorAll(".inline")[0].innerText=l.rewoof+" Rewoof"+(1===l.rewoof?"":"s"):t.querySelectorAll(".inline")[1].innerText=l.rewoof,firebase.database().ref("Woofs/"+l.id).update(l)):alert("Error, could not find wolf.")}))}))}(l),function(e){const t=e.querySelector(".interact"),r=e.querySelector("h3"),o=e.querySelector("h4");let n;t&&t.childNodes[2].addEventListener("click",(()=>{firebase.database().ref("Woofs/").once("value",(e=>{const a=e.val();let l;for(const e in a)if(`${new Date(a[e].time)}`.slice(4,15)==o.innerText&&a[e].text==r.innerText){l=a[e];break}l?(n?(l.fav--,t.querySelectorAll("i")[2].classList.remove("fav")):(l.fav++,t.querySelectorAll("i")[2].classList.add("fav")),n=!n,t.parentNode.parentNode.id?t.parentNode.querySelectorAll(".inline")[1].innerText=l.fav+" Like"+(1===l.fav?"":"s"):t.querySelectorAll(".inline")[2].innerText=l.fav,firebase.database().ref("Woofs/"+l.id).update(l)):alert("Error, could not find wolf.")}))}))}(l),(m=l).querySelector(".text").addEventListener("click",(()=>{if(function(e,t){const r={...t.querySelectorAll(".woof.border")};for(const t in r)r[t]!==e&&r[t].remove();Array.from(t.querySelectorAll(".woof.border")).length}(m,m.parentNode),m.id="focus",m.parentNode.querySelector(".woofbox").classList.add("vanish"),m.parentNode.querySelector(".woofbox").classList.remove("woof"),m.parentNode.querySelector(".break").classList.add("vanish"),!m.parentNode.querySelector("#head i")){const t=document.createElement("i");t.classList.add("fas","fa-arrow-left"),t.addEventListener("click",(()=>{m.parentNode.querySelector(".woofbox").classList.remove("vanish"),m.parentNode.querySelector(".woofbox").classList.add("woof"),m.parentNode.querySelector(".break").classList.remove("vanish"),m.parentNode.querySelector("h1").innerText="Home",t.remove(),m.remove(),e(firebase.database(),r)})),m.parentNode.querySelector("#head").insertBefore(t,m.parentNode.querySelector("h1"))}m.parentNode.querySelector("h1").innerText="Woof";let t=m.querySelector("h4");m.querySelector("h4").remove(),m.querySelector(".content").insertBefore(t,m.querySelector(".interact")),t=m.querySelectorAll(".inline");const o=document.createElement("div");o.classList.add("stats"),Array.from(t).forEach((e=>{let r=Array.from(t).indexOf(e);if(1===r||2===r){let t=e.cloneNode(!0);t.innerText+=(1===r?" Rewoof":2===r?" Like":"")+(1!==Number(t.innerText)?"s":""),o.appendChild(t)}e.remove()})),m.querySelector(".content").insertBefore(o,m.querySelector(".interact")),e(firebase.database(),(e=>{const t=m.querySelector("h3"),o=m.querySelector("h4");let n;for(const r in e)if(`${new Date(e[r].time)}`.slice(4,15)==o.innerText&&e[r].text==t.innerText){n=e[r];break}n.nextWoof&&r(n.nextWoof,!0)}))})),timeline.insertBefore(l,timeline.querySelector(".woof.border")))}return{writeWoof:e=>{let t;return!("object"!=typeof e||!e||(e.time=(new Date).getTime(),t=firebase.database().ref("/Woofs/").push(e).key,e.id=t,firebase.database().ref("/Woofs/"+t).update(e),0))},readWoofs:e,renderAllWoofs:r,renderNewWoof:function(e){let t,r=[];for(const t in e)r.push(e[t]);t=r.length-1,o(r,t)}}})(),t=(()=>{const e=document.createElement("div"),t=document.createElement("span");for(let t=0;t<9;t++){const r=document.createElement("i");r.classList.add("click","fas",0===t?"fa-dog":1===t?"fa-home":2===t?"fa-search":3===t?"fa-bell":4===t?"fa-envelope":5===t?"fa-bookmark":6===t?"fa-file-alt":7===t?"fa-user":8===t?"fa-ellipsis-h":""),e.appendChild(r)}return t.classList.add("avatar"),e.id="menu",e.appendChild(t),e})(),r=(()=>{const e=document.createElement("div"),t=document.createElement("h1");return e.id="head",e.classList.add("border"),t.innerText="Home",e.appendChild(t),e})(),o=(()=>{const e=document.createElement("div"),t=document.createElement("div"),r=document.createElement("div"),o=document.createElement("span"),n=document.createElement("div"),a=document.createElement("input"),l=document.createElement("div"),c=document.createElement("button"),d=document.createElement("div");e.id="timeline",t.id="main",t.classList.add("border"),r.classList.add("woof","woofbox"),o.classList.add("avatar"),n.classList.add("content"),a.type="text",a.placeholder="What's happening?",a.classList.add("text"),a.id="input",l.classList.add("more"),c.innerText="Woof",c.classList.add("click"),d.classList.add("break");for(let e=0;e<5;e++){const t=document.createElement("i");t.classList.add("click","fas",0==e?"fa-camera":1==e?"fa-image":2==e?"fa-chart-bar":3==e?"fa-smile":4==e?"fa-calendar-alt":""),l.appendChild(t)}return l.appendChild(c),n.append(a,l),r.append(o,n),t.append(r,d),e.appendChild(t),e})();(()=>{const n=document.querySelector("#app");e.readWoofs(firebase.database(),e.renderAllWoofs),window.addEventListener("resize",(()=>{t.style.left=o.offsetLeft-72+"px"})),t.querySelector(".fa-home").addEventListener("click",(()=>{window.location.reload()})),r.querySelector("h1").addEventListener("click",(()=>{window.scrollTo(0,0)})),o.querySelector("button").addEventListener("click",(()=>{const t=o.querySelector("#input");if(t.value.length>0){const r={text:t.value,fav:0,rewoof:0};e.writeWoof(r)?(t.value="",e.readWoofs(firebase.database(),e.renderNewWoof)):alert("Unable to send woof. Try again in a few seconds.")}})),o.insertBefore(r,o.querySelector("#main")),n.append(t,o),t.style.left=o.offsetLeft-72+"px"})()})();