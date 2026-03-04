/**
 * Main Application Entry Point
 * 
 * This script initializes all interactive components when the DOM is ready.
 * Each component is initialized by calling its respective init function.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize sticky header behavior
  initStickyHeader();
  
  // Initialize hero image carousel
  initHeroCarousel();
  
  // Initialize image zoom functionality
  initImageZoom();
  
  // Initialize FAQ accordion
  initFAQAccordion();
  
  // Initialize manufacturing process tabs
  initManufacturingTabs();
  
  // Initialize testimonials carousel
  initTestimonialsCarousel();
  
  // Initialize industries carousel
  initIndustriesCarousel();
  
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize form handling
  initForms();
});

/**
 * Form Handling
 * 
 * Prevents default form submission for demo purposes.
 * In production, this would handle form validation and submission.
 */
function initForms() {
  document.querySelectorAll('.catalogue-form, .quote-form').forEach(form => {
    form.addEventListener('submit', (e) => e.preventDefault());
  });
}
