// SCROLL UP BTN

const scrollUpBtn = document.querySelector(".scrollup-btn");

let isMoving = false;

function updateScrollUpBtn() {
    const shouldShow = window.scrollY > 300;
    scrollUpBtn.classList.toggle("active", shouldShow);
    scrollUpBtn.tabIndex = shouldShow ? 0 : -1;
}

window.addEventListener("scroll", () => {
    if (!isMoving) {
        requestAnimationFrame(() => {
            updateScrollUpBtn();
            isMoving = false;
        });

        isMoving = true;
    }
});

scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// MENU BURGER

const menuBurger = document.querySelector(".menu-burger");
const mobileMenu = document.querySelector(".mobile-menuBurger");

function closeMobileMenu({ returnFocus = false } = {}) {
    menuBurger.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuBurger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (returnFocus) menuBurger.focus();
}

function openMobileMenu() {
    menuBurger.classList.add("active");
    mobileMenu.classList.add("active");
    menuBurger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
}

menuBurger.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = mobileMenu.classList.contains("active");
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    const isBurger = menuBurger.contains(e.target);
    const isInsideMenu = mobileMenu.contains(e.target);

    if (!isBurger && !isInsideMenu) {
        closeMobileMenu();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        closeMobileMenu({ returnFocus: true });
    }
});

// SECTION-INDICATORS

const sections = document.querySelectorAll("section");
const indicators = document.querySelectorAll(".dot");

const guard = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            indicators.forEach(indicator => {
                indicator.classList.remove("active");
                indicator.removeAttribute("aria-current");
            });

            const sectionId = entry.target.id;
            const activeIndicator = document.querySelector(
                `.dot[data-target="${sectionId}"]`
            );

            if (activeIndicator) {
                activeIndicator.classList.add("active");
                activeIndicator.setAttribute("aria-current", "true");
            }
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => guard.observe(section));

indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        const sectionId = indicator.dataset.target;
        document.getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
    });
});

// CURSOR CUSTOMISATION

const supportsHover = window.matchMedia("(pointer: fine)").matches;

if (supportsHover) {
    document.body.classList.add("js-cursor-ready");

    const cursorDot = document.querySelector(".cursor");
    const dots = [];
    const dotsNumber = 10;

    for (let i = 0; i < dotsNumber; i++) {
        const dot = document.createElement("div");
        dot.className = "cursor-tale";
        dot.setAttribute("aria-hidden", "true");
        document.body.appendChild(dot);
        dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function showCursor() {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        let x = mouseX;
        let y = mouseY;

        dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;

            dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${1 - index * 0.05})`;

            x = dot.x;
            y = dot.y;
        });

        requestAnimationFrame(showCursor);
    }

    showCursor();
}

// MODE-CHANGE

const modeChangeBtn = document.querySelector(".mode-change");
const modeChangeIcon = document.querySelector(".mode-change i");

function getSavedMode() {
    try {
        return localStorage.getItem("mode");
    } catch {
        return null;
    }
}

function saveMode(mode) {
    try {
        localStorage.setItem("mode", mode);
    } catch {
    }
}

if (getSavedMode() === "light") {
    document.body.classList.add("light-mode");
    modeChangeIcon.classList.remove("fa-sun");
    modeChangeIcon.classList.add("fa-moon");
    modeChangeBtn.setAttribute("aria-pressed", "true");
}

modeChangeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        modeChangeIcon.classList.remove("fa-sun");
        modeChangeIcon.classList.add("fa-moon");
        modeChangeBtn.setAttribute("aria-pressed", "true");
        saveMode("light");
    } else {
        modeChangeIcon.classList.remove("fa-moon");
        modeChangeIcon.classList.add("fa-sun");
        modeChangeBtn.setAttribute("aria-pressed", "false");
        saveMode("dark");
    }
});