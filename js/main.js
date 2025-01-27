// Управление прелоадером
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    
    // Скрываем прелоадер после загрузки страницы
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }, 800);
});

// Мобильное меню
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const body = document.body;
    let isMenuOpen = false;

    // Функция переключения меню
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';

        // Анимация бургера
        const line = burger.querySelector('.burger__line');
        if (isMenuOpen) {
            line.style.transform = 'rotate(45deg)';
            line.style.width = '100%';
            line.style.top = '50%';
            line.style.marginTop = '-1px';
        } else {
            line.style.transform = '';
            line.style.width = '';
            line.style.top = '';
            line.style.marginTop = '';
        }
    }

    // Обработчик клика по бургеру
    burger.addEventListener('click', toggleMenu);

    // Закрытие меню при клике по ссылке
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Закрытие меню при ресайзе окна
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});

// Плавный скролл к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Высота шапки
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Добавляем элементы для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// Инициализация слайдера в Hero секции
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new Swiper('.hero__slider', {
        slidesPerView: 1,
        speed: 800,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.hero__pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}); 