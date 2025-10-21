// KNBR Marketing Agency - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Force cursor styles via JavaScript - RADICAL APPROACH
    function applyCursorStyles() {
        console.log('🔧 Applying RADICAL cursor styles...');
        
        // Force cursor on all interactive elements - RADICAL
        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .faq-question, .play-button, .form-submit');
        interactiveElements.forEach(element => {
            // Apply to element itself
            element.style.cursor = 'pointer';
            element.style.setProperty('cursor', 'pointer', 'important');
            
            // Apply to ALL descendants (not just direct children)
            const allDescendants = element.querySelectorAll('*');
            allDescendants.forEach(descendant => {
                descendant.style.cursor = 'pointer';
                descendant.style.setProperty('cursor', 'pointer', 'important');
            });
            
            // Also apply via CSS class
            element.classList.add('force-pointer-cursor');
        });
        
        // Force text cursor on form inputs - RADICAL
        const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea');
        formInputs.forEach(input => {
            // Apply to element itself
            input.style.cursor = 'text';
            input.style.setProperty('cursor', 'text', 'important');
            
            // Apply to ALL descendants
            const allDescendants = input.querySelectorAll('*');
            allDescendants.forEach(descendant => {
                descendant.style.cursor = 'text';
                descendant.style.setProperty('cursor', 'text', 'important');
            });
            
            // Also apply via CSS class
            input.classList.add('force-text-cursor');
        });
        
        console.log('✅ RADICAL cursor styles applied to', interactiveElements.length, 'interactive elements');
        console.log('✅ RADICAL cursor styles applied to', formInputs.length, 'form inputs');
    }
    
    // Apply cursor styles immediately
    applyCursorStyles();
    
    // Apply cursor styles after a short delay to ensure DOM is ready
    setTimeout(applyCursorStyles, 100);
    setTimeout(applyCursorStyles, 500);
    setTimeout(applyCursorStyles, 1000);
    
    // Apply cursor styles when window loads
    window.addEventListener('load', applyCursorStyles);
    
    // Apply cursor styles when DOM changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setTimeout(applyCursorStyles, 50);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    console.log('Nav toggle element:', navToggle);
    console.log('Nav menu element:', navMenu);
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            console.log('Toggle clicked');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on load

    // Solutions tabs functionality
    const solutionTabs = document.querySelectorAll('.solution-tab');
    const solutionContents = document.querySelectorAll('.solution-content');
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            solutionTabs.forEach(btn => btn.classList.remove('active'));
            solutionContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetTabElement = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetTabElement) {
                targetTabElement.classList.add('active');
            }
        });
    });

    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.feature-card, .solution-card, .case-card, .process-step');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // Chart bars animation
    const chartBars = document.querySelectorAll('.chart-bar');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
                chartObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => chartObserver.observe(bar));

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Form handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Спасибо! Ваше сообщение отправлено.');
            
            // Reset form
            this.reset();
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Header background change on scroll
    const header = document.querySelector('.nav');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'white';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Video functionality
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            console.log('Playing video:', videoId);
            
            // Здесь можно добавить логику для открытия модального окна с видео
            // или перенаправления на YouTube/Vimeo
            alert(`Воспроизведение видео: ${videoId}\n\nВ реальной версии здесь будет открыто видео или модальное окно с плеером.`);
        });
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Consultation form handling
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.form-submit');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            // Show loading state
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                problem: formData.get('problem')
            };
            
            console.log('Form submitted:', data);
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Show success message
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 30 минут.');
                
                // Reset form
                this.reset();
            }, 2000);
        });
        
        // Phone number formatting
        const phoneInput = consultationForm.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 1) {
                        value = '+7 (' + value;
                    } else if (value.length <= 4) {
                        value = '+7 (' + value.slice(1);
                    } else if (value.length <= 7) {
                        value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4);
                    } else if (value.length <= 9) {
                        value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
                    } else {
                        value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
                    }
                }
                e.target.value = value;
            });
        }
    }
});