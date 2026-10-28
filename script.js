
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



/*  navigation menu */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function() {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after selecting a section
    navLinks.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });

}


/* Active section indicator */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
    "#nav-links a"
);

function updateActiveSection() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= 180) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach(function(link) {

        const linkSection = link.getAttribute("href");

        if (linkSection === "#" + currentSection) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });

}

window.addEventListener("scroll", updateActiveSection, {
    passive: true
});

window.addEventListener("resize", updateActiveSection);

updateActiveSection();


/* Scroll reveal animation */

const revealElements = document.querySelectorAll(
    "#about, .skill-card, .journey-item, .contact-info, .contact-form-box"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

               
if (entry.isIntersecting) {
    // Reveal the element when it enters the screen
    entry.target.classList.add("visible");
} else {
    // Hide it again when it leaves the screen
    entry.target.classList.remove("visible");
}


            });

        },
        {
            threshold: 0.25
        }
    );

    revealElements.forEach(function(element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(function(element) {
        element.classList.add("visible");
    });

}


/* Scroll progress indicator */

const scrollProgress = document.getElementById("scroll-progress");

if (scrollProgress) {

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        let progress = 0;

        if (documentHeight > 0) {
            progress = (scrollTop / documentHeight) * 100;
        }

        progress = Math.min(100, Math.max(0, progress));

        scrollProgress.style.width = progress + "%";

        scrollProgress.setAttribute(
            "aria-valuenow",
            String(Math.round(progress))
        );
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateScrollProgress
    );

    updateScrollProgress();
}


/* =========================================
   INTERACTIVE SKILL EXPLORER
   ========================================= */

const skillButtons = document.querySelectorAll(".skill-select");

const skillDetails = document.getElementById("skill-details");
const skillTitle = document.getElementById("skill-detail-title");
const skillDescription = document.getElementById(
    "skill-detail-description"
);
const skillImages = document.getElementById("skill-images");
const closeSkill = document.getElementById("close-skill");

/* Skill information and real images */

const skillData = {

    programming: {
        title: "Programming",

        description:
            "I have learned and practiced C, C++, Java, " +
            "Python, and SQL through university coursework " +
            "and personal learning. I also explore AI-assisted " +
            "development tools while learning programming.",

        images: [
            {
                src: "Assets/pic5.png",
                caption: "Programming work using Antigravity"
            }
        ]
    },

    systems: {
        title: "Operating Systems",

        description:
            "I have explored Debian Linux, Ubuntu, and " +
            "Windows. My practical experience includes " +
            "installing and configuring operating systems, " +
            "experimenting with Linux desktop environments, " +
            "and maintaining an older desktop computer.",

        images: [
            {
                src: "Assets/pic3.jpeg",
                caption: "My Debian 13 Linux environment"
            }
        ]
    },

    networking: {
        title: "Networking",

        description:
            "I have gained hands-on experience with SSH, " +
            "network configuration, Syncthing, and basic " +
            "server administration. I configured file " +
            "synchronisation between my Debian computer " +
            "and Windows laptop.",

        images: [
            {
                src: "Assets/pic1.png",
                caption: "Syncthing file synchronisation setup"
            }
        ]
    },

    tools: {
        title: "Development Tools",

        description:
            "I use and explore development tools such as " +
            "VSCodium, Visual Studio Code, GitHub, " +
            "Oracle VirtualBox, and Antigravity. " +
            "These tools support my coursework, coding, " +
            "virtualisation, and personal experiments.",

        images: [
            {
                src: "Assets/pic2.jpg",
                caption: "VSCodium"
            },
            {
                src: "Assets/pic4.png",
                caption: "Virtual machine environment"
            },
            {
                src: "Assets/pic6.png",
                caption: "Visual Studio Code"
            }
        ]
    },

    hardware: {
        title: "Computer Hardware & Maintenance",

        description:
            "I enjoy working with computer hardware. " +
            "My hands-on experience includes installing " +
            "hard disk drives, working with SATA connections, " +
            "replacing CPU cooling fans, and maintaining " +
            "an older desktop computer.",

        images: [
            {
                src: "Assets/hardware1.jpg",
                caption: "Hard disk drive and SATA connections"
            },
            {
                src: "Assets/hardware2.jpg",
                caption: "Intel CPU cooler and motherboard"
            }
        ]
    },

    blender: {
        title: "3D Modelling & Creative Tools",

        description:
            "I have explored basic 3D modelling using " +
            "Blender. I created a simple table model " +
            "and experimented with geometric objects, " +
            "materials, lighting, and scene composition.",


images: [
    {
        src: "Assets/pic7.png",
        caption: "Blender modelling view - table and geometric experiments"
    },
    {
        src: "Assets/pic8.png",
        caption: "Blender rendered view - materials and lighting"
    }
]

    }
};

/* Open and update the large skill panel */

if (
    skillButtons.length > 0 &&
    skillDetails &&
    skillTitle &&
    skillDescription &&
    skillImages &&
    closeSkill
) {

    function resetSkillButtons() {

        skillButtons.forEach(function(button) {
            button.classList.remove("active-skill");
            button.setAttribute("aria-expanded", "false");
        });

    }

    function closeSkillPanel() {

        skillDetails.hidden = true;
        resetSkillButtons();

    }

    skillButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const selectedSkill = button.dataset.skill;
            const data = skillData[selectedSkill];

            if (!data) {
                return;
            }

            /* Clicking the same card closes the panel */
            if (
                !skillDetails.hidden &&
                button.classList.contains("active-skill")
            ) {
                closeSkillPanel();
                return;
            }

            resetSkillButtons();

            button.classList.add("active-skill");
            button.setAttribute("aria-expanded", "true");

            /* Update heading and description */
            skillTitle.textContent = data.title;
            skillDescription.textContent = data.description;

            /* Remove images from the previous skill */
            skillImages.replaceChildren();

            /* Add the selected skill's real images */
            data.images.forEach(function(imageData) {

                const figure = document.createElement("figure");
                figure.className = "skill-image-item";

                const image = document.createElement("img");
                image.src = imageData.src;
                image.alt = imageData.caption;
                image.loading = "lazy";
                image.tabIndex = 0;
                image.setAttribute("role", "button");
                image.setAttribute(
                     "aria-label",
                     "Enlarge image: " + imageData.caption
                 );


                const caption = document.createElement("figcaption");
                caption.textContent = imageData.caption;

                figure.appendChild(image);
                figure.appendChild(caption);

                skillImages.appendChild(figure);

            });

           
/* Display the panel */
skillDetails.hidden = false;

/* Move the panel directly after the selected row */

const skillsGrid = document.querySelector(".skills-grid");

if (skillsGrid) {

    const columns = window.matchMedia(
        "(max-width: 768px)"
    ).matches ? 1 : 2;

    const buttons = Array.from(skillButtons);
    const selectedIndex = buttons.indexOf(button);

    const lastIndexInRow = Math.min(
        Math.floor(selectedIndex / columns) * columns
            + columns - 1,
        buttons.length - 1
    );

    buttons[lastIndexInRow].insertAdjacentElement(
        "afterend",
        skillDetails
    );
}

        });

    });

    /* Close panel button */
    closeSkill.addEventListener("click", function() {

        const activeButton = document.querySelector(
            ".skill-select.active-skill"
        );

        closeSkillPanel();

        if (activeButton) {
            activeButton.focus();
        }

    });

}


/* =========================================
   SKILL IMAGE LIGHTBOX
   ========================================= */

const imageLightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeLightboxButton = document.getElementById("close-lightbox");

if (
    imageLightbox &&
    lightboxImage &&
    lightboxCaption &&
    closeLightboxButton
) {

    let previousFocus = null;

    function openImageLightbox(image) {

        previousFocus = document.activeElement;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        const caption = image.closest("figure")
            ?.querySelector("figcaption");

        lightboxCaption.textContent =
            caption ? caption.textContent : image.alt;

        imageLightbox.hidden = false;

        document.body.style.overflow = "hidden";

        closeLightboxButton.focus();
    }

    function closeImageLightbox() {

        imageLightbox.hidden = true;
        lightboxImage.removeAttribute("src");

        document.body.style.overflow = "";

        if (previousFocus && previousFocus.isConnected) {
            previousFocus.focus();
        }
    }

    /* Event delegation for dynamically created images */
    document.addEventListener("click", function(event) {

        const image = event.target.closest(
            ".skill-image-item img"
        );

        if (image) {
            openImageLightbox(image);
        }

    });

    /* Keyboard support */
    document.addEventListener("keydown", function(event) {

        if (imageLightbox.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeImageLightbox();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            closeLightboxButton.focus();
        }

    });

    /* Close button */
    closeLightboxButton.addEventListener(
        "click",
        closeImageLightbox
    );

    /* Click outside image to close */
    imageLightbox.addEventListener("click", function(event) {

        if (event.target === imageLightbox) {
            closeImageLightbox();
        }

    });

    
document.addEventListener("keydown", function(event) {

    if (
        event.key !== "Enter" &&
        event.key !== " "
    ) {
        return;
    }

    const image = event.target.closest(
        ".skill-image-item img"
    );

    if (image && imageLightbox.hidden) {
        event.preventDefault();
        openImageLightbox(image);
    }

});
}


/* =====================================
   PROJECT DETAILS TOGGLE
   ===================================== */

const projectButtons = document.querySelectorAll(
    ".project-details-btn"
);

projectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const detailsId = button.getAttribute(
            "aria-controls"
        );

        if (!detailsId) {
            return;
        }

        const details = document.getElementById(
            detailsId
        );

        if (!details) {
            return;
        }

        const isOpening = details.hidden;

        details.hidden = !isOpening;

        button.setAttribute(
            "aria-expanded",
            String(isOpening)
        );

        button.textContent = isOpening
            ? "Close Details"
            : "View Details";

    });

});


/* =====================================
   PROJECT DETAILS TOGGLE
   ===================================== */

const projectButtons = document.querySelectorAll(
    ".project-details-btn"
);

projectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const detailsId = button.getAttribute(
            "aria-controls"
        );

        if (!detailsId) {
            return;
        }

        const details = document.getElementById(
            detailsId
        );

        if (!details) {
            return;
        }

        const isOpening = details.hidden;

        details.hidden = !isOpening;

        button.setAttribute(
            "aria-expanded",
            String(isOpening)
        );

        button.textContent = isOpening
            ? "Close Details"
            : "View Details";

    });

});

