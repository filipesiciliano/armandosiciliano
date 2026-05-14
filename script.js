// ========================================
// VENTILAÇÃO MECÂNICA SEM ENROLAÇÃO
// Landing Page - JavaScript Interativo
// ========================================

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observa elementos com scroll-reveal
document
  .querySelectorAll(".scroll-reveal, .animate-slide-up, .animate-fade-in")
  .forEach((el) => {
    observer.observe(el);
  });

// ========================================
// FLOATING CTA BUTTON (RIGHT SIDE)
// ========================================
const floatingCta = document.getElementById("floating-cta");

window.addEventListener("scroll", () => {
  const heroSection = document.getElementById("hero");
  const checkoutSection = document.getElementById("checkout");

  const heroBottom = heroSection.offsetHeight;
  const checkoutTop = checkoutSection.offsetTop;
  const scrollY = window.scrollY;

  // Mostra o botão flutuante quando sai da hero e não chegou ao checkout
  if (isMobile || (scrollY > heroBottom && scrollY < checkoutTop - 200)) {
    floatingCta.classList.remove("hidden");
  } else {
    floatingCta.classList.add("hidden");
  }
});

// ========================================
// STICKY CTA MOBILE
// ========================================
const stickyCta = document.getElementById("sticky-cta");
let isScrolling = false;

window.addEventListener("scroll", () => {
  const checkoutSection = document.getElementById("checkout");
  const checkoutTop = checkoutSection.offsetTop;
  const scrollY = window.scrollY;

  // Mostra o sticky CTA quando sai da hero section e não alcançou o checkout
  if (scrollY > 500 && scrollY < checkoutTop - 100) {
    if (!stickyCta.classList.contains("visible")) {
      stickyCta.classList.add("visible");
      stickyCta.style.transform = "translateY(0)";
    }
  } else {
    if (stickyCta.classList.contains("visible")) {
      stickyCta.classList.remove("visible");
      stickyCta.style.transform = "translateY(100%)";
    }
  }
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  if (scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop;
});

// ========================================
// SMOOTH SCROLL PARA LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// FUNÇÃO: SCROLL PARA CHECKOUT
// ========================================
function scrollToCheckout() {
  const checkoutSection = document.getElementById("checkout");
  const offsetTop = checkoutSection.offsetTop;

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

// ========================================
// REDIRECIONAR PARA PAGAMENTO (KIWIFY) - DIRETO
// ========================================
function handlePurchase() {
  redirectToKiwify();
}

// ========================================
// FUNÇÃO DEDICADA PARA KIWIFY
// ========================================
function redirectToKiwify() {
  trackEvent("kiwify_click", {
    product: "Ventilação Mecânica Sem Enrolação",
    price: 34.9,
  });
  window.location.href = "https://pay.kiwify.com.br/BoEyQDB";
}

// ========================================
// FORM VALIDATION (se necessário)
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// ANÁLYTICS & TRACKING
// ========================================
function trackEvent(eventName, eventData = {}) {
  // Integre com Google Analytics, Hotmart, etc.
  console.log(`Event: ${eventName}`, eventData);

  // Exemplo com Google Analytics:
  // if (typeof gtag !== 'undefined') {
  //     gtag('event', eventName, eventData);
  // }
}

// Track button clicks
document
  .querySelectorAll('button[onclick*="scrollToCheckout"]')
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      trackEvent("scroll_to_checkout");
    });
  });

// Track purchase attempts
document.addEventListener("click", (e) => {
  if (
    e.target.textContent.includes("COMPRAR") ||
    e.target.textContent.includes("Continuar")
  ) {
    trackEvent("purchase_click");
  }
});

// ========================================
// LAZY LOADING IMAGES (se houver)
// ========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img.lazy").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener("load", () => {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page Load Time: ${loadTime}ms`);
  }
});

// ========================================
// MOBILE MENU (se necessário)
// ========================================
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

// ========================================
// PREVENT DOUBLE SUBMIT
// ========================================
let isSubmitting = false;

function preventDoubleSubmit(callback) {
  return function (e) {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    isSubmitting = true;
    callback(e);
    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  };
}

// ========================================
// DARK MODE TOGGLE (opcional)
// ========================================
function toggleDarkMode() {
  const html = document.documentElement;
  if (html.style.colorScheme === "dark") {
    html.style.colorScheme = "light";
    localStorage.setItem("theme", "light");
  } else {
    html.style.colorScheme = "dark";
    localStorage.setItem("theme", "dark");
  }
}

// Restaurar tema salvo
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.style.colorScheme = savedTheme;
  }
});

// ========================================
// FEEDBACK FORM (se necessário)
// ========================================
function submitFeedback(formData) {
  console.log("Feedback received:", formData);

  // Integrar com seu backend
  // fetch('/api/feedback', {
  //     method: 'POST',
  //     body: JSON.stringify(formData)
  // });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Obter parâmetro da URL
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ========================================
// INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Landing page loaded successfully");

  // Verificar se é mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    document.body.classList.add("is-mobile");
  }

  // Tracking de page view
  trackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
  });
});

// ========================================
// EXPORT FUNCTIONS (se usar módulos)
// ========================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    scrollToCheckout,
    handlePurchase,
    validateEmail,
    trackEvent,
  };
}
