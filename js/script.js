/* ========================= typing animation ========================= */
var typedStringsEN = ["Data Scientist", "Data Analyst", "Power BI Developer", "MEAL Officer"];
var typedStringsFR = ["Data Scientist", "Analyste de Données", "Développeur Power BI", "Chargé MEAL"];

var typed = new Typed(".typing", {
    strings: typedStringsEN,
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* ========================= Navigation Hama ========================= */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

/* ========================= Hire Me → Contact ========================= */
document.querySelectorAll(".hire-me[data-section-index]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removeBackSection();
        if (sectionIndex !== null) {
            addBackSection(sectionIndex);
        }
    });
});

/* ========================= Nav Toggler (responsive) ========================= */
const navTogglerBtn = document.querySelector(".nav-toggler"),
      Hama = document.querySelector(".Hama");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    Hama.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

/* ========================= Language Switcher FR / EN ========================= */
let currentLang = "en";
const langToggle = document.getElementById("langToggle");
const langLabel  = document.getElementById("langLabel");

langToggle.addEventListener("click", function () {
    currentLang = currentLang === "en" ? "fr" : "en";
    // ✅ src pour l'image drapeau
    langLabel.src = currentLang === "en" ? "https://flagcdn.com/w40/fr.png" : "https://flagcdn.com/w40/gb.png";
    langLabel.alt = currentLang === "en" ? "FR" : "EN";
    applyLanguage(currentLang);
});

function applyLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(function (el) {
        if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA" && !el.querySelector("[data-en]")) {
            el.textContent = lang === "fr" ? el.getAttribute("data-fr") : el.getAttribute("data-en");
        }
    });
    document.querySelectorAll("[data-placeholder-en]").forEach(function (el) {
        el.placeholder = lang === "fr"
            ? el.getAttribute("data-placeholder-fr")
            : el.getAttribute("data-placeholder-en");
    });
    typed.destroy();
    typed = new Typed(".typing", {
        strings: lang === "fr" ? typedStringsFR : typedStringsEN,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}
/* =======================================================Droit d'auteur ===================================*/
// Copyright année automatique
document.getElementById("year").textContent = new Date().getFullYear();