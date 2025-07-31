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

        // Barra de scroll
        window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight; // de 0 a 1

        // Interpolación lineal entre dos colores (de 0 a 255)
        const lerp = (start, end, t) => Math.round(start + (end - start) * t);

        // Colores originales
        const white = [255, 255, 255];
        const lilac = [195, 155, 211];
        const purple = [142, 68, 173];

        // Según el porcentaje de scroll, invertimos los colores
        const c1 = [
            lerp(white[0], purple[0], scrollPercent),
            lerp(white[1], purple[1], scrollPercent),
            lerp(white[2], purple[2], scrollPercent)
        ];

        const c2 = [
            lerp(lilac[0], lilac[0], scrollPercent), 
            lerp(lilac[1], lilac[1], scrollPercent),
            lerp(lilac[2], lilac[2], scrollPercent)
        ];

        const c3 = [
            lerp(purple[0], white[0], scrollPercent),
            lerp(purple[1], white[1], scrollPercent),
            lerp(purple[2], white[2], scrollPercent)
        ];

        // Convertimos a string RGB
        const rgb1 = `rgb(${c1.join(',')})`;
        const rgb2 = `rgb(${c2.join(',')})`;
        const rgb3 = `rgb(${c3.join(',')})`;

        // Creamos el nuevo estilo
        const style = document.createElement('style');
        style.innerHTML = `
            ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, ${rgb1}, ${rgb2}, ${rgb3}) !important;
            border-radius: 10px;
            }
        `;

        // Reemplazamos el anterior
        const existing = document.getElementById('dynamic-scroll-style');
        if (existing) existing.remove();

        style.id = 'dynamic-scroll-style';
        document.head.appendChild(style);
        });
