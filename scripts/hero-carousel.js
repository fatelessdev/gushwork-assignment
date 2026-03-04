/**
 * Hero Image Carousel Functionality
 * 
 * This module implements an interactive image carousel with:
 * - Thumbnail navigation for selecting images
 * - Previous/Next arrow controls
 * - Smooth fade transitions between images
 * - Integration with the zoom preview feature
 */
function initHeroCarousel() {
  const thumbs = document.querySelectorAll('#carouselThumbs .thumb');
  const mainImage = document.getElementById('mainImage');
  const zoomPreviewImg = document.getElementById('zoomPreviewImg');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  // Exit if required elements don't exist
  if (!thumbs.length || !mainImage) return;

  /**
   * Image data array - contains paths to main and zoom images
   * Using the same image for main and zoom (zoom shows magnified version)
   */
  const images = [
    { main: 'assets/images/fishnet-landing.png', zoom: 'assets/images/fishnet-landing.png' },
    { main: 'assets/images/fishnet.png', zoom: 'assets/images/fishnet.png' },
    { main: 'assets/images/fishnet-material.png', zoom: 'assets/images/fishnet-material.png' },
    { main: 'assets/images/landing-image.png', zoom: 'assets/images/landing-image.png' },
    { main: 'assets/images/fishnet-landing.png', zoom: 'assets/images/fishnet-landing.png' },
    { main: 'assets/images/fishnet.png', zoom: 'assets/images/fishnet.png' }
  ];

  let currentIndex = 0;

  /**
   * Update the carousel to display a new image
   * @param {number} index - The index of the image to display
   */
  function updateCarousel(index) {
    // Prevent unnecessary updates
    if (index === currentIndex) return;
    currentIndex = index;

    // Fade out, change image, then fade back in
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[index].main;
      // Update zoom preview image as well
      if (zoomPreviewImg) {
        zoomPreviewImg.src = images[index].zoom;
      }
      mainImage.style.opacity = '1';
    }, 200);

    // Update active thumbnail state
    thumbs.forEach((thumb) => thumb.classList.remove('active'));
    if (thumbs[index]) {
      thumbs[index].classList.add('active');
    }
  }

  /**
   * Add click handlers to thumbnail buttons
   */
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index, 10);
      updateCarousel(index);
    });
  });

  /**
   * Previous button: Navigate to the previous image (wraps around)
   */
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      updateCarousel(newIndex);
    });
  }

  /**
   * Next button: Navigate to the next image (wraps around)
   */
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      updateCarousel(newIndex);
    });
  }

  // Initialize zoom preview with the first image
  if (zoomPreviewImg) {
    zoomPreviewImg.src = images[0].zoom;
  }
}

