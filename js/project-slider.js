document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех слайдеров на странице
    const projectSliders = document.querySelectorAll('.project__slider');
    const sliderInstances = [];
    
    projectSliders.forEach((slider, index) => {
        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoHeight: true,
            
            // Навигация
            navigation: {
                nextEl: `.project__slider-next-${index + 1}`,
                prevEl: `.project__slider-prev-${index + 1}`,
            },

            // Адаптивные настройки
            breakpoints: {
                320: {
                    spaceBetween: 10,
                },
                768: {
                    spaceBetween: 20,
                }
            }
        });
        sliderInstances.push(swiper);
    });

    // Полноэкранный просмотр
    const overlay = document.querySelector('.fullscreen-overlay');
    const fullscreenImage = overlay.querySelector('.fullscreen-image');
    const closeBtn = overlay.querySelector('.fullscreen-close');
    const prevBtn = overlay.querySelector('.fullscreen-prev');
    const nextBtn = overlay.querySelector('.fullscreen-next');

    let currentSlider = null;
    let currentIndex = 0;

    // Открытие полноэкранного режима
    document.querySelectorAll('.project__slider img').forEach(img => {
        img.addEventListener('click', function() {
            const slide = this.closest('.swiper-slide');
            const slider = this.closest('.project__slider');
            const sliderIndex = Array.from(projectSliders).indexOf(slider);
            
            currentSlider = sliderInstances[sliderIndex];
            currentIndex = currentSlider.realIndex;
            
            updateFullscreenImage();
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие полноэкранного режима
    closeBtn.addEventListener('click', closeFullscreen);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeFullscreen();
    });

    // Навигация
    prevBtn.addEventListener('click', () => {
        if (currentSlider) {
            currentSlider.slidePrev();
            currentIndex = currentSlider.realIndex;
            updateFullscreenImage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlider) {
            currentSlider.slideNext();
            currentIndex = currentSlider.realIndex;
            updateFullscreenImage();
        }
    });

    // Клавиатурная навигация
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                prevBtn.click();
                break;
            case 'ArrowRight':
                nextBtn.click();
                break;
        }
    });

    function updateFullscreenImage() {
        const currentSlide = currentSlider.slides[currentSlider.activeIndex];
        const currentImg = currentSlide.querySelector('img');
        fullscreenImage.src = currentImg.src;
        fullscreenImage.alt = currentImg.alt;
    }

    function closeFullscreen() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Свайп на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    overlay.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    }
}); 