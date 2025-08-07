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

/* INTEGRANTES - DATOS HARDCODEADOS */
// Datos del equipo directamente en el código
const teamData = [
    {
        image: "../assets/img/perfilGarcesBrocal.jpeg",
        name: "Garces Brocal María P.",
        specialty: "Frontend Developer",
        info: "Actualmente me encuentro en el segundo año de la Tecnicatura Universitaria en Web en la UNSL. Tengo conocimientos en desarrollo frontend (HTML, CSS, JavaScript, JSON), programación en distintos lenguajes, usabilidad y diseño gráfico.",
        linkedin: "https://www.linkedin.com/in/maría-pía-garces-brocal"
    },
    {
        image: "../assets/img/perfilPonce.jpeg",
        name: "Ponce Santiago Ulises",
        specialty: "Frontend Developer, Graphic Design",
        info: "Trabajo con el paquete Adobe (Illustrator, Photoshop, entre otros) y tengo conocimientos en desarrollo frontend con HTML, CSS y JavaScript, lo que me permite integrar el diseño visual con entornos web de manera efectiva.",
        linkedin: "https://linkedin.com/in/lunastellar"
    }
];

// Función para crear las cards de los miembros
function createMemberCards(data) {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return; // Si no existe el elemento, no ejecutar
    
    teamGrid.innerHTML = '';

    data.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="member-image"
                onerror="this.src='https://via.placeholder.com/120x120/4ecdc4/ffffff?text=${member.name.charAt(0)}'">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-specialty">${member.specialty}</p>
            <p class="member-info">${member.info}</p>
            <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="linkedin-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
            </a>
        `;
        
        teamGrid.appendChild(card);
    });

  }

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    createMemberCards(teamData);
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


//-------------------------CONTACTO-------------------------

// ==========  EMAILJS  ==========

// Configuración EmailJS - Reemplaza con tus datos reales
const EMAIL_CONFIG = {
    serviceID: 'SWS_mailContact',      // cuenta EmailJS
    templateID: 'template_ksmhqub',     // template EmailJS
    publicKey: 'OubueI9IFWFPnx2oM'        // clave pública EmailJS
};

// Función para enviar por EMAIL usando EmailJS
function enviarPorEmail(formData) {
    // Inicializar EmailJS
    emailjs.init(EMAIL_CONFIG.publicKey);
    
    // Preparar los datos del template
    const templateParams = {
        from_name: formData.get('C_name'),
        from_email: formData.get('C_email'),
        subject: formData.get('C_asunto'),
        message: formData.get('C_mensaje'),
        fecha: new Date().toLocaleString('es-ES', {
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Enviar email
    return emailjs.send(
        EMAIL_CONFIG.serviceID,
        EMAIL_CONFIG.templateID,
        templateParams
    );
}

// ========== IMPLEMENTACIONES DE ENVÍO ==========

// OPCIÓN A: Solo por Email
function enviarSoloEmail(formData) {
    // Usando EmailJS
    enviarPorEmail(formData)
        .then(() => {
            mostrarMensajeExito('¡Email enviado correctamente! Pronto nos pondremos en contacto.');
            limpiarFormulario();
        })
        .catch((error) => {
            console.error('Error:', error);
            mostrarMensajeError('Error al enviar el email. Inténtalo de nuevo.');
        });

}
// ========== FUNCIONES DE UI ==========

function mostrarEstadoEnviando() {
    const btn = document.querySelector('#formularioContacto button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Enviando...
        `;
    }
}

function mostrarMensajeExito(mensaje) {
    mostrarNotificacion(mensaje, 'success', '✅');
    restaurarBoton();
}

function mostrarMensajeError(mensaje) {
    mostrarNotificacion(mensaje, 'danger', '❌');
    restaurarBoton();
}

function mostrarNotificacion(mensaje, tipo, icono) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${tipo} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
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
    const btn = document.querySelector('#formularioContacto button[type="submit"]');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `
            <span class="dotb dotb2-1"></span>
            <span class="dotb dotb2-2"></span>
            <span class="dotb dotb2-3"></span>
            <span class="dotb dotb2-4"></span>
            <span class="dotb dotb2-5"></span>
            <span class="dotb dotb2-6"></span>
            <span class="dotb dotb2-7"></span>
            <span class="buttonE px-16 py-4 rounded-full uppercase contB3">Enviar</span>
        `;
    }
}

function limpiarFormulario() {
    const form = document.getElementById('formularioContacto');
    setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid', 'has-content');
        });
    }, 2000);
}

// Mantener las funciones originales
function crearMensajeWhatsApp(nombre, email, whatsapp, mensaje) {
    const fechaHora = new Date().toLocaleString('es-ES', {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `🌟 *NUEVO CONTACTO DESDE WEB* 🌟

👤 *Nombre:* ${nombre}
📧 *Email:* ${email}
📱 *WhatsApp:* ${whatsapp}

💬 *Mensaje:*
${mensaje}

📅 *Fecha y hora:* ${fechaHora}

---
_Mensaje enviado desde el formulario de contacto web_`;
}

/*Capturación del Envío del Formulario*/
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioContacto');

    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault(); // evita que recargue la página
            event.stopPropagation();

            // Mostrar spinner
            mostrarEstadoEnviando();

            const formData = new FormData(formulario);
            
            // Enviar por EmailJS
            enviarSoloEmail(formData);
        });
    }
});



/** Captura de Servicio */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const servicio = urlParams.get('servicio');

    if (servicio) {
        const asuntoInput = document.getElementById('asunto');
        if (asuntoInput) {
            asuntoInput.value = `Consulta por servicio: ${servicio}`;
        }
    }
});


// Función para pre-llenar el formulario con información del servicio
function presetFormWithService(service) {
    const asuntoField = document.getElementById('C_asunto');
    const mensajeField = document.getElementById('C_mensaje');
    
    if (asuntoField) {
        // Pre-llena el campo de asunto
        asuntoField.value = `Consulta sobre: ${service.title}`;
        
        // Añade clase para animación visual
        asuntoField.classList.add('auto-filled', 'prefilled');
        
        // Trigger del evento para que Bootstrap FloatingLabel funcione correctamente
        asuntoField.dispatchEvent(new Event('input'));
        asuntoField.dispatchEvent(new Event('focus'));
        asuntoField.dispatchEvent(new Event('blur'));
    }
    
    if (mensajeField && mensajeField.value.trim() === '') {
        // Crear mensaje personalizado basado en el servicio
        let mensaje = `Hola, me interesa conocer más detalles sobre el servicio de ${service.title}.\n\n`;
        mensaje += `Descripción del servicio: ${service.description}\n\n`;
        
        // Añadir información específica si está disponible
        if (service.price) {
            mensaje += `He visto que el precio es ${service.price}.\n`;
        }
        if (service.duration) {
            mensaje += `Y que la duración estimada es de ${service.duration}.\n`;
        }
        
        mensaje += `\nMe gustaría que me proporcionen más información sobre:\n`;
        mensaje += `- Detalles específicos del proceso\n`;
        mensaje += `- Tiempos de entrega exactos\n`;
        mensaje += `- Presupuesto personalizado\n`;
        mensaje += `- Próximos pasos a seguir\n\n`;
        mensaje += `Quedo atento a su respuesta. ¡Gracias!`;
        
        // Pre-llena el campo de mensaje
        mensajeField.value = mensaje;
        
        // Añade clase para animación visual
        mensajeField.classList.add('auto-filled', 'prefilled');
        
        // Trigger del evento para Bootstrap FloatingLabel
        mensajeField.dispatchEvent(new Event('input'));
        mensajeField.dispatchEvent(new Event('focus'));
        mensajeField.dispatchEvent(new Event('blur'));
    }
    
    // Enfocar el campo de nombre para que el usuario sepa dónde empezar
    const nameField = document.getElementById('C_name');
    if (nameField) {
        setTimeout(() => {
            nameField.focus();
        }, 100);
    }
    
    // Remover las clases de animación después de la animación
    setTimeout(() => {
        if (asuntoField) asuntoField.classList.remove('auto-filled');
        if (mensajeField) mensajeField.classList.remove('auto-filled');
    }, 2000);
    
    // Mostrar notificación sutil al usuario
    showNotification('Formulario pre-llenado con información del servicio seleccionado', 'success');
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

// Función para limpiar los campos pre-llenados cuando el usuario los modifica
function setupFormListeners() {
    const asuntoField = document.getElementById('C_asunto');
    const mensajeField = document.getElementById('C_mensaje');
    
    if (asuntoField) {
        asuntoField.addEventListener('input', function() {
            if (this.classList.contains('prefilled')) {
                this.classList.remove('prefilled');
            }
        });
    }
    
    if (mensajeField) {
        mensajeField.addEventListener('input', function() {
            if (this.classList.contains('prefilled')) {
                this.classList.remove('prefilled');
            }
        });
    }
}

// Inicializar listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupFormListeners();
    
    // También configurar los listeners del modal
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});


// Variable global para almacenar el servicio seleccionado
let selectedService = null;

// Función modificada para abrir el modal
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
    
    // Redirige a la sección de contacto
    window.location.href = "./index.html#contact";
    
    // Espera un momento para que la página se cargue y luego pre-llena el formulario
    setTimeout(() => {
        if (selectedService) {
            const asuntoField = document.getElementById('C_asunto');
            if (asuntoField) {
                // Pre-llena el campo de asunto con el nombre del servicio
                asuntoField.value = `Consulta sobre: ${selectedService.title}`;
                
                // También puedes pre-llenar el mensaje con información del servicio
                const mensajeField = document.getElementById('C_mensaje');
                if (mensajeField && mensajeField.value === '') {
                    mensajeField.value = `Hola, me interesa conocer más detalles sobre el servicio de ${selectedService.title}. ${selectedService.description}`;
                }
                
                // Opcional: hacer scroll suave al campo de asunto
                asuntoField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Opcional: enfocar el campo para que sea más visible
                asuntoField.focus();
            }
        }
    }, 100); // Pequeña espera para asegurar que el DOM esté listo
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
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
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Función mejorada para el envío del formulario con EmailJS
function enviarFormulario(form) {
    // Prevenir el envío por defecto
    event.preventDefault();
    
    // Validar el formulario
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    
    // Obtener los datos del formulario
    const formData = new FormData(form);
    const templateParams = {
        from_name: formData.get('C_name'),
        from_email: formData.get('C_email'),
        subject: formData.get('C_asunto'),
        message: formData.get('C_mensaje')
    };
    
    // Mostrar loading en el botón
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Enviando...';
    submitBtn.disabled = true;
    
    // Enviar email usando EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email enviado exitosamente!', response.status, response.text);
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado exitosamente! Te responderemos pronto.');
            
            // Limpiar el formulario
            form.reset();
            form.classList.remove('was-validated');
            
            // Limpiar la variable del servicio seleccionado
            selectedService = null;
            
        }, function(error) {
            console.log('Error al enviar el email:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        })
        .finally(function() {
            // Restaurar el botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    
    return false;
}