/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

// Email link protection
// (Email link is defined in index.html; no placeholder override needed.)

// Subtle Parallax Effect (disabled on mobile)
if (window.innerWidth > 768) {
    let parallaxTicking = false;
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    }
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
}
