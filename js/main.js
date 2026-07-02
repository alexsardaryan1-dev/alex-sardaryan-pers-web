// SCROLL UP BTN

const scrollUpBtn = document.querySelector(".scrollup-btn");

let isMoving = false;

window.addEventListener("scroll", () => {
    if (!isMoving) {
        requestAnimationFrame(() => {
            scrollUpBtn.classList.toggle("active", window.scrollY > 300);
            isMoving = false;
        })

        isMoving = true;
    }
});

window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
        scrollUpBtn.classList.toggle("active", window.scrollY > 300);
    });
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

menuBurger.addEventListener("click", (e) => {
    e.stopPropagation();

    menuBurger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuBurger.classList.remove("active");
        mobileMenu.classList.remove("active");
    });
});

mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    const isBurger = menuBurger.contains(e.target);
    const isInsideMenu = mobileMenu.contains(e.target);

    if (!isBurger && !isInsideMenu) {
        menuBurger.classList.remove("active");
        mobileMenu.classList.remove("active");
    }
});

// SECTION-INDICATORS

const sections = document.querySelectorAll("section");
const indicators = document.querySelectorAll(".dot");

const guard = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            indicators.forEach(indicator => indicator.classList.remove("active"));
            const paragraphId = entry.target.id;
            const activeIndicator = document.querySelector(
                `.dot[data-target="${paragraphId}"]`
            );

            if (activeIndicator) activeIndicator.classList.add("active");
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => guard.observe(section));

indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
        const paragraphId = indicator.dataset.target;
        document.getElementById(paragraphId)
            .scrollIntoView({ behavior: "smooth" });
    });
});

// CURSOR CUSTOMISATION:

const dots = [];
const dotsNumber = 10;

for (let i = 0; i < dotsNumber; i++) {
  const dot = document.createElement("div");
  dot.className = "cursor-tale";
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

// MODE-CHANGE

const modeChangeBtn = document.querySelector(".mode-change");
const modeChangeIcon = document.querySelector(".mode-change i");

if (localStorage.getItem("mode") === "light") {
    document.body.classList.add("light-mode");
    modeChangeIcon.classList.remove("fa-sun");
    modeChangeIcon.classList.add("fa-moon");
};

modeChangeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        modeChangeIcon.classList.remove("fa-sun");
        modeChangeIcon.classList.add("fa-moon");
        localStorage.setItem("mode", "light");
    } else {
        modeChangeIcon.classList.remove("fa-moon");
        modeChangeIcon.classList.add("fa-sun");
        localStorage.setItem("mode", "dark");
    }
});


