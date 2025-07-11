document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const cursor = document.querySelector('.cursor');
    const contactForm = document.getElementById('contactForm');
    const projectSlides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const typingElement = document.querySelector('.typing');
    const skillSection = document.querySelector('.skills-section');
    const skills = document.querySelectorAll('.skill-progress');

    // Mobile Navigation
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Custom Cursor - Movement Only
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Typing Animation
    if (typingElement) {
        const words = ['Developer', 'Designer', 'Problem Solver', 'Tech Enthusiast'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingElement.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1000);
            }
        }
        setTimeout(type, 1000);
    }

    // Project Slider
    if (projectSlides.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;

        function showSlide(index) {
            projectSlides.forEach(slide => {
                slide.classList.remove('active', 'next', 'prev');
            });

            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');

            projectSlides[index].classList.add('active');

            const nextIndex = (index + 1) % projectSlides.length;
            const prevIndex = (index - 1 + projectSlides.length) % projectSlides.length;

            projectSlides[nextIndex].classList.add('next');
            projectSlides[prevIndex].classList.add('prev');

            currentSlide = index;
        }

        function nextSlide() {
            const newIndex = (currentSlide + 1) % projectSlides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            const newIndex = (currentSlide - 1 + projectSlides.length) % projectSlides.length;
            showSlide(newIndex);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        showSlide(0);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate skill bars when they come into view
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function animateSkills() {
        if (skillSection && isElementInViewport(skillSection)) {
            skills.forEach(skill => {
                const width = skill.style.width;
                skill.style.width = '0';
                setTimeout(() => {
                    skill.style.width = width;
                }, 100);
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }

    if (skillSection) {
        window.addEventListener('scroll', animateSkills);
        animateSkills();
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-in');

        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Lightbox functionality
    const mediaItems = document.querySelectorAll('.media-item img, .media-item iframe, .hero-image img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
        </div>
    `;

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    mediaItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const clone = item.cloneNode(true);

            // Clear previous content
            while (lightboxContent.firstChild) {
                lightboxContent.removeChild(lightboxContent.firstChild);
            }

            // Add close button and new content
            lightboxContent.appendChild(clone);
            lightboxContent.appendChild(lightboxClose);

            // Handle iframe resizing
            if (clone.tagName === 'IFRAME') {
                clone.style.width = '800px';
                clone.style.height = '450px';
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
