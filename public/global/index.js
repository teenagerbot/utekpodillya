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
        document.querySelector(".app-locker").style.opacity = 1;
        document.querySelector(".app-locker").style.pointerEvents = "auto";
    } else if (diffX < -50) {
        menu.classList.remove('open');
        setTimeout(() => {
            document.querySelector("div.app-locker").style.display = "none";
            document.querySelector(".app-locker").style.opacity = 0;
            document.querySelector(".app-locker").style.pointerEvents = "none";
        }, 200)
    }
});

document.addEventListener('touchend', () => {
    isSwiping = false;
});
document.querySelector("div.app-locker").onclick = () => {
    menu.classList.toggle('open');
    document.querySelector("div.app-locker").style.display = "none";
    document.querySelector(".app-locker").style.opacity = 0;
    document.querySelector(".app-locker").style.pointerEvents = "none";
}
window.onscroll =() => {
    scrollFunction()
}