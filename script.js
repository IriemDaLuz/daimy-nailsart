document.addEventListener("DOMContentLoaded", () => {

  // --- Año en footer ---
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Header scroll ---
  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // --- Menú móvil ---
  const toggle = document.querySelector(".header__toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    mobileMenu.querySelectorAll(".mobile-menu__link").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // --- Filtros de galería ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galeriaItems = document.querySelectorAll(".galeria__item");

  if (filterBtns.length && galeriaItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove("filter-btn--active"));
        btn.classList.add("filter-btn--active");

        galeriaItems.forEach(item => {
          if (filter === "all") {
            item.classList.remove("is-hidden");
          } else {
            const cats = (item.dataset.category || "").split(" ");
            item.classList.toggle("is-hidden", !cats.includes(filter));
          }
        });

        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      });
    });
  }

  // --- Crear placeholders para imágenes faltantes ---
  document.querySelectorAll(".galeria__img-wrap img").forEach(img => {
    img.addEventListener("error", () => {
      const wrap = img.closest(".galeria__img-wrap");
      if (!wrap) return;
      img.style.display = "none";
      if (!wrap.querySelector(".galeria__placeholder")) {
        const ph = document.createElement("div");
        ph.className = "galeria__placeholder";
        ph.textContent = img.alt || "Foto del trabajo";
        wrap.appendChild(ph);
      }
    });
  });

  document.querySelectorAll(".nosotras__img-wrap img, .hero__bg img").forEach(img => {
    img.addEventListener("error", () => { img.style.display = "none"; });
  });

  // --- GSAP ---
  const hasGSAP = typeof gsap !== "undefined";
  if (!hasGSAP) return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set("[data-animate]", { clearProps: "all" });
        return;
      }

      // Hero intro
      const intro = gsap.timeline({
        defaults: { duration: 0.85, ease: "power3.out" }
      });

      intro
        .from("[data-hero-kicker]", { autoAlpha: 0, y: 14 })
        .from("[data-hero-title]", { autoAlpha: 0, y: 28 }, "-=0.5")
        .from("[data-hero-text]",  { autoAlpha: 0, y: 18 }, "-=0.45")
        .from("[data-hero-cta]",   { autoAlpha: 0, y: 14 }, "-=0.4")
        .from(".hero__scroll-indicator", { autoAlpha: 0, y: 10, duration: 0.6 }, "-=0.3");

      if (typeof ScrollTrigger === "undefined") return;

      // Reveals genéricos
      gsap.utils.toArray("[data-animate='reveal']").forEach(el => {
        gsap.from(el, {
          autoAlpha: 0,
          y: isDesktop ? 32 : 18,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true
          }
        });
      });

      // Trust bar items
      gsap.from(".trust-bar__item", {
        autoAlpha: 0,
        y: 12,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".trust-bar",
          start: "top 88%",
          once: true
        }
      });

      // Cards servicios escalonadas
      gsap.from(".servicio-card", {
        autoAlpha: 0,
        y: isDesktop ? 28 : 16,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".servicios__grid",
          start: "top 82%",
          once: true
        }
      });

      // Galería items
      gsap.from(".galeria__item", {
        autoAlpha: 0,
        scale: 0.96,
        stagger: 0.05,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".galeria__grid",
          start: "top 85%",
          once: true
        }
      });

      // Nosotras — split visual / content
      if (isDesktop) {
        gsap.from(".nosotras__visual", {
          autoAlpha: 0,
          x: -40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".nosotras__grid",
            start: "top 80%",
            once: true
          }
        });

        gsap.from(".nosotras__content", {
          autoAlpha: 0,
          x: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".nosotras__grid",
            start: "top 80%",
            once: true
          }
        });
      }

      // Reseñas
      gsap.from(".resena-card", {
        autoAlpha: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".resenas__grid",
          start: "top 84%",
          once: true
        }
      });

      // Reservas cards
      gsap.from(".reserva-card", {
        autoAlpha: 0,
        x: -16,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reservas__contacto",
          start: "top 84%",
          once: true
        }
      });

      // Horario
      gsap.from(".reservas__horario", {
        autoAlpha: 0,
        x: isDesktop ? 24 : 0,
        y: isDesktop ? 0 : 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reservas__horario",
          start: "top 84%",
          once: true
        }
      });

      // FAQ items
      gsap.from(".faq__item", {
        autoAlpha: 0,
        y: 10,
        stagger: 0.06,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq__list",
          start: "top 84%",
          once: true
        }
      });

      // Orbs parallax suave (solo desktop)
      if (isDesktop) {
        gsap.to(".hero__orb--1", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });

        gsap.to(".hero__orb--2", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 2
          }
        });
      }
    }
  );
});
