/**
 * Sticky Header Functionality
 * 
 * This module implements a sticky header that:
 * - Appears when scrolling beyond the first fold (hero section)
 * - Stays visible while scrolling down
 * - Hides when scrolling back up
 * - Uses smooth transitions for better UX
 */
function initStickyHeader() {
  const stickyHeader = document.getElementById('stickyHeader');
  const hero = document.getElementById('hero');
  
  // Exit if required elements don't exist
  if (!stickyHeader || !hero) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  let isVisible = false;

  /**
   * Handle scroll events with requestAnimationFrame for performance
   * Uses a flag to throttle scroll events
   */
  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      // Calculate the bottom position of the hero section
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Only process significant scroll changes (reduces jitter)
      if (scrollDelta < 5) {
        ticking = false;
        return;
      }

      // Show header when past hero section AND scrolling down
      if (currentScrollY > heroBottom && scrollingDown && !isVisible) {
        stickyHeader.classList.add('visible');
        stickyHeader.setAttribute('aria-hidden', 'false');
        isVisible = true;
      } 
      // Hide header when scrolling up OR when back within hero section
      else if ((!scrollingDown && isVisible) || currentScrollY <= heroBottom) {
        stickyHeader.classList.remove('visible');
        stickyHeader.setAttribute('aria-hidden', 'true');
        isVisible = false;
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });
  }

  // Add passive scroll listener for better performance
  window.addEventListener('scroll', onScroll, { passive: true });
}

