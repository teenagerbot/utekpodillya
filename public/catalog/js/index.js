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
        document.querySelector(".view").appendChild(card);
    })
})
function CreateCard(content) {
    const card = document.createElement("div");
    card.className = "demo-card-event mdl-card mdl-shadow--2dp";
    card.innerHTML = `<div class="mdl-card__title mdl-card--expand"><h4>
        ${String(content)}
    </h4></div><div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
            Розгорнути
        </a>
        <div class="mdl-layout-spacer"></div>
    </div>
</div>`;
    return card;
}