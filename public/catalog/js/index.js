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
            All[e.target.getAttribute("data-prod")].forEach(prod => {
                const ViewItem = document.createElement("item");
                ViewItem.innerHTML = `<button class="button" detail="${prod.name}">${prod.name}</button><run>></run>`;
                ViewAdapter.appendChild(ViewItem);
            })
            document.querySelector(".view .view-prod .viewrdk").appendChild(ViewAdapter);
            document.querySelector(".view .view-prod").style.height = "100%";
            document.querySelector(".view .view-prods").style.height = "0%";
            document.querySelector(".view .view-prods").style.display = "none";
            document.querySelector(".view .view-prod").style.display = "block";
            if (document.querySelector(".view .view-prod .viewrdk view").innerHTML === "") {
                // Region translate
                document.querySelector(".view .view-prod .viewrdk").innerHTML = `<h2 id="none">Тут поки що нічого нема</h2>`;
                // End translate
            }
            document.querySelector(".viewrdk view").onclick = (ev) => {
                if (ev.target.hasAttributes("detail")) {
                    Server.emit("getFile", ev.target.getAttribute("detail"));
                }
            }
        }
    }
    document.querySelector("#back").onclick = () => {
        document.querySelector(".view .view-prod").style.height = "0%";
        document.querySelector(".view .view-prods").style.height = "100%";
        document.querySelector(".view .view-prods").style.display = "flex";
        document.querySelector(".view .view-prod").style.display = "none";
        document.querySelector(".view .view-prod .viewrdk").innerHTML = "";
    }
})
Server.on("addFileChunk", content => {
    document.querySelector(".view-file .webview").innerHTML += content;
    document.querySelector(".view-file").style.display = "flex";
    document.querySelector(".app-locker").style.opacity = 1;
    document.querySelector(".app-locker").style.pointerEvents = "auto";
})
let tltp = new Tooltip();
Server.on("errorReadProd", () => {
    tltp.error("Нема продуктів", "top", 5, true)
})
document.querySelector("#close").onclick = () => {
    document.querySelector(".view-file").style.display = "none";
    document.querySelector(".view-file .webview").innerHTML = "";
    document.querySelector(".app-locker").style.opacity = 0;
    document.querySelector(".app-locker").style.pointerEvents = "none";
}
function CreateCard(content) {
    const card = document.createElement("div");
    card.className = "demo-card-event mdl-card mdl-shadow--2dp";
    card.innerHTML = `<div class="mdl-card__title mdl-card--expand"><h4>
        ${String(content).replace(/~\-\d.+\-~/gm, "")}
    </h4></div><div class="mdl-card__actions mdl-card--border">
    <button class="button android-button" data-prod="${String(content)}">
            Розгорнути
        </button>
    </div>
</div>`;
    return card;
}