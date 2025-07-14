 (function () {
  // Add corner decorations to all animation containers
  function addCornerDecorations() {
    document.querySelectorAll(".animation-container").forEach((container) => {
      const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
      corners.forEach((position) => {
        const corner = document.createElement("div");
        corner.className = `corner ${position}`;
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const polygon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        polygon.setAttribute(
          "points",
          "448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
        );
        polygon.setAttribute("fill", "currentColor");
        svg.appendChild(polygon);
        corner.appendChild(svg);
        container.appendChild(corner);
      });
    });
  }
 
 //  Oscillating Dots (unchanged)
function setupOscillatingDots() {
  const container = document.getElementById("oscillating-dots");
  if (!container) return;

  container.innerHTML = "";

  const containerWidth = container.offsetWidth;

  const canvas = document.createElement("canvas");
  canvas.width = containerWidth;
  canvas.height = 180;
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.top = "0";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const centerY = canvas.height / 2;
  let time = 0;
  let lastTime = 0;

  const dotSpacing = 10; // Espacio horizontal deseado entre puntos
  const dotCount = Math.floor(containerWidth / dotSpacing);
  const rowCount = 5;
  const spacingY = 15;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time += deltaTime * 0.001;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rowCount; row++) {
      const y = centerY - ((rowCount - 1) / 2) * spacingY + row * spacingY;
      for (let i = 0; i < dotCount; i++) {
        const x = (containerWidth / dotCount) * i + (containerWidth / dotCount) / 2;
        const amplitude = 4 + row * 2;
        const frequency = 1 + row * 0.2;
        const phaseOffset = row * 0.5;
        const offset = Math.sin(time * frequency + i * 0.2 + phaseOffset) * amplitude;
        const finalY = y + offset;

        ctx.beginPath();
        ctx.arc(x, finalY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
  // Initialize all preloaders
  window.addEventListener("load", function () {
    setupOscillatingDots();
  });
})();

/*

// Carrusel de testimonios
        let currentSlide = 0;
        const totalSlides = 2;
        const carousel = document.getElementById('testimonials-carousel');
        const indicators = document.querySelectorAll('.indicator');
        const counter = document.getElementById('carousel-counter');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            carousel.style.transform = `translateX(${translateX}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Actualizar contador
            counter.textContent = `${currentSlide + 1} de ${totalSlides}`;
            
            // Actualizar botones
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
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

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // Auto-play (opcional)
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentSlide < totalSlides - 1) {
                    nextSlide();
                } else {
                    currentSlide = 0;
                    updateCarousel();
                }
            }, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Inicializar carrusel
        updateCarousel();
        startAutoPlay();

        // Pausar auto-play cuando el usuario interactúa
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);

        // Soporte para gestos táctiles (mobile)
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAutoPlay();
        });

        // Animación suave para las tarjetas cuando aparecen en viewport
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, observerOptions);

        // Observar todas las tarjetas
        document.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });

        // Efecto de hover mejorado para las estrellas
        document.querySelectorAll('.testimonial-card').forEach(card => {
            const stars = card.querySelectorAll('.star');
            
            card.addEventListener('mouseenter', () => {
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        star.style.transition = 'transform 0.1s ease';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                stars.forEach(star => {
                    star.style.transform = 'scale(1)';
                });
            });
        });

        // Animación de números contador
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericTarget = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/\d/g, '');
                let current = 0;
                const increment = numericTarget / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericTarget) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            });
        }

        // Iniciar animación de contadores cuando la sección sea visible
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        statsObserver.observe(document.querySelector('.stats-section'));
     */