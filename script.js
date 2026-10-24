
/* Contact form validation */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();
        const status = document.getElementById("form-status");

        if (!name || !email || !message) {
            status.textContent = "Please complete all fields.";
            return;
        }

        if (!contactForm.checkValidity()) {
            status.textContent = "Please enter a valid email address.";
            contactForm.reportValidity();
            return;
        }

        const subject = encodeURIComponent(
            "Portfolio Contact from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailLink =
            "mailto:popeyenet26@gmail.com" +
            "?subject=" + subject +
            "&body=" + body;

        status.textContent =
            "Opening your email app. Please send the email there.";

        window.location.href = mailLink;
    });
}


/* Rocket back-to-top button */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    function checkScroll() {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", checkScroll, {
        passive: true
    });

    checkScroll();


backToTop.addEventListener("click", function() {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
        backToTop.classList.add("launch");
    }

    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth"
    });

    // Reset animation for the next click
    if (!reducedMotion) {
        setTimeout(function() {
            backToTop.classList.remove("launch");
        }, 650);
    }
});

}


/* Network Navigation Menu */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Function to close the network menu
    function closeMenu() {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label", "Open navigation menu"
        );
    }

    // Open and close when clicking the network icon
    menuToggle.addEventListener("click", function() {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded", String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close when selecting a section
    navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", closeMenu);
    });

    // Close when pressing Escape
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape" &&
            navLinks.classList.contains("open")) {

            closeMenu();
            menuToggle.focus();
        }
    });

    // Reset when switching to desktop
    window.addEventListener("resize", function() {

        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}
