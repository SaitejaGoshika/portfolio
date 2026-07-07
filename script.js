document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. THEME TOGGLE (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check for saved theme in localStorage, default to user's system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        bodyElement.classList.add('light-mode');
    } else {
        bodyElement.classList.remove('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('light-mode');
        const currentTheme = bodyElement.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', currentTheme);
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       3. HERO TYPEWRITER ANIMATION
       ========================================================================== */
    const typewriterSpan = document.getElementById('typewriter');
    if (typewriterSpan) {
        const words = JSON.parse(typewriterSpan.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Deleting is faster
            } else {
                typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120; // Natural typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at the end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       4. SCROLL PROGRESS & STICKY NAVBAR STATE
       ========================================================================== */
    const scrollProgressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    // Navigation sections mapping for active link highlight
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress Bar
        if (docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        }

        // Header scrolled state
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active link highlights
        let currentActiveSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        if (currentActiveSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to top click event
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       5. PROJECT FILTER SYSTEM
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons and add to current
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Add fade-in transition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       6. INTERSECTION OBSERVERS (COUNTERS & SKILL BARS)
       ========================================================================== */
    
    // 6a. Count-Up Stats Animation
    const statsNumbers = document.querySelectorAll('.stat-numberCount');
    
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'), 10);
                let startValue = 0;
                const duration = 1500; // Total count-up duration in ms
                const stepTime = Math.max(Math.floor(duration / targetValue), 10); // Interval step
                
                const counterInterval = setInterval(() => {
                    startValue += Math.ceil(targetValue / (duration / stepTime));
                    if (startValue >= targetValue) {
                        target.textContent = targetValue + (targetValue === 400 ? '+' : ''); // append suffix
                        clearInterval(counterInterval);
                    } else {
                        target.textContent = startValue;
                    }
                }, stepTime);
                
                observer.unobserve(target); // Animate only once
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => countUpObserver.observe(stat));

    // 6b. Skill Progress Bars Animation
    const skillProgressBars = document.querySelectorAll('.skill-bar-progress');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth;
                observer.unobserve(progressBar); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    skillProgressBars.forEach(bar => skillObserver.observe(bar));

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION (FORMSPREE INTEGRATION)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            // Check form validity (redundant safeguard)
            if (!contactForm.checkValidity()) return;

            e.preventDefault();
            
            // Set loading state
            formSubmitBtn.disabled = true;
            const originalBtnHtml = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;
            
            // Retrieve action URL (user will configure this in actual file, else use placeholder logic)
            const actionUrl = contactForm.getAttribute('action');

            if (actionUrl.includes('placeholder-id')) {
                // If the user hasn't configured Formspree ID, simulate and guide them
                setTimeout(() => {
                    formStatus.className = 'form-status-msg error';
                    formStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>Configuration Required:</strong> Formspree ID is currently a placeholder. Please refer to instructions in the README.md to hook up your own email target.`;
                    
                    formSubmitBtn.disabled = false;
                    formSubmitBtn.innerHTML = originalBtnHtml;
                }, 1000);
                return;
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.className = 'form-status-msg success';
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.`;
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    formStatus.className = 'form-status-msg error';
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Oops! Something went wrong: ${errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'unknown server error'}`;
                }
            } catch (error) {
                formStatus.className = 'form-status-msg error';
                formStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Network failure. Check your connection and try again.`;
            } finally {
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
});
