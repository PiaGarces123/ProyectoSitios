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
                benefitsContainer.innerHTML = '<li>Beneficios personalizados según tu proyecto</li>';
            }
            
            // Actualizar proceso
            const processContainer = document.getElementById('modalProcess');
            if (service.process) {
                processContainer.innerHTML = service.process.map((step, index) => 
                    `<div class="process-step" data-step="${index + 1}">${step}</div>`
                ).join('');
            } else {
                processContainer.innerHTML = '<div class="process-step" data-step="1">Proceso personalizado según tus necesidades</div>';
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
            if (currentService) {
                alert(`¡Gracias por tu interés en ${currentService.title}! Te contactaremos pronto para explorar las posibilidades.`);
                closeModal();
            }
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