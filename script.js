
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
            "mailto:immannotlimitjeret@gmail.com" +
            "?subject=" + subject +
            "&body=" + body;

        status.textContent =
            "Opening your email app. Please send the email there.";

        window.location.href = mailLink;
    });
}
