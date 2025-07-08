// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cursor = document.querySelector('.cursor');
const contactForm = document.getElementById('contactForm');
const projectSlides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Typing Animation
const typingElement = document.querySelector('.typing');
const words = ['Developer', 'Designer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingElement.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(type, 50);
    } else {
        // Change word
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

// Project Slider
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    projectSlides.forEach(slide => {
        slide.classList.remove('active', 'next', 'prev');
    });

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Show current slide
    projectSlides[index].classList.add('active');

    // Set next and prev slides for animation
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

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Button navigation
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide change (optional)
// const slideInterval = setInterval(nextSlide, 5000);

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Form validation
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const message = this.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Animate skill bars when they come into view
const skills = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills-section');

function animateSkills() {
    if (isElementInViewport(skillSection)) {
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

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

if (skillSection) {
    window.addEventListener('scroll', animateSkills);
    // Trigger once on page load in case section is already in view
    animateSkills();
}

// Custom Cursor - Movement Only
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(type, 1000);

    // Initialize project slider if on projects page
    if (projectSlides.length > 0) {
        showSlide(0);
    }

    // Add animation class to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-in');

        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
