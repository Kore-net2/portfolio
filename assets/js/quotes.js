// Quote rotation functionality
document.addEventListener('DOMContentLoaded', function() {
    const quoteWrapper = document.getElementById('quoteWrapper');
    if (!quoteWrapper) return;
    
    const quotes = quoteWrapper.querySelectorAll('.quote-item');
    let currentIndex = 0;
    
    // Rotate quotes every 8 seconds
    function rotateQuotes() {
        // Remove active class from current quote
        quotes[currentIndex].classList.remove('active');
        
        // Move to next quote (loop back to 0 if at end)
        currentIndex = (currentIndex + 1) % quotes.length;
        
        // Add active class to new quote
        quotes[currentIndex].classList.add('active');
    }
    
    // Start rotation
    setInterval(rotateQuotes, 8000);
});
