// ========================================
// ZDRAVKO - APLIKACIJA ZA ZDRAVSTVO
// Glavni JavaScript fajl
// ========================================

// ========================================
// INICIJALIZACIJA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicijalizacija navigacije
    initializeNavigation();
    
    // Inicijalizacija animacija
    initializeAnimations();

    
    // Inicijalizacija statistike (ako je na stranici)
    if (document.querySelector('.stat-number')) {
        initializeStats();
    }
    
    // Inicijalizacija FAQ (ako je na stranici)
    if (document.querySelector('[id^="faq-content"]')) {
        initializeFAQ();
    }
}

// ========================================
// NAVIGACIJA
// ========================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Meni header
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Glatko skrolanje
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========================================
// ANIMACIJE
// ========================================

function initializeAnimations() {
    // Fade in animacija
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// ALERT PROZORI
// ========================================

function showDownloadAlert(platform = '') {
    const message = platform 
        ? `Preuzimanje ${platform} verzije aplikacije Zdravko uskoro će biti dostupno!`
        : 'Preuzimanje aplikacije Zdravko uskoro će biti dostupno!';
    
    alert(message + '\n\nPratite naše društvene mreže za najnovije informacije o lansiranju.');
}

function showPrivacyAlert() {
    alert('Politika privatnosti:\n\nZdravko se obvezuje zaštititi vaše osobne podatke u skladu s GDPR-om.\nVaši podaci su enkriptirani i dostupni samo vama i vašem liječniku.\nNikada ne dijelimo vaše podatke s trećim stranama.');
}

function showDemoAlert() {
    alert('Demo video uskoro dostupan!\n\nRadimo na detaljnom video prikazu svih funkcionalnosti aplikacije Zdravko.');
}

function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validacija
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Molimo ispunite sva obavezna polja!');
        return;
    }
    
    // Simulacija slanja
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Slanje...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Hvala na poruci! Javit ćemo vam se u najkraćem mogućem roku.');
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}


// ========================================
// STATISTIKA
// ========================================

function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ========================================
// FAQ
// ========================================

function initializeFAQ() {
    // FAQ se inicira sa toggleFAQ funcijom
}

function toggleFAQ(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    if (content && icon) {
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        } else {
            content.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// ========================================
// DODATNE FUNKCIONALNOSTI
// ========================================

// Vrati se na vrh gumb
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563EB, #10B981);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
        }
    });
}

// Pokretanje gumba za vračanje na početak
createScrollToTopButton();

// Loading animacija
function showLoadingButton(button, duration = 2000) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Učitavanje...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, duration);
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#DC2626';
            isValid = false;
        } else {
            field.style.borderColor = '#E5E7EB';
        }
    });
    
    return isValid;
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('hr-HR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(date));
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    
    
    // Arrow keys for navigation
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Console log 
console.log('%cZdravko - Aplikacija za zdravstvo', 'color: #2563EB; font-size: 20px; font-weight: bold;');
console.log('%cRazvijeno na Veleučilištu u Rijeci', 'color: #10B981; font-size: 14px;');
