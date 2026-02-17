document.addEventListener('DOMContentLoaded', () => {
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            
            // Randomly assign orange or blue color
            if (Math.random() > 0.5) {
                particle.style.setProperty('--particle-color', '#00B2FF');
                particle.style.background = '#00B2FF';
            }
            
            particlesContainer.appendChild(particle);
        }
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (currentNav) currentNav.classList.add('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // Initial active nav update
    updateActiveNav();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Feature tabs functionality
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Initialize particles
    createParticles();

    // --- HERO TEXT ROTATION LOGIC ---
    const textSets = document.querySelectorAll('.text-set');
    let currentIndex = 0;
    let isAnimating = false;

    function wrapTextInSpans(element) {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char, i) => 
            `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    function animateTextIn(textSet) {
        const glitchText = textSet.querySelector('.glitch-text');
        const subtitle = textSet.querySelector('.subtitle');
        
        wrapTextInSpans(glitchText);
        glitchText.setAttribute('data-text', glitchText.textContent);
        
        setTimeout(() => {
            subtitle.classList.add('visible');
        }, 800);
    }

    function animateTextOut(textSet) {
        const chars = textSet.querySelectorAll('.char');
        const subtitle = textSet.querySelector('.subtitle');
        
        chars.forEach((char, i) => {
            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('out');
        });
        
        subtitle.classList.remove('visible');
    }

    function rotateText() {
        if (isAnimating || textSets.length === 0) return;
        isAnimating = true;

        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];

        animateTextOut(currentSet);

        setTimeout(() => {
            currentSet.classList.remove('active');
            nextSet.classList.add('active');
            animateTextIn(nextSet);
            
            currentIndex = nextIndex;
            isAnimating = false;
        }, 1000); 
    }

    // Start Hero Animation
    if (textSets.length > 0) {
        animateTextIn(textSets[0]); // Animate the first set immediately
        setInterval(rotateText, 5000); // Start the rotation interval
    }

    // --- MAP INITIALIZATION ---
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = L.map('map', {
            center: [8.997726, 38.843766],
            zoom: 16,
            scrollWheelZoom: false
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.circleMarker([8.997726, 38.843766], {
            radius: 12,
            fillColor: '#ff0000ff',
            color: '#00B2FF',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        marker.bindPopup("<b>Our Location</b><br>Selected Coordinates").openPopup();

        const overlay = document.querySelector('.map-overlay');
        if (overlay) {
            overlay.style.background = 'linear-gradient(45deg, transparent 40%, rgba(255,0,0,0.4) 50%, transparent 60%)';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.pointerEvents = 'none';
            overlay.style.animation = 'scan 3s linear infinite';
        }

        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`@keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }`, styleSheet.cssRules.length);
    }
});
// Select all tab buttons and content panels
const tabs = document.querySelectorAll(".tab-item");
const panels = document.querySelectorAll(".content-panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab;

        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Show the corresponding panel
        const panel = document.getElementById(target);
        if(panel){
            panel.classList.add("active");

            // Scroll to the panel smoothly
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
