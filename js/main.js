/* 
  Ikko Digital Shoots - Interactive Script System
  Author: Antigravity AI
*/

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SCROLL PROGRESS & STICKY GLASSMORPHIC HEADER
  // =========================================================================
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scrollProgress');

  if (header || scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update scroll progress bar
      if (scrollProgressBar && docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = `${scrollPercent}%`;
      }

      // Toggle Header scrolled status
      if (header) {
        if (scrollTop > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  // =========================================================================
  // 2. HAMBURGER MENU DRAWER (MOBILE RESPONSIVE)
  // =========================================================================
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile drawer when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 3. DUAL-BEHAVIOR IMAGE SLIDER (SERVICE CAROUSEL)
  // =========================================================================
  const sliderContainer = document.getElementById('sliderContainer');
  const slides = document.querySelectorAll('.slide');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const sliderDots = document.querySelectorAll('#sliderDots .slider-dot');
  
  if (sliderContainer && slides.length > 0 && sliderPrev && sliderNext) {
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let sliderAutoInterval;

    const updateSliderPosition = () => {
      sliderContainer.style.transform = `translateX(-${currentSlideIndex * 25}%)`;
      
      // Update active dots
      sliderDots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToNextSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      updateSliderPosition();
    };

    const goToPrevSlide = () => {
      currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      updateSliderPosition();
    };

    // Next / Prev triggers
    sliderNext.addEventListener('click', () => {
      goToNextSlide();
      resetSliderTimer();
    });

    sliderPrev.addEventListener('click', () => {
      goToPrevSlide();
      resetSliderTimer();
    });

    // Dot triggers
    sliderDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentSlideIndex = parseInt(e.target.getAttribute('data-index'));
        updateSliderPosition();
        resetSliderTimer();
      });
    });

    // Auto Scroll slider every 5 seconds
    const startSliderTimer = () => {
      sliderAutoInterval = setInterval(goToNextSlide, 5000);
    };

    const resetSliderTimer = () => {
      clearInterval(sliderAutoInterval);
      startSliderTimer();
    };

    startSliderTimer();
  }

  // =========================================================================
  // 4. GOOGLE-REVIEW TESTIMONIALS SLIDER
  // =========================================================================
  const testimonialContainer = document.getElementById('testimonialContainer');
  const testimonialDots = document.querySelectorAll('#testimonialDots .testimonial-dot');
  
  if (testimonialContainer && testimonialDots.length > 0) {
    const totalTestimonials = testimonialDots.length;
    let currentReviewIndex = 0;
    let reviewAutoInterval;

    const updateTestimonialPosition = () => {
      testimonialContainer.style.transform = `translateX(-${currentReviewIndex * 20}%)`;
      
      testimonialDots.forEach((dot, index) => {
        if (index === currentReviewIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToNextTestimonial = () => {
      currentReviewIndex = (currentReviewIndex + 1) % totalTestimonials;
      updateTestimonialPosition();
    };

    testimonialDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentReviewIndex = parseInt(e.target.getAttribute('data-index'));
        updateTestimonialPosition();
        resetReviewTimer();
      });
    });

    const startReviewTimer = () => {
      reviewAutoInterval = setInterval(goToNextTestimonial, 6000);
    };

    const resetReviewTimer = () => {
      clearInterval(reviewAutoInterval);
      startReviewTimer();
    };

    startReviewTimer();
  }

  // =========================================================================
  // 5. ANIMATED NUMERIC COUNTERS (VIEWPORT TRIGGERED)
  // =========================================================================
  const counterNumbers = document.querySelectorAll('.stat-number');
  
  if (counterNumbers.length > 0) {
    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds animation duration
      const frameRate = 1000 / 60; // 60 fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quadratic animation
        const currentValue = Math.round(target * progress * (2 - progress));
        
        if (target === 3) {
          counter.textContent = `${currentValue}+`;
        } else if (target === 98) {
          counter.textContent = `${currentValue}%`;
        } else {
          counter.textContent = `${currentValue}+`;
        }

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          if (target === 3) {
            counter.textContent = '3+';
          } else if (target === 98) {
            counter.textContent = '98%';
          } else {
            counter.textContent = `${target}+`;
          }
        }
      };
      
      animate();
    };

    // Intersection Observer for Counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          countUp(counter);
          observer.unobserve(counter); // Trigger once
        }
      });
    }, { threshold: 0.5 });

    counterNumbers.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // =========================================================================
  // 6. SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

  // =========================================================================
  // 7. ACTIVE MENU SECTION LINK TRACKING (For Multi-page or Single-page)
  // =========================================================================
  // Set active link based on current page URL first
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === page || (page === "index.html" && href === "index.html") || (page === "" && href === "index.html")) {
      link.classList.add('active');
    }
  });

  // Only run scroll spy if navigation contains hash links
  const hasHashLinks = Array.from(navLinks).some(link => link.getAttribute('href').startsWith('#'));
  const sections = document.querySelectorAll('section');
  if (hasHashLinks && sections.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 150; // offset for header

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        }
      });
    });
  }

  // =========================================================================
  // 8. INTERACTIVE FAQ ACCORDIONS (SMOOTH HEIGHT)
  // =========================================================================
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      
      // Close other FAQs if active
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });

      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        faqBody.style.maxHeight = `${faqBody.scrollHeight}px`;
      } else {
        faqBody.style.maxHeight = '0px';
      }
    });
  });

  // =========================================================================
  // 9. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 10. URL PARAMETERS PRE-SELECTION FOR CONTACT FORM
  // =========================================================================
  const serviceDropdown = document.getElementById('serviceInterested');
  if (serviceDropdown) {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    if (planParam) {
      const planLower = planParam.toLowerCase();
      if (planLower.includes('silver') || planLower === 'birthday') {
        serviceDropdown.value = 'Birthday Shoot';
      } else if (planLower.includes('gold') || planLower === 'prewedding') {
        serviceDropdown.value = 'Pre-Wedding Shoot';
      } else if (planLower.includes('platinum') || planLower === 'wedding') {
        serviceDropdown.value = 'Wedding Shots';
      } else if (planLower === 'event') {
        serviceDropdown.value = 'Event Coverage';
      }
    }
  }

});

// ===========================================================================
// 11. LEAD CAPTURE FORM VALIDATION & SUBMISSION WORKFLOW
// ===========================================================================

window.handleLeadSubmit = function(event) {
  event.preventDefault();
  
  const form = document.getElementById('leadForm');
  if (!form) return;
  const submitBtn = form.querySelector('.form-submit-btn');
  const successAlert = document.getElementById('formSuccess');
  
  // Basic validation checks
  const fullName = document.getElementById('fullName').value.trim();
  const mobile = document.getElementById('mobileNumber').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const business = document.getElementById('businessName').value.trim();
  const service = document.getElementById('serviceInterested').value;

  if (!fullName || !mobile || !email || !message || !service) {
    alert("Please fill out all required fields and select a Service Type.");
    return;
  }

  // Validate mobile number format (Exactly 10 digits)
  const phoneReg = /^[0-9]{10}$/;
  if (!phoneReg.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Validate email format syntax
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const originalBtnHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';

  // Send via AJAX to Formspree
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      successAlert.style.display = 'flex';
      form.reset();
      
      const formCard = document.querySelector('.form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(() => {
        let opacity = 1;
        const fadeInterval = setInterval(() => {
          if (opacity > 0) {
            opacity -= 0.1;
            successAlert.style.opacity = opacity;
          } else {
            clearInterval(fadeInterval);
            successAlert.style.display = 'none';
            successAlert.style.opacity = 1;
          }
        }, 50);
      }, 8000);
    } else {
      throw new Error("Form submission failed");
    }
  })
  .catch(error => {
    console.error("Formspree submission failed, falling back to mailto:", error);
    // Fallback: trigger mailto construct
    const mailtoSubject = encodeURIComponent(`Photography Booking Inquiry - ${fullName}`);
    const mailtoBody = encodeURIComponent(
      `Ikko Digital Shoots - Photo Shoot Booking Details:\n\n` +
      `Full Name: ${fullName}\n` +
      `Mobile: ${mobile}\n` +
      `Email: ${email}\n` +
      `Event Date & Venue: ${business || 'N/A'}\n` +
      `Service Selected: ${service}\n\n` +
      `Event Details / Message:\n${message}`
    );
    window.location.href = `mailto:info@ikkodigitals.in?subject=${mailtoSubject}&body=${mailtoBody}`;
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  });
};
