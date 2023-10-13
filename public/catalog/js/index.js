const Server = io();
Server.emit("getProducts");
Server.on("products", (products) => {
    const All = JSON.parse(products);
    setTimeout(() => {
        document.querySelector(".app-locker").style.opacity = 0;
        document.querySelector(".app-locker").style.pointerEvents = "none";
        document.querySelector("div.loader").style.opacity = 0;
        document.querySelector("div.loader").style.pointerEvents = "none";
    }, 2000)
    All.categories.forEach(cat => {
        const card = CreateCard(cat);
        document.querySelector(".view .view-prods").appendChild(card);
    })
    document.querySelector("div.view-prods").onclick = (e) => {
        if (e.target.hasAttributes("data-prod")) {
            const ViewAdapter = document.createElement("view");
            console.log(All,  e.target.getAttribute("data-prod"))
            All[e.target.getAttribute("data-prod")].forEach(prod => {
                const ViewItem = document.createElement("item");
                ViewItem.innerHTML = `<div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
            ${prod.name}
        </a>
        <div class="mdl-layout-spacer"></div>
    </div>`;
                ViewAdapter.appendChild(ViewItem);
            })
            document.querySelector(".view .view-prod").appendChild(ViewAdapter);
            document.querySelector(".view .view-prod").style.height = "100%";
            document.querySelector(".view .view-prods").style.height = "0%";
            document.querySelector(".view .view-prods").style.display = "none";
        }
    }
})
function CreateCard(content) {
    const card = document.createElement("div");
    card.className = "demo-card-event mdl-card mdl-shadow--2dp";
    card.innerHTML = `<div class="mdl-card__title mdl-card--expand"><h4>
        ${String(content).replace(/~\|\d.+\|~/gm, "")}
    </h4></div><div class="mdl-card__actions mdl-card--border">
    <button class="button android-button" data-prod="${String(content)}">
            Розгорнути
        </button>
    </div>
</div>`;
    return card;
}