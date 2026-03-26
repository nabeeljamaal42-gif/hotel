// DOM Elements
const contactForm = document.getElementById('contactForm');
const mobileCallBtn = document.querySelector('.mobile-call-btn');
const header = document.querySelector('.header');

// Form Submission Handler
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitBtn = contactForm.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    // Show success message
    showSuccessMessage();
    
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Log form data (in production, send to server)
    console.log('Form submitted:', data);
    
    // Track conversion (Google Analytics, etc.)
    trackConversion('form_submission');
  }, 1500);
});

// Success Message Function
function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message show';
  successDiv.innerHTML = `
    <strong>Thank you!</strong><br>
    We've received your inquiry and will contact you within 2 hours.
    <br><br>
    <strong>For immediate assistance, call us at:</strong><br>
    <a href="tel:0747441444" style="color: white; font-size: 18px; font-weight: bold;">0747 441 444</a>
  `;
  
  contactForm.parentNode.insertBefore(successDiv, contactForm);
  
  // Remove success message after 10 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 10000);
}

// Phone Call Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', function() {
    // Track call conversion
    trackConversion('phone_call');
    
    // Log call attempt (in production, use call tracking service)
    console.log('Phone call initiated:', this.href);
  });
});

// Scroll Effects
window.addEventListener('scroll', function() {
  // Header shadow on scroll
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
  
  // Show/hide mobile call button based on scroll
  if (window.scrollY > 500) {
    mobileCallBtn.style.opacity = '1';
    mobileCallBtn.style.transform = 'scale(1)';
  } else {
    mobileCallBtn.style.opacity = '0.9';
    mobileCallBtn.style.transform = 'scale(0.95)';
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .trust-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Conversion Tracking (placeholder for Google Analytics, Facebook Pixel, etc.)
function trackConversion(action) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'event_category': 'engagement',
      'event_label': action
    });
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: action
    });
  }
  
  // Custom tracking
  console.log('Conversion tracked:', action);
  
  // In production, you might want to send this to your own analytics
  // fetch('/api/track-conversion', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ action, timestamp: Date.now() })
  // });
}

// Date Input Validation
const checkinInput = document.querySelector('input[name="checkin"]');
const checkoutInput = document.querySelector('input[name="checkout"]');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
if (checkinInput) checkinInput.min = today;
if (checkoutInput) checkoutInput.min = today;

// Update checkout minimum date when checkin changes
if (checkinInput) {
  checkinInput.addEventListener('change', function() {
    checkoutInput.min = this.value;
    if (checkoutInput.value && checkoutInput.value < this.value) {
      checkoutInput.value = this.value;
    }
  });
}

// Phone Number Formatting
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    // Remove all non-numeric characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Format for Tanzanian numbers (optional)
    if (value.length > 0) {
      if (value.startsWith('255') && value.length > 3) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
      } else if (value.startsWith('0') && value.length > 3) {
        value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      }
    }
    
    // Don't update if user is trying to format manually
    if (e.target.value.replace(/\D/g, '').length !== value.replace(/\D/g, '').length) {
      e.target.value = value;
    }
  });
}

// Emergency Click-to-Call Enhancement
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to call buttons
  const callButtons = document.querySelectorAll('a[href^="tel:"]');
  callButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.6)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left - 10) + 'px';
      ripple.style.top = (e.clientY - rect.top - 10) + 'px';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Page Load Performance Tracking
window.addEventListener('load', function() {
  // Track page load time
  const loadTime = performance.now();
  console.log('Page load time:', loadTime.toFixed(2), 'ms');
  
  // Track slow loads
  if (loadTime > 3000) {
    console.warn('Slow page load detected:', loadTime.toFixed(2), 'ms');
  }
});

// Offline Detection
window.addEventListener('online', function() {
  console.log('Connection restored');
});

window.addEventListener('offline', function() {
  console.log('Connection lost - showing offline message');
  // You could show an offline banner here
});

// Exit Intent Popup (optional - uncomment if needed)
/*
document.addEventListener('mouseleave', function(e) {
  if (e.clientY < 0) {
    // User is leaving the page
    showExitIntentPopup();
  }
});

function showExitIntentPopup() {
  // Create and show exit intent popup
  console.log('Exit intent detected - would show popup here');
}
*/
