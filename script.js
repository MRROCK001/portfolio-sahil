/* ==========================
   PORTFOLIO SCRIPT
========================== */


/* ==========================
   DARK / LIGHT MODE
========================== */

const themeBtn = document.getElementById("theme-btn");

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    if (themeBtn) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

}


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

}


/* ==========================
   ACTIVE MENU
========================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* ==========================
   SMOOTH SCROLL
========================== */

navLinks.forEach(function (link) {

    link.addEventListener("click", function (e) {

        const id =
            this.getAttribute("href");

        const target =
            document.querySelector(id);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* ==========================
   SCROLL TO TOP
========================== */

const topBtn =
    document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);


window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});


topBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================
   CONTACT FORM + EMAILJS
========================== */

const form =
    document.getElementById("contact-form");


if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const name =
            form.querySelector(
                'input[name="name"]'
            ).value.trim();


        const email =
            form.querySelector(
                'input[name="email"]'
            ).value.trim();


        const message =
            form.querySelector(
                'textarea[name="message"]'
            ).value.trim();


        if (!name || !email || !message) {

            alert("Please fill all fields.");

            return;

        }


        const submitButton =
            form.querySelector("button");

        submitButton.disabled = true;

        submitButton.innerHTML =
            "Sending...";


        emailjs.sendForm(

            "service_y7ui1tt",

            "template_ltq5ab7",

            form,

            "RaxFUuEpa4IUul_7m"

        )

        .then(function () {

            alert(
                "✅ Thank you! Your message has been sent successfully."
            );

            form.reset();

        })

        .catch(function (error) {

            console.error(
                "EmailJS Error:",
                error
            );

            alert(
                "❌ Failed to send message. Please try again."
            );

        })

        .finally(function () {

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';

        });

    });

}


/* ==========================
   FADE-IN ANIMATION
========================== */

const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document.querySelectorAll(

    ".card, .timeline-item, .education-card"

).forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "0.8s ease";

    observer.observe(element);

});


/* ==========================
   PORTFOLIO LOADED
========================== */

console.log(
    "Sahil Kumar Portfolio Loaded Successfully ✅"
);
