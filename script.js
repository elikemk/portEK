// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between bars and times
        const icon = mobileMenuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .contact-method').forEach(element => {
    observer.observe(element);
});

// Parallax effect for section numbers
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sectionNumbers = document.querySelectorAll('.section-number');

    sectionNumbers.forEach(number => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        number.style.transform = `translateY(${yPos}px)`;
    });
});

// Cursor trail effect (optional - modern touch)
const createCursorTrail = () => {
    if (window.innerWidth <= 768) return; // Disable on mobile

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(255, 51, 71, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    const animateCursor = () => {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * 0.1;
        cursorY += distY * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Scale up on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Initialize cursor trail (comment out if not desired)
// createCursorTrail();

// Scroll reveal animations for text elements
const revealText = () => {
    const textElements = document.querySelectorAll('.hero-title .line, .section-title .title-line');

    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';

        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Run reveal animation on page load
window.addEventListener('load', revealText);

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const number = this.querySelector('.project-number');
        if (number) {
            number.style.color = 'rgba(255, 51, 71, 0.3)';
            number.style.transition = 'color 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const number = this.querySelector('.project-number');
        if (number) {
            number.style.color = 'rgba(255, 51, 71, 0.1)';
        }
    });
});

// Add stagger animation to stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat');
            stats.forEach((stat, index) => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    stat.style.transition = 'all 0.6s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, index * 150);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Grid overlay animation
const gridOverlay = document.querySelector('.grid-overlay');
if (gridOverlay) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0.2, 0.5 - (scrolled / 1000));
        gridOverlay.style.opacity = opacity;
    });
}

// Log message
console.log('%c Portfolio Loaded Successfully! ', 'background: #FF3347; color: white; font-size: 16px; padding: 10px; font-weight: bold;');
console.log('%c Designed with passion and powered by creativity ', 'color: #FF3347; font-size: 12px;');
