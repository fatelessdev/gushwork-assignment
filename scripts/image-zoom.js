/**
 * Image Zoom Functionality
 * 
 * This module implements an interactive zoom preview for the hero carousel:
 * - Shows a magnified view of the image on hover
 * - Displays a lens indicator showing the zoomed area
 * - Updates zoom position based on mouse movement
 * - Disabled on touch devices for better mobile experience
 */
function initImageZoom() {
  const container = document.getElementById('zoomContainer');
  const mainImage = document.getElementById('mainImage');
  const zoomPreview = document.getElementById('zoomPreview');
  const zoomPreviewImg = document.getElementById('zoomPreviewImg');

  // Exit if required elements don't exist
  if (!container || !mainImage || !zoomPreview || !zoomPreviewImg) return;

  // Disable zoom on touch devices (hover doesn't work well on mobile)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  // Create the zoom lens indicator element
  const lens = document.createElement('div');
  lens.className = 'zoom-lens';
  container.appendChild(lens);

  // Zoom configuration
  const ZOOM_SCALE = 2; // How much to magnify the image
  const LENS_SIZE = 120; // Size of the lens in pixels

  /**
   * Initialize zoom preview image with the same source as main image
   */
  function syncZoomImage() {
    zoomPreviewImg.src = mainImage.src;
  }

  // Sync initially and observe changes to main image
  syncZoomImage();
  
  // Watch for image source changes (when carousel navigates)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'src') {
        syncZoomImage();
      }
    });
  });
  observer.observe(mainImage, { attributes: true });

  /**
   * Show zoom preview and lens when mouse enters container
   */
  container.addEventListener('mouseenter', () => {
    zoomPreview.classList.add('active');
    lens.style.opacity = '1';
  });

  /**
   * Hide zoom preview and lens when mouse leaves container
   */
  container.addEventListener('mouseleave', () => {
    zoomPreview.classList.remove('active');
    lens.style.opacity = '0';
  });

  /**
   * Update lens position and zoom preview based on mouse position
   * @param {MouseEvent} event - The mousemove event
   */
  container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    
    // Calculate mouse position as percentage (0-1) within container
    const xRatio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const yRatio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    // Position the lens centered on the mouse cursor
    const lensX = event.clientX - rect.left - LENS_SIZE / 2;
    const lensY = event.clientY - rect.top - LENS_SIZE / 2;
    
    // Clamp lens position to stay within container bounds
    lens.style.left = `${Math.max(0, Math.min(rect.width - LENS_SIZE, lensX))}px`;
    lens.style.top = `${Math.max(0, Math.min(rect.height - LENS_SIZE, lensY))}px`;
    lens.style.width = `${LENS_SIZE}px`;
    lens.style.height = `${LENS_SIZE}px`;

    // Calculate zoom preview image offset
    // The zoomed image is ZOOM_SCALE times larger than the preview window
    const previewW = zoomPreview.offsetWidth;
    const previewH = zoomPreview.offsetHeight;
    const imgW = previewW * ZOOM_SCALE;
    const imgH = previewH * ZOOM_SCALE;

    // Center the zoomed area based on mouse position
    const offsetX = -(xRatio * imgW - previewW / 2);
    const offsetY = -(yRatio * imgH - previewH / 2);

    // Apply the zoom transform
    zoomPreviewImg.style.width = `${imgW}px`;
    zoomPreviewImg.style.height = `${imgH}px`;
    zoomPreviewImg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

