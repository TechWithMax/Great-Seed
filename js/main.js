document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Toggle menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Toggle menu");
      });
    });
  }

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

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

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

  
  const videoFrame = document.querySelector(".media-frame--video");
  const consultationVideo = document.querySelector(".consultation-video");
  const playButton = document.querySelector(".media-frame--video .play-button");

  if (videoFrame && consultationVideo && playButton) {
    playButton.addEventListener("click", () => {
      videoFrame.classList.add("is-playing");
      consultationVideo.setAttribute("controls", "");
      consultationVideo.play();
    });
  }
});

