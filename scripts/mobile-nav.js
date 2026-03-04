/**
 * Mobile Navigation Functionality
 * 
 * This module implements responsive mobile navigation:
 * - Hamburger menu toggle for mobile devices
 * - Overlay menu with smooth transitions
 * - Closes menu when clicking outside or on links
 * - Updates aria-expanded for accessibility
 */
function initMobileNav() {
  const hamburgers = document.querySelectorAll('.hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  
  // Exit if required elements don't exist
  if (hamburgers.length === 0 || !overlay) return;

  /**
   * Close the mobile menu
   * Removes active states and updates accessibility attributes
   */
  function closeMenu() {
    overlay.classList.remove('open');
    hamburgers.forEach((hamburger) => {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Toggle the mobile menu open/closed
   */
  function toggleMenu() {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      closeMenu();
      return;
    }

    // Open the menu
    overlay.classList.add('open');
    hamburgers.forEach((hamburger) => {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    });
  }

  // Add click handler to all hamburger buttons
  hamburgers.forEach((hamburger) => {
    hamburger.addEventListener('click', toggleMenu);
  });

  // Close menu when clicking any navigation link
  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const isHamburgerClicked = Array.from(hamburgers).some((hamburger) => hamburger.contains(event.target));
    if (!overlay.contains(event.target) && !isHamburgerClicked) {
      closeMenu();
    }
  });
}

