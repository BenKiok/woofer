(()=>{"use strict";const e=(()=>{const e=document.createElement("div"),t=document.createElement("div");for(let e=0;e<10;e++)t.appendChild(document.createElement("span"));return t.childNodes[9].classList.add("avatar"),e.id="menu",e.appendChild(t),e})(),t=(()=>{const e=document.createElement("div"),t=document.createElement("div"),d=document.createElement("h1"),n=document.createElement("div"),a=document.createElement("div"),c=document.createElement("span"),i=document.createElement("div"),m=document.createElement("input"),l=document.createElement("div"),o=document.createElement("button"),p=document.createElement("div");e.id="timeline",t.id="head",d.innerText="Home",n.id="main",a.classList.add("woof"),c.classList.add("avatar"),i.classList.add("content"),m.type="text",m.placeholder="What's happening?",m.classList.add("text"),m.id="input",l.classList.add("more"),o.innerText="Woof",p.classList.add("break");for(let e=0;e<5;e++)l.appendChild(document.createElement("span"));return l.appendChild(o),i.append(m,l),a.append(c,i),n.append(a,p),t.appendChild(d),e.append(t,n),e})();document.querySelector("#app").append(e,t)})();