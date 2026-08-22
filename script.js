/* ==========================
   SAHIL KUMAR PORTFOLIO
========================== */

/* THEME */
const themeBtn = document.getElementById("theme-btn");

function updateThemeIcon() {
    if (!themeBtn) return;
    const light = document.body.classList.contains("light");
    themeBtn.innerHTML = light
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
updateThemeIcon();

themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );
    updateThemeIcon();
});


/* MOBILE MENU */
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });
});


/* ACTIVE NAV */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 160;
        if (window.scrollY >= top) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
});


/* SCROLL TO TOP */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (!topBtn) return;
    topBtn.style.display = window.scrollY > 450 ? "grid" : "none";
});

topBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* REVEAL ANIMATION */
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
});


/* EMAILJS CONTACT FORM */
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = form.querySelector("button");
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill all fields.";
        return;
    }

    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    formStatus.textContent = "";

    try {
        await emailjs.sendForm(
            "service_y7ui1tt",
            "template_ltq5ab7",
            form
        );

        formStatus.textContent = "Message sent successfully.";
        formStatus.style.color = "#22c55e";
        form.reset();
    } catch (error) {
        console.error("EmailJS Error:", error);
        formStatus.textContent = "Message could not be sent. Please try again.";
        formStatus.style.color = "#f87171";
    } finally {
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }
});

console.log("Sahil Kumar Portfolio Loaded Successfully.");
