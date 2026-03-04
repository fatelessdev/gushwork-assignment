function initHeroCarousel() {
  const thumbs = document.querySelectorAll('#carouselThumbs .thumb');
  const mainImage = document.getElementById('mainImage');
  const zoomPreviewImg = document.getElementById('zoomPreviewImg');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  if (!thumbs.length || !mainImage) return;

  const images = Array(6).fill({
    main: 'assets/fishnet-landing.png',
    zoom: 'assets/fishnet-landing.png'
  });

  let currentIndex = 0;

  function updateCarousel(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[index].main;
      if (zoomPreviewImg) {
        zoomPreviewImg.src = images[index].zoom;
      }
      mainImage.style.opacity = '1';
    }, 200);

    thumbs.forEach((thumb) => thumb.classList.remove('active'));
    if (thumbs[index]) {
      thumbs[index].classList.add('active');
    }
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index, 10);
      updateCarousel(index);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      updateCarousel(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      updateCarousel(newIndex);
    });
  }

  if (zoomPreviewImg) {
    zoomPreviewImg.src = images[0].zoom;
  }
}

