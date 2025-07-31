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
        linkedin: "https://linkedin.com/in/alexnebula"
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
