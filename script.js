// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Code Editor File Tab Switching Functionality
const tabs = document.querySelectorAll('.tab');
const codeAnimation = document.querySelector('.code-animation');
const lineNumbers = document.querySelector('.line-numbers');

// Different file contents for each tab
// Updated file contents with shorter text
const fileContents = {
    'main.js': {
        lines: [
            { content: '// 🚀 Welcome to my portfolio', type: 'comment' },
            { content: 'const <span class="variable">dev</span> = {', type: 'keyword' },
            { content: '  <span class="key">name</span>: <span class="string">\'Nader Elnagar\'</span>,', type: 'property' },
            { content: '  <span class="key">role</span>: <span class="string">\'Software Engineer\'</span>,', type: 'property' },
            { content: '  <span class="key">location</span>: <span class="string">\'Egypt 🇪🇬\'</span>,', type: 'property' },
            { content: '  <span class="key">skills</span>: [<span class="string">\'C#\'</span>, <span class="string">\'JS\'</span>, <span class="string">\'Python\'</span>],', type: 'property' },
            { content: '  <span class="key">frameworks</span>: [<span class="string">\'.NET\'</span>, <span class="string">\'React\'</span>],', type: 'property' },
            { content: '  <span class="key">passion</span>: <span class="string">\'Innovation\'</span>,', type: 'property' },
            { content: '  <span class="key">graduation</span>: <span class="number">2025</span>,', type: 'property' },
            { content: '  <span class="key">status</span>: <span class="string">\'Ready! 💻\'</span>', type: 'property' },
            { content: '};', type: 'keyword' },
            { content: '<span class="method">console</span>.<span class="method">log</span>(<span class="variable">dev</span>);', type: 'function' }
        ],
        lineCount: 12
    },
    'config.json': {
        lines: [
            { content: '{', type: 'keyword' },
            { content: '  <span class="key">"name"</span>: <span class="string">"nader-portfolio"</span>,', type: 'property' },
            { content: '  <span class="key">"version"</span>: <span class="string">"2.0.0"</span>,', type: 'property' },
            { content: '  <span class="key">"author"</span>: <span class="string">"Nader Elnagar"</span>,', type: 'property' },
            { content: '  <span class="key">"tech"</span>: [', type: 'property' },
            { content: '    <span class="string">"HTML5"</span>, <span class="string">"CSS3"</span>,', type: 'property' },
            { content: '    <span class="string">"JavaScript"</span>, <span class="string">"C#"</span>', type: 'property' },
            { content: '  ],', type: 'property' },
            { content: '  <span class="key">"status"</span>: <span class="string">"active"</span>,', type: 'property' },
            { content: '  <span class="key">"year"</span>: <span class="number">2025</span>', type: 'property' },
            { content: '}', type: 'keyword' }
        ],
        lineCount: 11
    },
    'README.md': {
        lines: [
            { content: '# 🚀 Nader Portfolio', type: 'comment' },
            { content: '', type: 'property' },
            { content: '## 👨‍💻 About Me', type: 'comment' },
            { content: 'Software Engineer passionate', type: 'property' },
            { content: 'about modern technologies.', type: 'property' },
            { content: '', type: 'property' },
            { content: '### 🛠️ Skills', type: 'comment' },
            { content: '- **Backend:** C#, .NET, Python', type: 'property' },
            { content: '- **Frontend:** JS, React, HTML', type: 'property' },
            { content: '- **Database:** PostgreSQL, MongoDB', type: 'property' },
            { content: '', type: 'property' },
            { content: '📍 **Location:** Egypt 🇪🇬', type: 'property' }
        ],
        lineCount: 12
    }
};
// Function to update line numbers based on file content
function updateLineNumbers(count) {
    if (!lineNumbers) return;
    
    lineNumbers.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        lineNumbers.appendChild(span);
    }
}

// Function to switch between different file contents
function switchFile(fileName) {
    const file = fileContents[fileName];
    if (!file || !codeAnimation) return;

    // Clear current content with fade out effect
    codeAnimation.style.opacity = '0';
    
    setTimeout(() => {
        // Clear and rebuild content
        codeAnimation.innerHTML = '';
        
        // Update line numbers
        updateLineNumbers(file.lineCount);

        // Add new content with staggered animation
        file.lines.forEach((line, index) => {
            const div = document.createElement('div');
            div.className = `code-line ${line.type}`;
            div.innerHTML = line.content;
            div.style.animationDelay = `${(index + 1) * 0.1}s`;
            div.style.opacity = '0';
            codeAnimation.appendChild(div);
        });

        // Fade in new content
        codeAnimation.style.opacity = '1';
        
        // Trigger animations
        setTimeout(() => {
            const codeLines = codeAnimation.querySelectorAll('.code-line');
            codeLines.forEach(line => {
                line.style.opacity = '1';
            });
        }, 100);
        
    }, 200);
}

// Add click event listeners to file tabs
if (tabs.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Switch to selected file content
            switchFile(tab.textContent);
            
            // Add click effect
            tab.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tab.style.transform = '';
            }, 150);
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change navbar background based on scroll
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide/show navbar on scroll (optional enhancement)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Special animation for stats counters
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.skill-category, .project-card, .stat, .contact-method').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalNumber = numberElement.textContent;
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentNumber = 0;
    const increment = numericValue / 30;
    const suffix = finalNumber.replace(/\d/g, '');
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 50);
}

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill tag hover effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Social link enhanced interactions
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-4px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to elements
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initialize line numbers for default file
    if (codeAnimation && lineNumbers) {
        updateLineNumbers(fileContents['main.js'].lineCount);
    }
    
    // Set initial active nav link
    if (window.location.hash) {
        const activeLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }
});

// Handle page visibility change (pause animations when tab is not active)
document.addEventListener('visibilitychange', () => {
    const codeEditor = document.querySelector('.code-editor');
    if (document.hidden) {
        codeEditor?.style.setProperty('--animation-play-state', 'paused');
    } else {
        codeEditor?.style.setProperty('--animation-play-state', 'running');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Arrow keys for tab navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[nextIndex].click();
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based functionality can go here
}, 16)); // ~60fps

console.log('🚀 Portfolio initialized successfully!');
console.log('📅 Script loaded on:', new Date().toLocaleString());
console.log('👨‍💻 Welcome to Nader\'s Portfolio!');
