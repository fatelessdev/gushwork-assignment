/**
 * Testimonials Carousel Functionality
 * 
 * This module enables smooth horizontal scroll navigation for testimonials:
 * - Uses native scroll with smooth behavior
 * - Touch/swipe support for mobile devices
 * - Scrolls one card at a time on swipe
 */
function initTestimonialsCarousel() {
  const grid = document.querySelector('.testimonials-grid');
  
  // Exit if the grid container doesn't exist
  if (!grid) return;

  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;

  /**
   * Track touch start position
   */
  grid.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  /**
   * Handle touch end - determine swipe direction and scroll one card
   */
  grid.addEventListener('touchend', (event) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) <= threshold) return;

    const card = grid.querySelector('.testimonial-card');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24; // card width + gap

    // Swipe left - scroll right
    if (diff > 0) {
      grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      return;
    }

    // Swipe right - scroll left
    if (diff < 0) {
      grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, { passive: true });
}

