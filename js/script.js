/* script.js
   Handles:
   - theme toggle + persistance
   - mobile nav open/close
   - typed hero roles (simple)
   - scroll reveal animations (basic)
   - skill bar animation on scroll
   - project modal open/close + accessible focus trap
   - contact form client-side validation + success toast
*/

/* Utility: select single / multiple */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ===============
   THEME TOGGLE
   =============== */
(function themeInit() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const root = document.documentElement;
  const sunIcon = btn.querySelector(".icon-sun");
  const moonIcon = btn.querySelector(".icon-moon");

  // Apply theme and save to localStorage
  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    updateIcons(theme);
  };

  // Show only the correct icon
  const updateIcons = (theme) => {
    if (theme === "light") {
      sunIcon.style.display = "inline";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline";
    }
  };

  // Load theme from localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Button click to toggle
  btn.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);

    btn.classList.add("pulse");
    setTimeout(() => btn.classList.remove("pulse"), 300);
  });
})();

/* ===============
   NAV TOGGLE (mobile)
   =============== */
// (function navToggle() {
//   const toggle = document.querySelector(".nav-toggle");
//   const nav = $("#primary-nav");
//   if (!toggle || !nav) return;

//   toggle.addEventListener("click", () => {
//     const expanded = toggle.getAttribute("aria-expanded") === "true";
//     toggle.setAttribute("aria-expanded", String(!expanded));
//     if (!expanded) {
//       nav.classList.add("open");
//       nav.style.display = "block";
//       nav.setAttribute("aria-hidden", "false");
//     } else {
//       nav.classList.remove("open");
//       nav.style.display = "";
//       nav.setAttribute("aria-hidden", "true");
//     }
//   });

//   // close nav when clicking link
//   $$(".nav-list a").forEach((a) =>
//     a.addEventListener("click", () => {
//       if (nav.classList.contains("open")) {
//         nav.classList.remove("open");
//         toggle.setAttribute("aria-expanded", "false");
//         nav.style.display = "";
//       }
//     })
//   );
// })();

/* ===============
   TYPED / HERO ROLES (simple, non-library)
   =============== */
(function typedRoles() {
  const el = $("#typed-roles");
  if (!el) return;
  // this is a fade/rotate text fallback (typed would be heavier)
  const texts = [
    "Business Developer",
    "Lead Generation Expert",
    "Growth Strategist",
  ];
  let idx = 0;
  setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = texts[idx];
      idx = (idx + 1) % texts.length;
      el.style.opacity = 1;
    }, 350);
  }, 3200);
})();

/* ===============
   SCROLL REVEAL (basic)
   =============== */
(function scrollReveal() {
  const revealEls = Array.from(
    document.querySelectorAll(".section, .card, .testimonial, .project-card")
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
})();

/* ===============
   SKILL BAR ANIMATION
   =============== */
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-fill");
          const percent = entry.target.dataset.percent;
          fill.style.width = `${percent}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
});

/* ===============
   PROJECT MODAL (accessible)
   =============== */
(function projectModal() {
  const modal = $("#project-modal");
  const modalBody = $("#modal-body");
  const closeBtn = modal && modal.querySelector(".modal-close");

  function openProject(data) {
    modalBody.innerHTML = `
      <h2 id="modal-title">${data.title}</h2>
      <img src="${data.img}" alt="${data.title}" style="max-width:100%; border-radius:10px; margin: .6rem 0;">
      <p><strong>Summary</strong>: ${data.summary}</p>
      <p><strong>Results</strong>: ${data.results}</p>
    `;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // focus trap: shift focus to modal
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$(".open-project").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;
      const raw = card.getAttribute("data-project");
      try {
        const data = JSON.parse(raw);
        openProject(data);
      } catch (err) {}
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
      // close on ESC
      document.addEventListener(
        "keydown",
        (ev) => {
          if (ev.key === "Escape") closeModal();
        },
        { once: true }
      );
    });
  }
})();

/* ===============
   CONTACT FORM (client validation & toast)
   =============== */
(function contactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form) return;

  // Helper function: show field error
  function showFieldError(field, message) {
    field.classList.add("input-error");
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("field-error")) {
      errorEl.textContent = message;
    } else {
      const span = document.createElement("span");
      span.className = "field-error";
      span.style.color = "var(--gold)";
      span.textContent = message;
      field.parentNode.appendChild(span);
    }
  }

  // Helper function: clear field error
  function clearFieldError(field) {
    field.classList.remove("input-error");
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("field-error")) {
      errorEl.remove();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "";
    let hasError = false;

    // Fields
    const name = form.name;
    const email = form.email;
    const company = form.company;
    const budget = form.budget;
    const message = form.message;

    // Clear previous errors
    [name, email, budget, message].forEach((f) => clearFieldError(f));

    // Name validation
    if (!name.value.trim()) {
      showFieldError(name, "Name is required.");
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showFieldError(email, "Email is required.");
      hasError = true;
    } else if (!emailRegex.test(email.value.trim())) {
      showFieldError(email, "Please enter a valid email address.");
      hasError = true;
    }

    // Budget validation
    if (!budget.value) {
      showFieldError(budget, "Please select a budget.");
      hasError = true;
    }

    // Message validation
    if (!message.value.trim()) {
      showFieldError(message, "Message cannot be empty.");
      hasError = true;
    }

    if (hasError) {
      feedback.textContent = "Please fix the errors above.";
      feedback.style.color = "var(--gold)";
      return;
    }

    // Fake success (replace with backend API later)
    feedback.textContent = "Thanks! Your message has been received.";
    feedback.style.color = "var(--accent)";
    form.reset();

    // Toast notification
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = "Message sent — I will reply within 48 hours.";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("visible"), 50);
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 300);
    }, 4200);
  });

  // Real-time validation on blur
  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("blur", () => {
      clearFieldError(field);
      if (field.required && !field.value.trim()) {
        showFieldError(
          field,
          `${
            field.name.charAt(0).toUpperCase() + field.name.slice(1)
          } is required.`
        );
      }
      if (
        field.type === "email" &&
        field.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ) {
        showFieldError(field, "Invalid email address.");
      }
    });
  });
})();

// (function contactForm() {
//   const form = $("#contact-form");
//   const feedback = $("#form-feedback");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     feedback.textContent = "";
//     const name = form.name.value.trim();
//     const email = form.email.value.trim();
//     const message = form.message.value.trim();
//     const budget = form.budget.value;

//     if (!name || !email || !message || !budget) {
//       feedback.textContent = "Please fill required fields.";
//       feedback.style.color = "var(--gold)";
//       return;
//     }
//     // simple email regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       feedback.textContent = "Please enter a valid email address.";
//       feedback.style.color = "var(--gold)";
//       return;
//     }

//     // fake success (no backend)
//     feedback.style.color = "var(--accent)";
//     feedback.textContent = "Thanks! Your message has been received (demo).";
//     form.reset();

//     // show ephemeral toast
//     const toast = document.createElement("div");
//     toast.className = "toast";
//     toast.textContent = "Message sent — I will reply within 48 hours.";
//     document.body.appendChild(toast);
//     setTimeout(() => toast.classList.add("visible"), 50);
//     setTimeout(() => {
//       toast.classList.remove("visible");
//       setTimeout(() => toast.remove(), 300);
//     }, 4200);
//   });
// })();

/* ===============
   Small: set year
   =============== */
(function setYear() {
  const y = new Date().getFullYear();
  const el = $("#year");
  if (el) el.textContent = y;
})();

/* End of script.js */
