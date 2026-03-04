/**
 * FAQ Accordion Functionality
 * 
 * This module implements an accordion-style FAQ section:
 * - Only one FAQ item can be open at a time
 * - Clicking an open item closes it
 * - Uses aria-expanded for accessibility
 * - Smooth height animation via max-height transition
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Exit if no FAQ items exist
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Skip if elements are missing
    if (!button || !answer) return;

    /**
     * Handle FAQ item click
     * Closes other items and toggles the clicked item
     */
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherButton && otherAnswer && otherItem !== item) {
          otherButton.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle the clicked item
      if (isOpen) {
        button.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        button.setAttribute('aria-expanded', 'true');
        // Add a small buffer to avoid sub-pixel clipping on expanded content.
        answer.style.maxHeight = `${answer.scrollHeight + 24}px`;
      }
    });
  });
}

