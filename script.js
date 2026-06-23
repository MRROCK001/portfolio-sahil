/* ==========================
   PORTFOLIO SCRIPT
========================== */

// ==========================
// DARK / LIGHT MODE
// ==========================

const themeBtn = document.getElementById("theme-btn");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    if (themeBtn) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

    });
}


// ==========================
// TYPING EFFECT
// ==========================

const typing = document.getElementById("typing");

const roles = [

    "IT Engineer",
    // "IT Engineer",
    // "Windows Administrator",
    // "Network Support Engineer"

];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typing) return;

    const current = roles[roleIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex++);
    } else {

        typing.textContent = current.substring(0, charIndex--);

    }

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === current.length + 1) {

        deleting = true;
        speed = 1500;

    }

    if (deleting && charIndex === 0) {

        deleting = false;
        roleIndex++;

        if (roleIndex >= roles.length) {

            roleIndex = 0;

        }

    }

    setTimeout(typeEffect, speed);

}

typeEffect();


// ==========================
// ACTIVE MENU
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ==========================
// SMOOTH SCROLL
// ==========================

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const id = this.getAttribute("href");

        document.querySelector(id).scrollIntoView({

            behavior: "smooth"

        });

    });

});


// ==========================
// SCROLL TO TOP BUTTON
// ==========================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style, {

    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "#38bdf8",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    display: "none",
    zIndex: "999"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

};


// ==========================
// CONTACT FORM + EMAILJS
// ==========================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert("Please fill all fields.");
            return;
        }

        emailjs.sendForm(
            "service_y7ui1tt",
            "template_ltq5ab7",
            this,
            "RaxFUuEpa4IUul_7m"
        )

        .then(() => {

            alert("✅ Thank you! Your message has been sent.");

            form.reset();

        })

        .catch((error) => {

            console.error(error);

            alert("❌ Failed to send message.");

        });

    });

}

// ==========================
// FADE-IN ON SCROLL
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(
    ".card, .project-card, .timeline-item"
).forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.8s";

    observer.observe(el);

});


// ==========================
// END
// ==========================

console.log("Portfolio Loaded Successfully ✅");


