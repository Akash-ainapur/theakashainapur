// ============================
// akash.in — Interactions
// ============================

// ——— Page Loader ———
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hidden');
  }, 600);
});

// ——— Scroll Reveal (Intersection Observer) ———
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the reveal for elements that appear together
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize reveal observers after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el, index) => {
    // Add stagger delay to sibling reveal elements
    el.dataset.delay = index * 80;
    revealObserver.observe(el);
  });
});

// ——— Spidy Pack Download Modal ———
function openModal() {
  const modal = document.getElementById('emailModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('emailModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}



// Toast notification and auto-close on download click
function triggerDownloadToast() {
  showToast('🚀', 'Preparing Spidy Edit Pack ZIP direct download...');
  
  // Auto-close modal after 1.2 seconds so they are back on the homepage smoothly
  setTimeout(() => {
    closeModal();
    showToast('⚡', 'Download started from Google Drive!');
  }, 1200);
}

// Close modals on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const emailModal = document.getElementById('emailModal');
  if (emailModal) {
    emailModal.addEventListener('click', (e) => {
      if (e.target === emailModal) {
        closeModal();
      }
    });
  }

  const paidWarningModal = document.getElementById('paidWarningModal');
  if (paidWarningModal) {
    paidWarningModal.addEventListener('click', (e) => {
      if (e.target === paidWarningModal) {
        closeWarningModal();
      }
    });
  }
});



// ——— Paid Warning Modal Functions ———
function handleBuyNow() {
  const modal = document.getElementById('paidWarningModal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWarningModal() {
  const modal = document.getElementById('paidWarningModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function proceedToCheckout() {
  closeWarningModal();
  showToast('🔄', 'Opening secure payment gateway...');

  setTimeout(() => {
    window.open('https://payments.cashfree.com/forms?code=testingakashainapur', '_blank');
  }, 800);
}

// ——— Toast Notifications ———
let toastTimeout = null;

function showToast(icon, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toast.querySelector('.toast__icon').textContent = icon;
  toast.querySelector('.toast__text').textContent = message;
  toast.classList.add('visible');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

// ——— Smooth Scroll for Anchor Links ———
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ——— Hero Background & Interaction Scroll Effects ———
document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero__bg');
  const heroMobile = document.querySelector('.hero__mobile');
  const scrollHint = document.querySelector('.hero__scroll');
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  let scrollHintHidden = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 1. Fade out/in the scroll hint smoothly
    if (!scrollHintHidden && scrollY > 80) {
      if (scrollHint) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.6s ease';
      }
      scrollHintHidden = true;
    } else if (scrollHintHidden && scrollY <= 80) {
      if (scrollHint) {
        scrollHint.style.opacity = '1';
        scrollHint.style.transition = 'opacity 0.6s ease';
      }
      scrollHintHidden = false;
    }

    // 2. Smooth opacity transition to subtle background silhouette
    // Opacity transitions from 1.0 (at top) to 0.08 (scrolled down past 550px)
    const fadeRange = 550;
    let opacity = 1 - (scrollY / fadeRange) * 0.92;
    if (opacity < 0.08) opacity = 0.08;
    if (opacity > 1) opacity = 1;

    // Apply opacity and dynamic transforms (parallax shift + subtle zoom out scale)
    if (isDesktop && heroBg) {
      const parallaxShift = scrollY * 0.22;
      const scale = Math.max(1, 1.04 - (scrollY / fadeRange) * 0.04);
      heroBg.style.opacity = opacity;
      heroBg.style.transform = `translateY(${parallaxShift}px) scale(${scale})`;
    } else if (!isDesktop && heroMobile) {
      const parallaxShift = scrollY * 0.15;
      heroMobile.style.opacity = opacity;
      heroMobile.style.transform = `translateY(${parallaxShift}px)`;
    }
  }, { passive: true });
});

// ——— Lightbox ———
function openLightbox(src, caption, sub) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const subEl = document.getElementById('lightboxSub');
  if (!lightbox || !img) return;

  img.src = src;
  img.alt = caption || '';
  captionEl.textContent = caption || '';
  subEl.textContent = sub || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  // If called from an onclick on the overlay itself, only close if clicking the backdrop
  if (e && e.target !== document.getElementById('lightbox') && e.target !== document.getElementById('lightboxCloseBtn')) {
    // Allow click through on the inner content — only close when backdrop is clicked
    if (e.currentTarget === document.getElementById('lightbox') && e.target !== e.currentTarget) return;
  }
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  // Clear src after transition to avoid flash on next open
  setTimeout(() => {
    const img = document.getElementById('lightboxImg');
    if (img && !lightbox.classList.contains('active')) img.src = '';
  }, 400);
}

// Close lightbox on Escape key (added to existing keydown listener)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeWarningModal();
    closeLightbox();
  }
});

