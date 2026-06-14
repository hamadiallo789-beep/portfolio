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
    langLabel.textContent = currentLang === "en" ? "🇫🇷" : "🇬🇧";
    document.documentElement.lang = currentLang;
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
(function () {
    var creationYear = 2025;
    var currentYear = new Date().getFullYear();
    document.getElementById("year").textContent =
        currentYear > creationYear ? creationYear + " – " + currentYear : creationYear;
})();

/* ========================= Animation barres de compétences ========================= */
function animateSkills() {
    document.querySelectorAll(".progress-in[data-width]").forEach(function (bar) {
        var target = bar.getAttribute("data-width") + "%";
        bar.style.transition = "width 1.2s ease-in-out";
        bar.style.width = target;
    });
}
function resetSkills() {
    document.querySelectorAll(".progress-in[data-width]").forEach(function (bar) {
        bar.style.transition = "none";
        bar.style.width = "0%";
    });
}

// Observer les clics nav pour déclencher l'animation
navList.forEach(function (li) {
    li.querySelector("a").addEventListener("click", function () {
        var target = this.getAttribute("href").split("#")[1];
        if (target === "about") {
            resetSkills();
            setTimeout(animateSkills, 400);
        }
    });
});

/* ========================= Âge dynamique ========================= */
(function () {
    var birth = new Date(1997, 3, 3); // 03 Avril 1997 (mois 0-indexé)
    var today = new Date();
    var age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }
    document.getElementById("age").textContent = age;
})();

/* ========================= Feedback formulaire ========================= */
(function () {
    var form = document.querySelector(".contact-form form");
    var feedback = document.getElementById("form-feedback");
    if (!form || !feedback) return;
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        fetch(form.action, {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        }).then(function (res) {
            if (res.ok) {
                feedback.textContent = currentLang === "fr"
                    ? "✅ Message envoyé avec succès ! Je vous répondrai très bientôt."
                    : "✅ Message sent successfully! I will get back to you very soon.";
                feedback.style.display = "block";
                feedback.style.background = "#d4edda";
                feedback.style.color = "#155724";
                form.reset();
            } else {
                throw new Error("Erreur serveur");
            }
        }).catch(function () {
            feedback.textContent = currentLang === "fr"
                ? "❌ Une erreur est survenue. Veuillez réessayer ou m'écrire directement à hamadiallo789@gmail.com"
                : "❌ An error occurred. Please try again or contact me directly at hamadiallo789@gmail.com";
            feedback.style.display = "block";
            feedback.style.background = "#f8d7da";
            feedback.style.color = "#721c24";
        });
    });
})();