// Datos de servicios
        const servicesData = {
            "services": [
                {
                    "id": 1,
                    "title": "Diseño Gráfico",
                    "icon": "🎨",
                    "description": "Diseños visuales estratégicos alineados con los objetivos de tu marca.",
                    "price": "Desde $150 USD",
                    "duration": "3-5 días hábiles",
                    "category": "Diseño Visual",
                    "benefits": [
                        "Aumento del 40% en reconocimiento de marca",
                        "Mayor profesionalismo percibido",
                        "Diferenciación de la competencia"
                    ],
                    "process": [
                        "Briefing inicial y análisis de necesidades",
                        "Propuesta de conceptos creativos",
                        "Desarrollo y refinamiento",
                        "Entrega de archivos finales"
                    ],
                    "features": [
                        "Diseños creativos y diferenciadores",
                        "Elementos gráficos personalizados",
                        "Ilustraciones vectoriales profesionales",
                        "Material institucional y publicitario",
                        "Revisiones hasta aprobación final"
                    ]
                },
                {
                    "id": 2,
                    "title": "Identidad de Marca",
                    "icon": "🏷️",
                    "description": "Construcción de una Identidad Visual Coherente, Sólida y Memorable.",
                    "features": [
                        "Diseño de Logotipo Profesional",
                        "Manual de marca completo",
                        "Sistema cromático y tipográfico",
                        "Diseño aplicado a distintos formatos",
                        "Consistencia en todos los canales"
                    ]
                },
                {
                    "id": 3,
                    "title": "Desarrollo Web",
                    "icon": "🌐",
                    "description": "Sitios web optimizados para rendimiento, seguridad y experiencia de usuario.",
                    "features": [
                        "Diseño responsive y accesible",
                        "Optimización SEO on-page (posicionamiento)",
                        "Velocidad de carga optimizada",
                        "Arquitectura intuitiva",
                        "SSL y estándares de seguridad web"
                    ]
                },
                {
                    "id": 4,
                    "title": "Mantenimiento Web",
                    "icon": "🛠️",
                    "description": "Gestión integral de tu sitio para garantizar estabilidad y actualización constante.",
                    "features": [
                        "Actualización de contenidos",
                        "Optimización de imágenes y recursos",
                        "Mejoras en la experiencia de usuario (UX)",
                        "Optimización continua del rendimiento",
                        "Soporte técnico especializado"
                    ]
                },
                {
                    "id": 5,
                    "title": "Marketing Digital",
                    "icon": "🚀",
                    "description": "Estrategias orientadas a resultados para posicionar tu marca y captar nuevos clientes.",
                    "features": [
                        "Diseño de piezas promocionales",
                        "Campañas segmentadas en Meta y Google",
                        "Creatividades para lanzamientos de productos",
                        "Adaptación visual de promociones para distintos canales",
                        "Diseño de catálogos digitales y presentaciones",
                        "Campañas visuales temáticas"
                    ]
                },
                {
                    "id": 6,
                    "title": "Consultoría Estratégica",
                    "icon": "🔍",
                    "description": "Acompañamiento profesional en procesos de transformación y digitalización empresarial.",
                    "features": [
                        "Diagnóstico digital completo",
                        "Planificación estratégica",
                        "Implementación de mejoras tecnológicas",
                        "Asesoría personalizada por rubro"
                    ]
                },
                {
                    "id": 7,
                    "title": "Aplicaciones Java",
                    "icon": "🖥️",
                    "description": "Desarrollo de soluciones robustas con tecnología Java para entornos empresariales.",
                    "features": [
                        "Aplicaciones multiplataforma (Swing)",
                        "Interfaz gráfica moderna y funcional",
                        "Sistemas de gestión personalizados",
                        "Mantenimiento y evolución del sistema"
                    ]
                },
                {
                    "id": 8,
                    "title": "Contenido Visual y Multimedia",
                    "icon": "📸",
                    "description": "Producción de contenido audiovisual profesional para entornos digitales y publicitarios.",
                    "features": [
                        "Diseños para redes sociales y branding",
                        "Animaciones y motion graphics",
                        "Adaptación de Contenido a diferentes plataformas",
                        "Formatos optimizados para alto alcance"
                    ]
                }
            ]
            
        };

        let currentService = null;

        // Generar estrellas
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numberOfStars = 100;
            
            for (let i = 0; i < numberOfStars; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Renderizar servicios
        function renderServices() {
            const servicesGrid = document.getElementById('servicesGrid');
            
            servicesData.services.forEach((service, index) => {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('service-card');
                serviceCard.style.animationDelay = `-${index * 2}s`;
                
                const featuresHTML = service.features.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
                
                serviceCard.innerHTML = `
                    <div class="service-icon">
                        ${service.icon}
                    </div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    <ul class="service-features">
                        ${featuresHTML}
                    </ul>
                    <button class="cta-button" onclick="openServiceModal(${service.id})">
                        Explorar Servicio
                    </button>
                `;
                
                servicesGrid.appendChild(serviceCard);
            });
        }

        // Abrir modal del servicio
        function openServiceModal(serviceId) {
            const service = servicesData.services.find(s => s.id === serviceId);
            if (!service) return;

            currentService = service;
            
            // Actualizar contenido básico del modal
            document.getElementById('modalIcon').textContent = service.icon;
            document.getElementById('modalTitle').textContent = service.title;
            document.getElementById('modalDescription').textContent = service.description;
            
            // Actualizar información adicional
            document.getElementById('modalPrice').textContent = service.price || 'Consultar precio';
            document.getElementById('modalDuration').textContent = service.duration || 'Variable';
            document.getElementById('modalCategory').textContent = service.category || 'Servicio Digital';
            
            // Actualizar características
            const featuresContainer = document.getElementById('modalFeatures');
            featuresContainer.innerHTML = service.features.map(feature => 
                `<li>${feature}</li>`
            ).join('');
            
            // Actualizar beneficios
            const benefitsContainer = document.getElementById('modalBenefits');
            if (service.benefits) {
                benefitsContainer.innerHTML = service.benefits.map(benefit => 
                    `<li>${benefit}</li>`
                ).join('');
            } else {
                benefitsContainer.innerHTML = '<li>Beneficios personalizados según el proyecto</li>';
            }
            
            // Actualizar proceso
            const processContainer = document.getElementById('modalProcess');
            if (service.process) {
                processContainer.innerHTML = service.process.map((step, index) => 
                    `<div class="process-step" data-step="${index + 1}">${step}</div>`
                ).join('');
            } else {
                processContainer.innerHTML = '<div class="process-step" data-step="1">Proceso personalizado según las necesidades</div>';
            }
            
            // Mostrar modal
            document.getElementById('serviceModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Cerrar modal
        function closeModal() {
            document.getElementById('serviceModal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll del body
            currentService = null;
        }

        // Función para contactar servicio
        function contactService() {
            closeModal(); // Cierra el modal (si usás una función que lo cierra)

            // Redirige a la sección de contacto
            window.location.href = `./index.html#contact?servicio=${encodeURIComponent(currentService.title)}`;
        }

        // Event listeners para el modal
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            renderServices();
            
            // Cerrar modal con la X
            document.querySelector('.close').addEventListener('click', closeModal);
            
            // Cerrar modal al hacer clic fuera del contenido
            document.getElementById('serviceModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
            
            // Cerrar modal con tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });

        // Efecto parallax suave
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                const speed = (index % 3 + 1) * 0.5;
                star.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

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



// ========================= SERVICIOS.JS =========================
// Este archivo maneja todo lo relacionado con la visualización y selección de servicios

// Variable global para almacenar el servicio seleccionado
let selectedService = null;

// Función para abrir el modal de servicio
function openServiceModal(serviceId) {
    const service = servicesData.services.find(s => s.id === serviceId);
    if (!service) return;
    
    // Guardar el servicio seleccionado globalmente
    selectedService = service;
    
    const modal = document.getElementById('serviceModal');
    
    // Rellenar contenido del modal
    document.getElementById('modalIcon').textContent = service.icon;
    document.getElementById('modalTitle').textContent = service.title;
    document.getElementById('modalDescription').textContent = service.description;
    
    // Rellenar características
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    if (service.features) {
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
    }
    
    // Rellenar información adicional (solo si existe)
    if (service.price) {
        document.getElementById('modalPrice').textContent = service.price;
    }
    if (service.duration) {
        document.getElementById('modalDuration').textContent = service.duration;
    }
    if (service.category) {
        document.getElementById('modalCategory').textContent = service.category;
    }
    
    // Rellenar beneficios (solo si existen)
    if (service.benefits) {
        const benefitsContainer = document.getElementById('modalBenefits');
        benefitsContainer.innerHTML = '';
        service.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            benefitsContainer.appendChild(li);
        });
    }
    
    // Rellenar proceso (solo si existe)
    if (service.process) {
        const processContainer = document.getElementById('modalProcess');
        processContainer.innerHTML = '';
        service.process.forEach((step, index) => {
            const div = document.createElement('div');
            div.className = 'process-step';
            div.innerHTML = `<strong>Paso ${index + 1}:</strong> ${step}`;
            processContainer.appendChild(div);
        });
    }
    
    modal.style.display = 'block';
}

// Función para contactar sobre un servicio específico
function contactService() {
    closeModal(); // Cierra el modal
    
    if (selectedService) {
        // Guardar el servicio en localStorage para pasarlo entre páginas
        localStorage.setItem('selectedService', JSON.stringify(selectedService));
        
        // Verificar si estamos en servicios.html o index.html
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('servicios.html')) {
            // Si estamos en servicios.html, redirigir a index.html con hash
            window.location.href = "./index.html#contact";
        } else {
            // Si estamos en index.html, hacer scroll a la sección de contacto
            const contactSection = document.getElementById('contact') || document.querySelector('.contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Pre-llenar el formulario después del scroll
                setTimeout(() => {
                    presetFormWithService(selectedService);
                }, 500);
            }
        }
    }
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Función para mostrar notificaciones sutiles
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Añadir estilos inline si no están definidos en CSS
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 350px;
        font-size: 14px;
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y remover después de 4 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Event listeners para el modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close');
    
    // Cerrar modal al hacer clic en X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});