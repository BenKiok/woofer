(()=>{"use strict";const e=e=>{let t;return!("object"!=typeof e||!e||(e.time=(new Date).getTime(),t=firebase.database().ref("/Woofs/").push(e).key,e.id=t,firebase.database().ref("/Woofs/"+t).update(e),0))},t=(e,t)=>{e.ref("/Woofs/").once("value",(e=>{t(e.val())}))},n=(()=>{const e=document.createElement("div"),t=document.createElement("span");for(let t=0;t<9;t++)e.appendChild(document.createElement("span"));return t.classList.add("avatar"),e.id="menu",e.appendChild(t),e})(),a=(()=>{const e=document.createElement("div"),t=document.createElement("h1");return e.id="head",e.classList.add("border"),t.innerText="Home",e.appendChild(t),e})(),d=(()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div"),a=document.createElement("span"),d=document.createElement("div"),o=document.createElement("input"),s=document.createElement("div"),c=document.createElement("button"),i=document.createElement("div");e.id="timeline",t.id="main",t.classList.add("border"),n.classList.add("woof"),a.classList.add("avatar"),d.classList.add("content"),o.type="text",o.placeholder="What's happening?",o.classList.add("text"),o.id="input",s.classList.add("more"),c.innerText="Woof",c.classList.add("click"),i.classList.add("break");for(let e=0;e<5;e++)s.appendChild(document.createElement("span"));return s.appendChild(c),d.append(o,s),n.append(a,d),t.append(n,i),e.appendChild(t),e})();(()=>{const o=document.querySelector("#app");function s(e){let t,n=[];for(const t in e)n.push(e[t]);t=n.length-1,c(n,t)}function c(e,t){const n=document.createElement("div"),a=document.createElement("span"),o=document.createElement("div"),s=document.createElement("div"),c=document.createElement("h4"),i=document.createElement("h3"),r=document.createElement("div");let l,f;n.classList.add("woof","border"),a.classList.add("avatar"),o.classList.add("content"),s.classList.add("text"),r.classList.add("interact");for(let e=0;e<4;e++)r.appendChild(document.createElement("span")),r.childNodes[e].classList.add("click");r.childNodes[0].innerText=e[t].fav,r.childNodes[1].innerText=e[t].rewoof,r.childNodes[2].innerText="^",r.childNodes[3].innerText="^",c.innerText=`${new Date(e[t].time)}`.slice(4,15),i.innerText=e[t].text,r.childNodes[0].addEventListener("click",(()=>{firebase.database().ref("Woofs/").once("value",(e=>{const t=e.val();let n;for(const e in t)if(`${new Date(t[e].time)}`.slice(4,15)==c.innerText&&t[e].text==i.innerText){n=t[e];break}n?(l?n.fav--:n.fav++,l=!l,r.childNodes[0].innerText=n.fav,firebase.database().ref("Woofs/"+n.id).update(n)):alert("Error, could not find wolf.")}))})),r.childNodes[1].addEventListener("click",(()=>{firebase.database().ref("Woofs/").once("value",(e=>{const t=e.val();let n;for(const e in t)if(`${new Date(t[e].time)}`.slice(4,15)==c.innerText&&t[e].text==i.innerText){n=t[e];break}n?(f?n.rewoof--:n.rewoof++,f=!f,r.childNodes[1].innerText=n.rewoof,firebase.database().ref("Woofs/"+n.id).update(n)):alert("Error, could not find wolf.")}))})),s.append(c,i),o.append(s,r),n.append(a,o),d.insertBefore(n,d.querySelector(".woof.border"))}t(firebase.database(),(function(e){for(const t in e)c(e,t)})),window.addEventListener("resize",(()=>{n.style.left=d.offsetLeft-72+"px"})),d.querySelector("button").addEventListener("click",(()=>{const n=d.querySelector("#input");if(n.value.length>0){const a={text:n.value,fav:0,rewoof:0};e(a)?(n.value="",t(firebase.database(),s)):alert("Unable to send woof. Try again in a few seconds.")}})),d.insertBefore(a,d.querySelector("#main")),o.append(n,d),n.style.left=d.offsetLeft-72+"px"})()})();