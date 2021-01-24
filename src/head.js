const head = (() => {
    const head = document.createElement("div"),
          h1 = document.createElement("h1");
    
    head.id = "head";
    head.classList.add("border");
    h1.innerText = "Home";

    head.appendChild(h1);

    return head;
})();

export default head;