class CDialog {
    idCDialog = null;
    constructor(){};
    closeCDialog({ srcElement }) {
        srcElement?.closest(".__ddv").remove();
        this.idCDialog = null;
    }
    mkAlert(cId = "___ginput", cText = "alert", onAccept) {
        this.idCDialog = String(cId);
        const CDivAlert = document.createElement("div");
        CDivAlert.id = this.idCDialog;
        CDivAlert.className = "__ddv";
        CDivAlert.innerHTML = /*html*/`<div class="ccontrols">
            <cclose id="cclose">
                <ccls>+</ccls>
            </cclose>
        </div>
        <div class="ccontent">
            <span class="ctext">${String(cText)}</span>
            <span id="caccept">Підтвердити</span>
        </div>`;
        document.body.appendChild(CDivAlert);
        CDivAlert.querySelector("#cclose").onclick = this.closeCDialog;
        CDivAlert.querySelector("#caccept").onclick = (elem) => {
            this.closeCDialog(elem);
            onAccept();
        };
    }
    mkConfirm(cId = "___ginput", cText = "alert", onAccept, onDecline) {
        this.idCDialog = String(cId);
        const CDivConfirm = document.createElement("div");
        CDivConfirm.id = this.idCDialog;
        CDivConfirm.className = "__ddv";
        CDivConfirm.innerHTML = /*html*/`<div class="ccontrols">
            <cclose id="cclose">
                <ccls>+</ccls>
            </cclose>
        </div>
        <div class="ccontent">
            <span class="ctext">${String(cText)}</span>
            <span id="caccept">Підтвердити</span>
            <span id="cdecline">Відмінити</span>
        </div>`;
        document.body.appendChild(CDivConfirm);
        CDivConfirm.querySelector("#cclose").onclick = this.closeCDialog;
        CDivConfirm.querySelector("#caccept").onclick = (elem) => {
            this.closeCDialog(elem);
            onAccept();
        };
        CDivConfirm.querySelector("#cdecline").onclick = (elem) => {
            this.closeCDialog(elem);
            onDecline();
        }
    }
    mkPrompt(cId = "___ginput", cText = "alert", onAccept, onDecline) {
        this.idCDialog = String(cId);
        const CDivPrompt = document.createElement("div");
        CDivPrompt.id = this.idCDialog;
        CDivPrompt.className = "__ddv";
        CDivPrompt.innerHTML = /*html*/`<div class="ccontrols">
            <cclose id="cclose">
                <ccls>+</ccls>
            </cclose>
        </div>
        <div class="ccontent">
            <span class="ctext">${String(cText)}</span>
            <input id="cinput" type="text">
            <span id="caccept">Підтвердити</span>
            <span id="cdecline">Відмінити</span>
        </div>`;
        document.body.appendChild(CDivPrompt);
        CDivPrompt.querySelector("#cclose").onclick = this.closeCDialog;
        CDivPrompt.querySelector("#caccept").onclick = (elem) => {
            this.closeCDialog(elem);
            onAccept(CDivPrompt.querySelector("#cinput").value);
        };
        CDivPrompt.querySelector("#cdecline").onclick = (elem) => {
            this.closeCDialog(elem);
            onDecline();
        }
    }
}