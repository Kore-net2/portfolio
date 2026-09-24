console.log("main.js loaded on", window.location.pathname);

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) console.log("keydown:", e.key);
});

/* ============================================
   MAIN JAVASCRIPT - SHARED ACROSS ALL PAGES
   ============================================ */

// Easter Egg - Matrix Mode (Type "matrix" anywhere on the page)
(function() {
    let typedKeys = '';
    let matrixActive = false;
    const secretWord = 'matrix';
    let rainInterval;

    // Auto-activate if it was active on a previous page
    if (sessionStorage.getItem('easterEgg') === 'matrix') {
        document.addEventListener('DOMContentLoaded', () => activateMatrixMode());
    }

    document.addEventListener('keydown', (e) => {
        // Only track letter keys
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            typedKeys += e.key.toLowerCase();
            
            // Keep only last 10 characters
            if (typedKeys.length > 10) {
                typedKeys = typedKeys.slice(-10);
            }
            
            // Check if secret word is typed
            if (typedKeys.includes(secretWord)) {
                activateMatrixMode();
                typedKeys = '';
            }
        }
    });

    function createBinaryRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0.2;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? '1' : '0';
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        rainInterval = setInterval(draw, 33);
        return canvas;
    }

    function activateMatrixMode() {
        if (matrixActive) return;
        matrixActive = true;
        const isFirstActivation = !sessionStorage.getItem('easterEgg');
        sessionStorage.setItem('easterEgg', 'matrix');

        // Create binary rain
        const canvas = createBinaryRain();

        // Only show notification on the page where it was first triggered
        const notification = document.createElement('div');
        if (isFirstActivation) {
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: linear-gradient(135deg, rgba(0, 40, 20, 0.95), rgba(0, 20, 10, 0.95));
                color: #00ff41;
                padding: 1.2rem 1.8rem;
                border: 2px solid #00ff41;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                z-index: 99999;
                box-shadow: 
                    0 0 30px rgba(0, 255, 65, 0.4),
                    inset 0 0 20px rgba(0, 255, 65, 0.1);
                animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1), pulse 2s ease-in-out infinite;
                backdrop-filter: blur(10px);
            `;
            notification.innerHTML = `
                <div style="font-size: 1rem; margin-bottom: 0.5rem; font-weight: bold;">⚠️ SYSTEM BREACH DETECTED</div>
                <div style="opacity: 0.8; font-size: 0.8rem;">Press ESC to restore system</div>
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => notification.remove(), 600);
            }, 5000);
        }

        // Store original colors for restoration
        const originalStyles = new Map();
        
        // Apply polished Matrix theme
        document.body.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.background = 'linear-gradient(135deg, #000000 0%, #001a0d 100%)';
        document.body.style.color = '#00ff41';
        
        // Transform all elements with smooth transitions
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el !== notification && !notification.contains(el) && el !== canvas) {
                // Store original styles
                originalStyles.set(el, {
                    color: el.style.color,
                    backgroundColor: el.style.backgroundColor,
                    textShadow: el.style.textShadow,
                    borderColor: el.style.borderColor,
                    boxShadow: el.style.boxShadow
                });
                
                el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.color = '#00ff41';
                el.style.textShadow = '0 0 8px rgba(0, 255, 65, 0.6)';
                
                // Dark backgrounds with glass effect
                const bgColor = window.getComputedStyle(el).backgroundColor;
                if (bgColor !== 'rgba(0, 0, 0, 0)' && el.tagName !== 'NAV' && !el.closest('nav')) {
                    el.style.backgroundColor = 'rgba(0, 26, 13, 0.6)';
                    el.style.backdropFilter = 'blur(10px)';
                }
                
                // Glowing green borders
                if (window.getComputedStyle(el).borderColor) {
                    el.style.borderColor = '#00ff41';
                }
                
                // Add glow to cards and buttons
                if (el.classList.contains('card') || el.tagName === 'BUTTON' || el.tagName === 'A') {
                    el.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
                }
            }
        });

        // Update CSS variables with bright Matrix green
        document.documentElement.style.setProperty('--wine', '#00ff41');
        document.documentElement.style.setProperty('--wine-light', '#33ff66');
        document.documentElement.style.setProperty('--wine-dark', '#00cc33');
        document.documentElement.style.setProperty('--cream', '#000000');
        document.documentElement.style.setProperty('--charcoal', '#00ff41');
        document.documentElement.style.setProperty('--gray', '#00cc33');
        document.documentElement.style.setProperty('--light-gray', '#003319');

        // Add polished effects with creepy touches
        const style = document.createElement('style');
        style.id = 'matrix-style';
        style.textContent = `
            @keyframes slideInRight {
                from { 
                    transform: translateX(400px);
                    opacity: 0;
                }
                to { 
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from { 
                    transform: translateX(0);
                    opacity: 1;
                }
                to { 
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    box-shadow: 0 0 30px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1);
                }
                50% {
                    box-shadow: 0 0 40px rgba(0, 255, 65, 0.6), inset 0 0 30px rgba(0, 255, 65, 0.2);
                }
            }
            
            /* Note cards use linear-gradient so need explicit override */
            .note-card {
                background: rgba(0, 26, 13, 0.6) !important;
                border-color: #00ff41 !important;
            }

            /* Subtle scanline effect */
            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    rgba(0, 255, 65, 0.02),
                    rgba(0, 255, 65, 0.02) 1px,
                    transparent 1px,
                    transparent 3px
                );
                pointer-events: none;
                z-index: 9999;
                animation: scanline 10s linear infinite;
            }
            
            @keyframes scanline {
                0% { transform: translateY(0); }
                100% { transform: translateY(15px); }
            }
            
            /* Creepy screen flicker (subtle) */
            body {
                animation: flicker 3s infinite;
            }
            
            @keyframes flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.98; }
                50.1% { opacity: 1; }
                50.2% { opacity: 0.99; }
            }
            
            /* Smooth glow pulse on interactive elements */
            a:hover, button:hover {
                text-shadow: 0 0 15px rgba(0, 255, 65, 0.9) !important;
                transform: translateY(-2px);
                transition: all 0.3s ease !important;
            }
            
            /* Enhanced image effects */
            img {
                filter: hue-rotate(80deg) saturate(1.5) brightness(0.8) contrast(1.1) !important;
                box-shadow: 0 0 30px rgba(0, 255, 65, 0.4) !important;
                transition: all 0.5s ease !important;
            }
            
            img:hover {
                filter: hue-rotate(80deg) saturate(1.8) brightness(0.9) contrast(1.2) !important;
                box-shadow: 0 0 40px rgba(0, 255, 65, 0.6) !important;
            }
            
            /* Glowing scrollbar */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: #000;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #00ff41;
                border-radius: 5px;
                box-shadow: 0 0 10px #00ff41;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #33ff66;
            }
            
            /* Selection color */
            ::selection {
                background: rgba(0, 255, 65, 0.3);
                color: #00ff41;
            }
            
            /* Creepy crosshair cursor */
            * {
                cursor: crosshair !important;
            }
            
            a, button {
                cursor: pointer !important;
            }
        `;
        document.head.appendChild(style);

        // Store for cleanup
        canvas._originalStyles = originalStyles;

        // Press ESC to exit
        const exitHandler = (e) => {
            if (e.key === 'Escape') {
                clearInterval(rainInterval);
                canvas.remove();
                if (notification && notification.parentNode) notification.remove();
                
                const styleEl = document.getElementById('matrix-style');
                if (styleEl) styleEl.remove();
                
                document.body.style.background = '';
                document.body.style.color = '';
                document.body.style.animation = '';
                
                // Re-apply dark mode background if needed
                if (document.body.classList.contains('dark-mode')) {
                    document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)';
                }
                
                // Restore original styles smoothly
                allElements.forEach(el => {
                    const original = originalStyles.get(el);
                    if (original) {
                        el.style.color = original.color;
                        el.style.backgroundColor = original.backgroundColor;
                        el.style.textShadow = original.textShadow;
                        el.style.borderColor = original.borderColor;
                        el.style.boxShadow = original.boxShadow;
                        el.style.backdropFilter = '';
                    }
                });

                // Restore CSS variables — respect dark mode if active
                const isDark = document.body.classList.contains('dark-mode');
                document.documentElement.style.setProperty('--wine', isDark ? '#b8324f' : '#7d1e3e');
                document.documentElement.style.setProperty('--wine-light', isDark ? '#cc4a63' : '#9d3a5a');
                document.documentElement.style.setProperty('--wine-dark', isDark ? '#9a2340' : '#5a1529');
                document.documentElement.style.setProperty('--cream', isDark ? '#1a1a1a' : '#faf8f5');
                document.documentElement.style.setProperty('--charcoal', isDark ? '#e8e6e3' : '#2a2a2a');
                document.documentElement.style.setProperty('--gray', isDark ? '#a0a0a0' : '#6a6a6a');
                document.documentElement.style.setProperty('--light-gray', isDark ? '#2e2e2e' : '#e8e6e3');
                
                matrixActive = false;
                sessionStorage.removeItem('easterEgg');
                document.removeEventListener('keydown', exitHandler);
            }
        };
        document.addEventListener('keydown', exitHandler);
    }
})();

// Easter Egg - Birthday Mode (Type "birthday" or auto-activates on August 26)
(function() {
    let typedKeys = '';
    let birthdayActive = false;
    const secretWord = 'birthday';
    let confettiInterval;

    // Check if it's the user's birthday (August 26)
    function isBirthday() {
        const today = new Date();
        return today.getMonth() === 7 && today.getDate() === 26; // Month is 0-indexed
    }

    // Auto-activate birthday mode on birthday
    if (isBirthday()) {
        setTimeout(() => {
            activateBirthdayMode(true);
        }, 1500);
    }

    // Auto-activate if it was active on a previous page
    if (sessionStorage.getItem('easterEgg') === 'birthday') {
        document.addEventListener('DOMContentLoaded', () => activateBirthdayMode(false));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            typedKeys += e.key.toLowerCase();
            
            if (typedKeys.length > 10) {
                typedKeys = typedKeys.slice(-10);
            }
            
            if (typedKeys.includes(secretWord)) {
                activateBirthdayMode(false);
                typedKeys = '';
            }
        }
    });

    function createConfetti() {
        const canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99998;
            pointer-events: none;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const confettiPieces = [];
        const confettiCount = 150;
        
        // Classy colors - gold, champagne, cream, rose gold
        const colors = ['#D4AF37', '#F5DEB3', '#FFD700', '#E6C8A5', '#C9A380', '#B76E79'];

        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 4 - 2;
                this.opacity = 1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                
                // Fade out near bottom
                if (this.y > canvas.height - 100) {
                    this.opacity -= 0.01;
                }

                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                    this.opacity = 1;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        // Create confetti pieces
        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push(new ConfettiPiece());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.forEach(piece => {
                piece.update();
                piece.draw();
            });
            confettiInterval = requestAnimationFrame(animate);
        }

        animate();
        return canvas;
    }

    function activateBirthdayMode(isAutomatic) {
        if (birthdayActive) return;
        birthdayActive = true;
        sessionStorage.setItem('easterEgg', 'birthday');

        // Create elegant confetti
        const canvas = createConfetti();

        // Store original styles
        const originalStyles = new Map();
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            if (el !== canvas) {
                originalStyles.set(el, {
                    color: el.style.color,
                    textShadow: el.style.textShadow,
                    borderColor: el.style.borderColor
                });
            }
        });

        // Apply elegant gold tint
        allElements.forEach(el => {
            if (el !== canvas) {
                el.style.transition = 'all 1s ease';
                
                // Subtle gold tint to text
                if (window.getComputedStyle(el).color === 'rgb(125, 30, 62)') { // wine color
                    el.style.color = '#C9A380';
                    el.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                }
                
                // Gold borders
                if (window.getComputedStyle(el).borderColor) {
                    el.style.borderColor = '#D4AF37';
                }
            }
        });

        // Update CSS variables with elegant gold
        document.documentElement.style.setProperty('--wine', '#C9A380');
        document.documentElement.style.setProperty('--wine-light', '#E6C8A5');
        document.documentElement.style.setProperty('--wine-dark', '#B08968');

        // Add elegant animations
        const style = document.createElement('style');
        style.id = 'birthday-style';
        style.textContent = `
            /* Subtle gold shimmer on hover */
            a:hover, button:hover {
                text-shadow: 0 0 15px rgba(212, 175, 55, 0.6) !important;
                transition: all 0.3s ease !important;
            }
            
            /* Elegant image enhancement */
            img {
                filter: sepia(0.1) brightness(1.05) !important;
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.2) !important;
                transition: all 0.5s ease !important;
            }
        `;
        document.head.appendChild(style);

        canvas._originalStyles = originalStyles;

        // Press ESC to exit
        const exitHandler = (e) => {
            if (e.key === 'Escape') {
                cancelAnimationFrame(confettiInterval);
                canvas.remove();
                
                const styleEl = document.getElementById('birthday-style');
                if (styleEl) styleEl.remove();
                
                // Restore original styles
                allElements.forEach(el => {
                    const original = originalStyles.get(el);
                    if (original) {
                        el.style.color = original.color;
                        el.style.textShadow = original.textShadow;
                        el.style.borderColor = original.borderColor;
                    }
                });

                // Restore CSS variables — respect dark mode if active
                const isDark = document.body.classList.contains('dark-mode');
                document.documentElement.style.setProperty('--wine', isDark ? '#b8324f' : '#7d1e3e');
                document.documentElement.style.setProperty('--wine-light', isDark ? '#cc4a63' : '#9d3a5a');
                document.documentElement.style.setProperty('--wine-dark', isDark ? '#9a2340' : '#5a1529');
                
                birthdayActive = false;
                sessionStorage.removeItem('easterEgg');
                document.removeEventListener('keydown', exitHandler);
            }
        };
        
        document.addEventListener('keydown', exitHandler);
    }
})();

// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// Scroll Progress Indicator
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                scrollProgress.style.width = progress + '%';
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard accessibility for back to top
    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Enhanced Card Reveal on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards and sections after page load
setTimeout(() => {
    // Observe cards
    document.querySelectorAll('.card, .project-card, .entry, .note-card').forEach(card => {
        observer.observe(card);
    });

    // Enhanced section transitions
    document.querySelectorAll('section h2').forEach(heading => {
        observer.observe(heading);
    });

    // Observe activity and campus role items
    document.querySelectorAll('.activity-item, .campus-role-item').forEach(item => {
        observer.observe(item);
    });
}, 1000);

// Section Progress Indicator
const sections = document.querySelectorAll('section[id]');
let currentSection = '';

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (currentSection !== section.id) {
                currentSection = section.id;
                // Add subtle animation to section when in view
                section.style.transition = 'all 0.3s ease';
            }
        }
    });
});