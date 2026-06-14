/* ========================= toggle style switcher ========================= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})
/* ========================= theme colors ========================= */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
    localStorage.setItem("portfolioColor", color);
}

/* ========================= theme light and dark mode ========================= */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    localStorage.setItem("portfolioDark", document.body.classList.contains("dark"));
});

/* ========================= Restore preferences on load ========================= */
window.addEventListener("load", () => {
    // Couleur sauvegardée
    const savedColor = localStorage.getItem("portfolioColor");
    if (savedColor) {
        setActiveStyle(savedColor);
    }
    // Mode sombre sauvegardé
    const savedDark = localStorage.getItem("portfolioDark");
    if (savedDark === "true") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
});