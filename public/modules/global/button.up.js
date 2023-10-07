// Get the button:
let mybutton = document.querySelector(".up-btn");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.opacity = 1;
        mybutton.style.pointerEvents = "auto";
    } else {
        mybutton.style.opacity = 0;
        mybutton.style.pointerEvents = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    const startingY = window.pageYOffset;
    const targetY = 0;
    const distance = targetY - startingY;
    const duration = 1000;
    let startTime = null;
    function animate(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scrollTo(0, startingY + distance * easeInOut(progress));
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

mybutton.onclick = () => {
    topFunction();
};