/* =========================================================
   LUSWA TECHNICAL COLLEGE — INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const scrollTop = document.getElementById("scrollTop");
    const loader = document.getElementById("pageLoader");
    const year = document.getElementById("currentYear");
    const form = document.getElementById("applicationForm");
    const success = document.getElementById("formSuccess");

    // Page loader
    window.addEventListener("load", () => {
        setTimeout(() => loader?.classList.add("hide"), 250);
    });

    // Current year
    if (year) year.textContent = new Date().getFullYear();

    // Mobile navigation
    const closeMenu = () => {
        navbar?.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded", "false");
        if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        body.classList.remove("menu-open");
    };

    menuBtn?.addEventListener("click", () => {
        const open = navbar.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        menuBtn.innerHTML = open
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
        body.classList.toggle("menu-open", open);
    });

    navbar?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            navbar?.classList.contains("open") &&
            !navbar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) closeMenu();
    });

    // Header shadow on scroll
    const handleScroll = () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
        scrollTop?.classList.toggle("show", window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Smooth scrolling for same-page links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;

            const target = document.querySelector(id);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Active navigation based on visible sections
    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = [...document.querySelectorAll(".navbar > a:not(.nav-cta)")];

    const updateActiveNav = () => {
        const position = window.scrollY + 150;
        let current = "home";

        sections.forEach(section => {
            if (position >= section.offsetTop) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    // Reveal animations
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    // Animated statistics
    const counters = document.querySelectorAll("[data-count]");
    const animateCounter = element => {
        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || "";
        const duration = 1300;
        const start = performance.now();

        const update = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${Math.floor(target * eased).toLocaleString()}${suffix}`;

            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    };

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Scroll-to-top
    scrollTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // WhatsApp
    const whatsapp = document.querySelector(".whatsapp");
    if (whatsapp) {
        const message = encodeURIComponent(
            "Hello Luswa Technical College, I would like to make an inquiry."
        );
        whatsapp.href = `https://wa.me/254748032315?text=${message}`;
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
    }

    // Application form validation
    const setError = (input, message) => {
        const label = input.closest("label");
        const error = label?.querySelector(".error-message");
        input.classList.toggle("input-error", Boolean(message));
        if (error) error.textContent = message || "";
    };

    form?.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", () => setError(input, ""));
        input.addEventListener("change", () => setError(input, ""));
    });

    form?.addEventListener("submit", event => {
        event.preventDefault();
        success.classList.remove("show");
        let valid = true;

        const name = form.elements.name;
        const phone = form.elements.phone;
        const email = form.elements.email;
        const course = form.elements.course;

        if (!name.value.trim()) {
            setError(name, "Please enter your full name.");
            valid = false;
        }

        if (!phone.value.trim()) {
            setError(phone, "Please enter your phone number.");
            valid = false;
        } else if (!/^[0-9+\s()-]{9,18}$/.test(phone.value.trim())) {
            setError(phone, "Enter a valid phone number.");
            valid = false;
        }

        if (!email.value.trim()) {
            setError(email, "Please enter your email.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            setError(email, "Enter a valid email address.");
            valid = false;
        }

        if (!course.value) {
            setError(course, "Please select a course.");
            valid = false;
        }

        if (!valid) return;

        success.textContent =
            "Application details validated successfully. go and login upob successfull registration.";
        success.classList.add("show");
        form.reset();
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
});
