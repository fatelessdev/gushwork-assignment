/**
 * Industries Carousel Functionality
 * 
 * This module implements a horizontal scrolling carousel:
 * - Previous/Next arrow navigation
 * - Smooth scroll animation
 * - Displays industry application cards
 */
function initIndustriesCarousel() {
  const track = document.getElementById('industriesTrack');
  const prevBtn = document.getElementById('indPrev');
  const nextBtn = document.getElementById('indNext');
  
  // Exit if required elements don't exist
  if (!track || !prevBtn || !nextBtn) return;

  // Amount to scroll with each button click (card width + gap)
  const scrollAmount = 248;

  /**
   * Navigate to the previous set of cards
   */
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  /**
   * Navigate to the next set of cards
   */
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

