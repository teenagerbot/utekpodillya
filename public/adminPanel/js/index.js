// const editor = SUNEDITOR.create((document.getElementById('sample') || 'sample'),{
//     "textTags": {
// 		"bold": "b",
// 		"underline": "u",
// 		"italic": "i",
// 		"strike": "s"
// 	},
// 	"mode": "classic",
// 	"rtl": false,
// 	"katex": "window.katex",
// 	"resizingBarContainer": "#custom_bottombar",
// 	"charCounter": true,
// 	"imageGalleryUrl": "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
// 	"videoFileInput": false,
// 	"audioFileInput": true,
// 	"tabDisable": false,
// 	"placeholder": "Напишіть опис",
// 	"buttonList": [
// 		[
// 			"undo",
// 			"redo",
// 			"font",
// 			"fontSize",
// 			"formatBlock",
// 			"paragraphStyle",
// 			"blockquote",
// 			"bold",
// 			"underline",
// 			"italic",
// 			"strike",
// 			"subscript",
// 			"superscript",
// 			"fontColor",
// 			"hiliteColor",
// 			"textStyle",
// 			"removeFormat",
// 			"outdent",
// 			"indent",
// 			"align",
// 			"horizontalRule",
// 			"list",
// 			"lineHeight",
// 			"table",
// 			"link",
// 			"image",
// 			"video",
// 			"audio",
// 			"math",
// 			"imageGallery",
// 			"fullScreen",
// 			"showBlocks",
// 			"codeView",
// 			"preview",
// 			"print"
// 		]
// 	],
// 	"lang": SUNEDITOR_LANG.ua,
// 	"lang(In nodejs)": "ua"
// });
const ServerConnector = io();
ServerConnector.emit("checkAccount");
ServerConnector.on("isadmin", data => {
    setTimeout(() => {
        if (data === "false") {
            document.querySelector(".word").remove();
            document.querySelector(".overlay").innerHTML = `<access>Access denied <linka>Увійти в панель</linka></access>`;
            document.querySelector("linka").onclick = () => {
                location.replace('/login')
            }
        } else {
            document.querySelector("div.stop").remove();
            document.querySelector(".webcontent").classList.remove("hide");
            document.body.onclick = function (e) {
                if (e.target.className !== "newitem" && !e.target.classList.contains("subitem")) {
                    document.querySelectorAll(".items").forEach(elem => {
                        elem.classList.remove("show");
                    })
                } else if (e.target.className === "newitem") {
                    document.querySelector(".items.show")?.classList.toggle("show");
                    e.target.querySelector(".items").classList.toggle("show");
                } else if (e.target.classList.contains("subitem")) {
                    const event = (e.target.parentNode.parentNode.id + e.target.getAttribute("itemname"));
                    switch (event) {
                        case "addcat":
                            createCategory();
                            break;
                        case "addprod":
                            createProduction();
                            break;
                        case "deletecat":
                            removeCategory();
                            break;
                        case "deleteprod":
                            removeProduction();
                            break;
                        default:
                            break;
                    }
                    document.querySelectorAll(".items").forEach(elem => {
                        elem.classList.remove("show");
                    })
                }
            }
        }
    }, 2000)
});

function createProduction() {
    alert(1)
};

function createCategory() {
    ServerConnector.emit("requestCategories");
};

function removeProduction() {
};

function removeCategory() {
    alert(2)
};
ServerConnector.on("getCategories", data => {
    const categories = data;
    console.log(categories)
    Dialog.prompt("Введіть назву нової категорії", "Категорія: ", (value) => {
        let valueInput = (value.values[0].value);
        if (typeof valueInput === "string" && valueInput.trim().length > 1) {
            if (!categories.includes("~-2345-~"+valueInput)) {
                categories.push("~-2345-~"+valueInput);
                ServerConnector.emit("update", {
                    type: "category",
                    value: categories
                })
            } else {
                Dialog.alert("Помилка", "Така категорія вже існує");
            }
        }
    })
})
ServerConnector.on("Saved", () => {
    setTimeout(() => {
        Dialog.alert("Успішно", "Додано");
    }, 1000)
})
function Ticker(elem) {
    elem.lettering();
    this.done = false;
    this.cycleCount = 5;
    this.cycleCurrent = 0;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
    this.charsCount = this.chars.length;
    this.letters = elem.find('span');
    this.letterCount = this.letters.length;
    this.letterCurrent = 0;

    this.letters.each(function () {
        var $this = $(this);
        $this.attr('data-orig', $this.text());
        $this.text('-');
    });
}

Ticker.prototype.getChar = function () {
    return this.chars[Math.floor(Math.random() * this.charsCount)];
};

Ticker.prototype.reset = function () {
    this.done = false;
    this.cycleCurrent = 0;
    this.letterCurrent = 0;
    this.letters.each(function () {
        var $this = $(this);
        $this.text($this.attr('data-orig'));
        $this.removeClass('done');
    });
    this.loop();
};

Ticker.prototype.loop = function () {
    var self = this;

    this.letters.each(function (index, elem) {
        var $elem = $(elem);
        if (index >= self.letterCurrent) {
            if ($elem.text() !== ' ') {
                $elem.text(self.getChar());
                $elem.css('opacity', Math.random());
            }
        }
    });

    if (this.cycleCurrent < this.cycleCount) {
        this.cycleCurrent++;
    } else if (this.letterCurrent < this.letterCount) {
        var currLetter = this.letters.eq(this.letterCurrent);
        this.cycleCurrent = 0;
        currLetter.text(currLetter.attr('data-orig')).css('opacity', 1).addClass('done');
        this.letterCurrent++;
    } else {
        this.done = true;
    }

    if (!this.done) {
        requestAnimationFrame(function () {
            self.loop();
        });
    } else {
        setTimeout(function () {
            self.reset();
        }, 750);
    }
};

$words = $('.word');

$words.each(function () {
    var $this = $(this),
        ticker = new Ticker($this).reset();
    $this.data('ticker', ticker);
});
document.querySelector("#save").onclick = () => {
    ServerConnector.emit("storeFile", editor.getContents());
}