document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile navigation ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    const setNavState = (isOpen) => {
      navLinks.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Toggle menu");
    };

    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setNavState(!navLinks.classList.contains("is-open"));
    });

    // Close when a menu link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    // Close when tapping/clicking empty space outside the menu
    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("is-open")) return;
      if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
      setNavState(false);
    });

    // Close with the Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavState(false);
    });

    // Reset if the screen is resized up to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) setNavState(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* ---------- Footer year ---------- */
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ---------- Hero slideshow ---------- */
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");

  if (heroSlides.length > 1) {
    let activeIndex = 0;
    let slideTimer = null;

    const goToSlide = (index) => {
      heroSlides[activeIndex].classList.remove("is-active");
      heroDots[activeIndex]?.classList.remove("is-active");

      activeIndex = index;

      heroSlides[activeIndex].classList.add("is-active");
      heroDots[activeIndex]?.classList.add("is-active");
    };

    const startAutoplay = () => {
      slideTimer = setInterval(() => {
        goToSlide((activeIndex + 1) % heroSlides.length);
      }, 7000);
    };

    const stopAutoplay = () => {
      clearInterval(slideTimer);
    };

    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  /* ---------- Highlight current page in nav ---------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("is-active");
    }
  });
});