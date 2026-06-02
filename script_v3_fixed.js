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

// ——— Email Capture Modal ———
function openModal() {
  const modal = document.getElementById('emailModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Focus the email input after transition
  setTimeout(() => {
    document.getElementById('emailInput').focus();
  }, 350);
}

function closeModal() {
  const modal = document.getElementById('emailModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Reset modal state after close animation
  setTimeout(() => {
    const form = document.getElementById('modalForm');
    const success = document.getElementById('modalSuccess');
    if (form) form.style.display = '';
    if (success) success.classList.remove('visible');
    // Clear the input
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
      emailInput.value = '';
      emailInput.style.borderColor = '';
    }
  }, 350);
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

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeWarningModal();
  }
});

function submitEmail() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();

  // Validate email
  if (!email || !isValidEmail(email)) {
    emailInput.style.borderColor = '#CC3333';
    emailInput.style.boxShadow = '0 0 0 3px rgba(204, 51, 51, 0.2)';
    emailInput.focus();
    showToast('⚠️', 'Please enter a valid email address');
    setTimeout(() => {
      emailInput.style.borderColor = '';
      emailInput.style.boxShadow = '';
    }, 2500);
    return;
  }

  const submitBtn = document.getElementById('emailSubmit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Simulate API call — replace with real backend endpoint
  // Example: fetch('/api/free-download', { method: 'POST', body: JSON.stringify({ email }) })
  setTimeout(() => {
    // Show success state
    document.getElementById('modalForm').style.display = 'none';
    document.getElementById('modalSuccess').classList.add('visible');

    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send me the clip';

    showToast('✅', 'Download link sent to your email!');
  }, 1500);
}

// Enter key triggers submit
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitEmail();
      }
    });
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
