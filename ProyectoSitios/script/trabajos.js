    const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.getElementById('indicators');
        
        let currentSlide = 0;
        const totalSlides = 3;

        // Crear indicadores
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(indicator);
        }

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Actualizar indicadores
            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });

            // Actualizar botones
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Inicializar
        updateCarousel();

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Auto-rotate stars effect
        setInterval(() => {
            const stars = document.querySelector('body::before');
            if (stars) {
                stars.style.transform = `rotate(${Date.now() * 0.01}deg)`;
            }
        }, 100);