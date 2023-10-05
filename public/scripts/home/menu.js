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