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
//-------------------------SUBIR OPINION-------------------------

// ==========  EMAILJS  ==========

// Configuración EmailJS - Reemplaza con tus datos reales
const EMAIL_CONFIG = {
    serviceID: 'SWS_mailContact',      // cuenta EmailJS
    templateID: 'template_cmokzrk',     // template EmailJS
    publicKey: 'OubueI9IFWFPnx2oM'        // clave pública EmailJS
};

// Función para enviar por EMAIL usando EmailJS
function enviarPorEmail(formData) {
    // Inicializar EmailJS
    emailjs.init(EMAIL_CONFIG.publicKey);
    
    // Preparar los datos del template
    const templateParams = {
        from_name: formData.get('nombre'),
        from_company: formData.get('empresa'),
        opinion: formData.get('opinion'),
        rating: formData.get('rating')
    };

    // Enviar email
    return emailjs.send(
        EMAIL_CONFIG.serviceID,
        EMAIL_CONFIG.templateID,
        templateParams
    );
}

// ========== IMPLEMENTACIONES DE ENVÍO ==========

function enviarSoloEmail(formData) {
    mostrarEstadoEnviando();

    enviarPorEmail(formData)
        .then(() => {
            mostrarMensajeExito('¡Opinión enviada correctamente! ¡Gracias!');
            limpiarFormulario();
        })
        .catch((error) => {
            console.error('Error:', error);
            mostrarMensajeError('Error al enviar la opinión. Intenta de nuevo.');
        });
}

// ========== FUNCIONES DE UI ==========

function mostrarEstadoEnviando() {
    const btn = document.querySelector('#opinionForm .btn-submit');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `
            <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
            Enviando...
        `;
    }
}

function mostrarMensajeExito(mensaje) {
    mostrarNotificacion(mensaje, 'success', '✅');
    restaurarBoton();
}

function mostrarMensajeError(mensaje) {
    mostrarNotificacion(mensaje, 'error', '❌');
    restaurarBoton();
}

function mostrarNotificacion(mensaje, tipo, icono) {
    // Remover notificación existente si hay una
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification ${tipo}`;
    
    // Estilos base para la notificación
    const baseStyles = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: Arial, sans-serif;
        animation: slideIn 0.3s ease-out;
        color: white;
        font-weight: 500;
    `;
    
    // Colores según el tipo
    const typeStyles = tipo === 'success' 
        ? 'background-color: #28a745;' 
        : 'background-color: #dc3545;';
    
    notification.style.cssText = baseStyles + typeStyles;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <div style="margin-right: 10px; font-size: 1.2em;">${icono}</div>
            <div>
                <strong>${mensaje}</strong>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function restaurarBoton() {
    const btn = document.querySelector('#opinionForm .btn-submit');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Agregar Opinión';
    }
}

function limpiarFormulario() {
    const form = document.getElementById('opinionForm');
    setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid', 'has-content');
        });
    }, 2000);
}

// Agregar estilos CSS para las animaciones
function agregarEstilosAnimacion() {
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Agregar estilos de animación
    agregarEstilosAnimacion();
    
    // Inicializar EmailJS
    emailjs.init(EMAIL_CONFIG.publicKey);

    const opinionForm = document.getElementById('opinionForm');

    if (opinionForm) {
        opinionForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Validar que todos los campos estén llenos
            const formData = new FormData(opinionForm);
            let isValid = true;
            
            // Verificar campos requeridos
            ['nombre', 'empresa', 'opinion', 'rating'].forEach(field => {
                if (!formData.get(field) || formData.get(field).trim() === '') {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                mostrarMensajeError('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Si todo está válido, enviar
            enviarSoloEmail(formData);
        });
    }
});