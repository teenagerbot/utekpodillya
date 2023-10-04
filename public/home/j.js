const IO = io();
IO.emit("test", { username: "john" });
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector("html").classList.remove("body_hide");
    }, 100)
})
// const openMenuButton = document.getElementById('openMenu');
const menu = document.querySelector('.menu');
let startX = 0;
let currentX = 0;
let isSwiping = false;
document.querySelector("#menu-burger").onclick = () => {
    menu.classList.toggle('open');
    document.querySelector("div.app-locker").style.display = "block";
}
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

document.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (diffX > 50) {
        menu.classList.add('open');
        document.querySelector("div.app-locker").style.display = "block";
    } else if (diffX < -50) {
        menu.classList.remove('open');
        setTimeout(() => {
            document.querySelector("div.app-locker").style.display = "none";
        }, 200)
    }
});

document.addEventListener('touchend', () => {
    isSwiping = false;
});



const swiperEl = document.querySelector('swiper-container')

const params = {
    injectStyles: [`
      .swiper-pagination-bullet {
        width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: rgb(0, 0, 0);
  opacity: 1;
  background: rgb(207, 207, 207);
      }
:host {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  z-index: 0;
}
      .swiper-pagination-bullet-active {
        color: #fff;
        background: #ffab43;
      }
      `],
    pagination: {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
}

Object.assign(swiperEl, params)

swiperEl.initialize();