// --- Utilidad: escapar HTML ---
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- Oferta: render desde localStorage ---
function renderOferta() {
  const card = document.getElementById("ofertaCard");
  if (!card) return;

  const active  = localStorage.getItem("daimy_offer_active") === "true";
  const title   = localStorage.getItem("daimy_offer_title")  || "";
  const body    = localStorage.getItem("daimy_offer_body")   || "";
  const waLink  = localStorage.getItem("daimy_offer_wa")     || "";
  const cta     = localStorage.getItem("daimy_offer_cta")    || "Más información";
  const expires = localStorage.getItem("daimy_offer_expires")|| "";

  if (active && (title || body)) {
    card.className = "oferta__card oferta__card--active";
    card.innerHTML = `
      <div class="oferta__badge">✦ Promoción especial</div>
      <h3 class="oferta__title">${escHtml(title)}</h3>
      <p class="oferta__body">${escHtml(body).replace(/\n/g, "<br>")}</p>
      <div class="oferta__meta">
        ${waLink ? `<a href="${escHtml(waLink)}" target="_blank" rel="noopener" class="oferta__cta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          ${escHtml(cta)}
        </a>` : ""}
        ${expires ? `<span class="oferta__expires">⏳ ${escHtml(expires)}</span>` : ""}
      </div>
      <div class="oferta__deco" aria-hidden="true">✦</div>
    `;
  } else {
    card.className = "oferta__card oferta__card--inactive";
    card.innerHTML = `
      <p class="oferta__coming-kicker">Próximamente</p>
      <p class="oferta__coming-title">Estamos preparando algo especial para ti…</p>
      <p class="oferta__coming-text">Síguenos en Instagram para ser la primera en enterarte de nuestras promociones.</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  // --- Oferta ---
  renderOferta();

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
