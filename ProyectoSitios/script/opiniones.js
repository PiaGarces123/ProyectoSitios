document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/opiniones.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el JSON');
            }
            return response.json();
        })
        .then(testimonios => {
            const carousel = document.getElementById('carousel');
            carousel.innerHTML = '';
            
            for (let i = 0; i < testimonios.length; i += 2) {
                const slide = document.createElement('div');
                slide.classList.add('slide');

                for (let j = i; j < i + 2 && j < testimonios.length; j++) {
                    const t = testimonios[j];
                    const testimonioDiv = document.createElement('div');
                    testimonioDiv.classList.add('testimonio', 'p-3', 'border', 'rounded', 'flex-fill');

                    // ✅ Aplicar color de fondo desde variable CSS
                    const colorFondo = getComputedStyle(document.documentElement).getPropertyValue('--card-light');
                    testimonioDiv.style.backgroundColor = colorFondo;

                    testimonioDiv.innerHTML = `
                        <h5 class="nombre mb-1">${t.nombre}</h5>
                        <p class="empresa mb-1"><em>${t.empresa}</em></p>
                        <p class="opinion">"${t.opinion}"</p>
                        <div class="rating text-warning">Rating: ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                    `;
                    slide.appendChild(testimonioDiv);
                }

                carousel.appendChild(slide);
            }

            // ✅ Activo el primer slide al inicio:
            const firstSlide = document.querySelector('#carousel .slide');
            if (firstSlide) {
                firstSlide.classList.add('active');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('carousel').innerText = 'No se pudieron cargar los testimonios.';
        });
});
let currentSlide = 0;

function showSlide(nextIndex, direction) {
    const slides = document.querySelectorAll('#carousel .slide');
    if (nextIndex === currentSlide) return;

    const current = slides[currentSlide];
    const next = slides[nextIndex];

    // Quitar clases anteriores
    slides.forEach(s => s.classList.remove('active', 'out-left', 'out-right'));

    // Animar el slide actual hacia fuera
    if (direction === 'next') {
        current.classList.add('out-left');
    } else {
        current.classList.add('out-right');
    }

    // Mostrar el nuevo slide
    next.classList.add('active');

    currentSlide = nextIndex;
}

function nextSlide() {
    const slides = document.querySelectorAll('#carousel .slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex, 'next');
}

function previousSlide() {
    const slides = document.querySelectorAll('#carousel .slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex, 'prev');
}