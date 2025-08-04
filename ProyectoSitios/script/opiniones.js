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
