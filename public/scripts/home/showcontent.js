function isElementVisible(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var elementHeight = rect.bottom - rect.top;
    var visibleThreshold = elementHeight * 0.5; // 30% от высоты элемента

    return (
        rect.top >= -visibleThreshold &&
        rect.bottom <= windowHeight + visibleThreshold
    );
}

function isMobile() {
    // Check if the user agent matches a mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return isMobileDevice;
}
if (!isMobile()) {
    document.querySelector(".about-us").classList.add("hidden-desktop");
    document.querySelector(".dovira-div").classList.add("hidden-desktop");
    document.querySelector(".reference-list").classList.add("hidden-desktop");
}
const About = document.querySelector(".about-us");
const Dovira = document.querySelector(".dovira-div");
const ReferenceList = document.querySelector(".reference-list");
window.onscroll =() => {
    if (isElementVisible(About)) {
        if (!isMobile()) {
            About.classList.remove("hidden-desktop");
        }
    } else {
        if (!isMobile()) {
            About.classList.add("hidden-desktop");
        }
    }
    if (isElementVisible(Dovira)) {
        if (!isMobile()) {
            Dovira.classList.remove("hidden-desktop");
        }
    } else {
        if (!isMobile()) {
            Dovira.classList.add("hidden-desktop");
        }
    }
    if (isElementVisible(ReferenceList)) {
        if (!isMobile()) {
            ReferenceList.classList.remove("hidden-desktop");
        }
    } else {
        if (!isMobile()) {
            ReferenceList.classList.add("hidden-desktop");
        }
    }
}