// main.js
// Controls: mobile nav toggle, fade in on scroll and contact form validation

document.addEventListener('DOMContentLoaded', function () {
  // NAV TOGGLE for mobile
  const navToggle = document.querySelectorAll('#navToggle');
  const nav = document.getElementById('nav');

  // attach toggle to all navToggle buttons (present on each page)
  navToggle.forEach(btn => {
    btn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
     const mobileNav = document.getElementsByClassName('mobile-nav');
     mobileNav[0].style.display =  isOpen ? 'block' : 'none';
      // animate hamburger
      const ham = this.querySelector('.hamburger');
      if (ham) {
        if (isOpen) {
          ham.style.transform = 'rotate(90deg)';
        } else {
          ham.style.transform = '';
          mobileNav[0].style.display = 'none';
        }
      }
    });
  });

  // Intersection Observer for fade-in on scroll
  const observerOptions = { threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Contact form validation and submission simulation
  const form = document.getElementById('contactForm');
  if (form) {
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill out all fields before sending.';
        formMessage.style.color = 'var(--brown)';
        return;
      }

      // rudimentary email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = 'var(--brown)';
        return;
      }

      // simulate success
      formMessage.textContent = 'Sending message...';
      formMessage.style.color = 'var(--brown-soft)';

      // simulate network delay then clear fields
      setTimeout(() => {
        formMessage.textContent = 'Message sent successfully. I will get back to you soon.';
        form.reset();
      }, 900);
    });
  }

  // Close mobile nav when clicking a nav link (improves UX)
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  });
});
