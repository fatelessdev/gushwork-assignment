/**
 * Testimonials Carousel Functionality
 * 
 * This module implements a testimonials slider:
 * - Dot navigation for slide selection
 * - Touch/swipe support for mobile devices
 * - Smooth transform-based transitions
 */
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.querySelectorAll('#testimonialsDots .dot');
  
  // Exit if required elements don't exist
  if (!track || !dots.length) return;

  let currentSlide = 0;

  /**
   * Navigate to a specific slide
   * @param {number} index - The slide index to navigate to
   */
  function goToSlide(index) {
    const cards = track.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    currentSlide = index;

    // Calculate scroll position based on card width and gap
    const card = cards[0];
    const gap = 24;
    const scrollAmount = index * (card.offsetWidth + gap);
    track.style.transform = `translateX(-${scrollAmount}px)`;

    // Update active dot indicator
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  // Add click handlers to dot navigation
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide, 10));
    });
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;

  /**
   * Track touch start position
   */
  track.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  /**
   * Handle touch end - determine swipe direction and navigate
   */
  track.addEventListener('touchend', (event) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) <= threshold) return;
    
    // Swipe left - go to next slide
    if (diff > 0 && currentSlide < dots.length - 1) {
      goToSlide(currentSlide + 1);
      return;
    }

    // Swipe right - go to previous slide
    if (diff < 0 && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, { passive: true });
}

