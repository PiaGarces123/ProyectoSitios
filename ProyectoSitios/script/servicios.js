// Datos de servicios
        const servicesData = {
            "services": [
                {
                    "id": 1,
                    "title": "Diseño Gráfico",
                    "icon": "🎨",
                    "description": "Diseños visuales estratégicos alineados con los objetivos de tu marca.",
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
                    "Optimización SEO on-page( posicionamiento)",
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
                    <button class="cta-button" onclick="contactService('${service.title}')">
                        Explorar Servicio
                    </button>
                `;
                
                servicesGrid.appendChild(serviceCard);
            });
        }

        // Función para contactar servicio
        function contactService(serviceTitle) {
            alert(`¡Gracias por tu interés en ${serviceTitle}! Te contactaremos pronto para explorar las posibilidades.`);
        }

        // Inicializar
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            renderServices();
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