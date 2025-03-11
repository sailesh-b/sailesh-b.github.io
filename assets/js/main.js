/**
* Template Name: MyResume - v4.2.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */

  gsap.registerPlugin(ScrollTrigger);

gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  backgroundPosition: "50% 100%",
  ease: "none"
});

  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  gsap.registerPlugin(ScrollTrigger);

// Hero letters fade-out and move up individually on scroll
gsap.to("#hero h1 span", {
  opacity: 0,
  y: -40,
  stagger: 0.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom center",
    scrub: true
  }
});

// transisionn animation
gsap.to(".shape1", {
  x: 300,
  y: 100,
  duration: 10,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});

gsap.to(".shape2", {
  x: -300,
  y: -200,
  duration: 15,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});

gsap.to(".shape3", {
  x: 150,
  y: -150,
  duration: 15,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});

  


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  window.addEventListener('load', () => {
    gsap.to("#custom-preloader", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        document.getElementById("custom-preloader").style.display = "none";
      }
    });
  });
  
  // spotlight
  const spotlight = document.querySelector('.spotlight');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    spotlight.style.transform = `translate(${clientX - 100}px, ${clientY - 100}px)`;
});



// About Section Animation
gsap.from(".about .section-title, .image-profile, .content", {
  scrollTrigger: { trigger: ".about", start: "top 80%" },
  opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: "power3.out"
});

// Skills Animation
gsap.from(".skills .progress", {
  scrollTrigger: { trigger: ".skills", start: "top 80%" },
  opacity: 0, x: -50, stagger: 0.15, duration: 1, ease: "power4.out"
});

// Resume Animation
gsap.from(".resume .resume-item", {
  scrollTrigger: { trigger: ".resume", start: "top 80%" },
  opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: "power2.out"
});

// Portfolio Items
gsap.from(".portfolio-item", {
  scrollTrigger: { trigger: ".portfolio", start: "top 80%" },
  opacity: 0, scale: 0.9, y: 30, stagger: 0.2, duration: 0.8, ease: "power2.out"
});

// Contact Animation
gsap.from(".contact .info, .contact .php-email-form", {
  scrollTrigger: { trigger: ".contact", start: "top 80%" },
  opacity: 0, x: -100, stagger: 0.3, duration: 1, ease: "power3.out"
});

// Back-to-top Button
gsap.to(".back-to-top", {
  scrollTrigger: { trigger: "body", start: "top -100%" },
  opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)"
});

// Footer Animation
gsap.from("#footer h3, #footer p, #footer", {
  scrollTrigger: { trigger: "#footer", start: "top 90%" },
  opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: "power3.out"
});


document.querySelectorAll('.progress').forEach(progress => {
  const progressBar = progress.querySelector('.progress-bar');
  const skillText = progress.querySelector('.skill');

  // Hover Effect (Mouse enter)
  progress.addEventListener('mouseenter', () => {
    gsap.to(progressBar, {
      backgroundColor: "#c9a30a",
      scaleX: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(skillText, {
      color: "#c9a30a",
      duration: 0.1,
      ease: "power2.out"
    });
  });

  // Mouse leave - revert to normal
  progress.addEventListener('mouseleave', () => {
    gsap.to(progressBar, {
      backgroundColor: "#0563bb",
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(skillText, {
      color: "#45505b",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  // Click animation (bounce effect)
  progress.addEventListener('click', () => {
    gsap.fromTo(progressBar, 
      { scaleX: 0.8 }, 
      { scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" }
    );

    gsap.fromTo(skillText, 
      { y: -10, opacity: 0.7 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );
  });
});

// Custom Glowing Cursor Effect
const cursorRing = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
  gsap.to(cursorRing, {
    duration: 0,
    x: e.clientX,
    y: e.clientY,
    ease: "power2.out"
  });
});

// Optional: Cursor Click Animation
window.addEventListener('mousedown', () => {
  gsap.to(cursorRing, {
    scale: 1.5,
    borderColor: "#ffffff",
    boxShadow: "0 0 15px #ffffff, 0 0 30px #ffffff",
    duration: 0.2,
    ease: "power2.out"
  });
});

window.addEventListener('mouseup', () => {
  gsap.to(cursorRing, {
    scale: 1,
    borderColor: "#0563bb",
    boxShadow: "0 0 10px #0563bb, 0 0 20px #0563bb",
    duration: 0.2,
    ease: "power2.out"
  });
});



})()