// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.getElementById('navMobile')?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Work filter tabs
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.work-card');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

// Portfolio screenshot sliders
const galleries = document.querySelectorAll('.my-gallery');
const galleryModal = document.getElementById('galleryModal');

if (galleries.length) {
  const modalImage = galleryModal?.querySelector('.gallery-modal__figure img');
  const modalCaption = galleryModal?.querySelector('.gallery-modal__figure figcaption');
  const modalPrevButton = galleryModal?.querySelector('.gallery-modal__arrow-prev');
  const modalNextButton = galleryModal?.querySelector('.gallery-modal__arrow-next');
  const modalDots = galleryModal?.querySelector('.gallery-modal__dots');
  const modalCloseTargets = galleryModal?.querySelectorAll('[data-gallery-close]');
  let activeGallery;

  const showModalSlide = (gallery, index) => {
    gallery.showSlide(index);

    const activeImage = gallery.slides[gallery.activeSlide];
    if (modalImage) {
      modalImage.src = activeImage.src;
      modalImage.alt = activeImage.alt;
    }
    if (modalCaption) {
      modalCaption.textContent = activeImage.alt;
    }
    modalDots?.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === gallery.activeSlide);
    });
  };

  const renderModalDots = (gallery) => {
    if (!modalDots) return;

    modalDots.innerHTML = '';
    gallery.slides.forEach((_, slideIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `View ${gallery.name} screenshot ${slideIndex + 1}`);
      dot.addEventListener('click', () => showModalSlide(gallery, slideIndex));
      modalDots.appendChild(dot);
    });
  };

  const openModal = (gallery, index) => {
    if (!galleryModal) return;

    activeGallery = gallery;
    renderModalDots(gallery);
    showModalSlide(gallery, index);
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-gallery-modal');
    window.clearInterval(gallery.slideTimer);
  };

  const closeModal = () => {
    if (!galleryModal) return;

    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-gallery-modal');
    activeGallery?.restartSlider();
  };

  galleries.forEach((galleryElement) => {
    const slides = galleryElement.querySelectorAll('img');
    const dotsContainer = galleryElement.querySelector('.gallery-dots');
    if (dotsContainer && dotsContainer.children.length !== slides.length) {
      dotsContainer.innerHTML = '';
      slides.forEach(() => dotsContainer.appendChild(document.createElement('span')));
    }
    const dots = dotsContainer?.querySelectorAll('span') || [];
    const prevButton = galleryElement.querySelector('.gallery-arrow-prev');
    const nextButton = galleryElement.querySelector('.gallery-arrow-next');
    const name = galleryElement.getAttribute('aria-label')?.replace(' screenshots', '') || 'Project';
    const gallery = {
      name,
      slides,
      activeSlide: 0,
      slideTimer: undefined,
      showSlide(index) {
        this.activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          slide.classList.toggle('is-active', slideIndex === this.activeSlide);
        });
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle('is-active', dotIndex === this.activeSlide);
        });
      },
      startSlider() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.slideTimer = window.setInterval(() => this.showSlide(this.activeSlide + 1), 4500);
      },
      restartSlider() {
        window.clearInterval(this.slideTimer);
        this.startSlider();
      },
    };

    prevButton?.addEventListener('click', () => {
      gallery.showSlide(gallery.activeSlide - 1);
      gallery.restartSlider();
    });

    nextButton?.addEventListener('click', () => {
      gallery.showSlide(gallery.activeSlide + 1);
      gallery.restartSlider();
    });

    slides.forEach((slide, slideIndex) => {
      slide.addEventListener('click', () => openModal(gallery, slideIndex));
    });

    gallery.showSlide(0);
    gallery.startSlider();
  });

  modalPrevButton?.addEventListener('click', () => {
    if (activeGallery) showModalSlide(activeGallery, activeGallery.activeSlide - 1);
  });
  modalNextButton?.addEventListener('click', () => {
    if (activeGallery) showModalSlide(activeGallery, activeGallery.activeSlide + 1);
  });
  modalCloseTargets?.forEach((target) => target.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (!galleryModal?.classList.contains('is-open') || !activeGallery) return;

    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') showModalSlide(activeGallery, activeGallery.activeSlide - 1);
    if (event.key === 'ArrowRight') showModalSlide(activeGallery, activeGallery.activeSlide + 1);
  });
}
