document.querySelector("#aboutus").onclick = () => {
    document.querySelector(".about-us").scrollIntoView({
        behavior: "smooth",
        block: "end"
    })
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#aboutus").classList.add("active");
}
document.querySelector("#reference").onclick = () => {
    document.querySelector(".reference-list").scrollIntoView({
        behavior: "smooth",
        block: "end"
    })
    document.querySelector(".active").classList.remove("active");
    document.querySelector("#reference").classList.add("active");
}
document.querySelector("#aboutus-mob").onclick = () => {
    document.querySelector(".about-us").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector("#aboutus-mob").classList.add("active");
    document.querySelector(".app-locker").click();
}
document.querySelector("#reference-mob").onclick = () => {
    document.querySelector(".reference-list").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector("#reference-mob").classList.add("active");
    document.querySelector(".app-locker").click();
}
document.querySelector("#contacts").onclick = () => {
    document.querySelector("footer").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector("#contacts").classList.add("active");
}
document.querySelector("#contacts-mob").onclick = () => {
    document.querySelector("footer").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector("#contacts-mob").classList.add("active");
    document.querySelector(".app-locker").click();
}