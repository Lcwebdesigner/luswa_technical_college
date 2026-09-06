// ==========================================
// LUSWA TECHNICAL COLLEGE - script.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    // Mobile menu
    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");

                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Active navigation link
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".navbar a");

    function updateActiveLink() {
        let current = "";

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 160) {
                current = section.id;
            }
        });

        links.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + current
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Scroll-to-top button
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.className = "scroll-top";
    scrollTopBtn.type = "button";
    scrollTopBtn.setAttribute("aria-label", "Scroll to top");
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", function () {
        scrollTopBtn.classList.toggle("show", window.scrollY > 500);
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // WhatsApp button
    const whatsapp = document.querySelector(".whatsapp");
    if (whatsapp) {
        whatsapp.href =
            "https://wa.me/254748032315?text=Hello%20Luswa%20Technical%20College,%20I%20would%20like%20to%20make%20an%20inquiry.";
        whatsapp.target = "_blank";
        whatsapp.rel = "noopener noreferrer";
    }

    // Current year
    const footerYear = document.querySelector(".footer-bottom p");
    if (footerYear) {
        footerYear.innerHTML =
            "© " + new Date().getFullYear() +
            " Luswa Technical College. All Rights Reserved.";
    }
});
