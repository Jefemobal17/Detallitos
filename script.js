let clicks = 0;
const envelope = document.getElementById('envelope');
const flap = document.getElementById('flap');
const seal = document.getElementById('seal');
const counter = document.getElementById('counter');
const envelopeContainer = document.getElementById('envelope-container');
const papersContainer = document.getElementById('papers-container');
const overlay = document.getElementById('overlay');
const heartsAnimation = document.getElementById('hearts-animation');
const music = document.getElementById('background-music');
let currentZoomedPaper = null;

// Contenido de las hojas (PERSONALIZA AQUÍ TUS MENSAJES E IMÁGENES)
const papers = [
    {
        type: 'message',
        content: 'Cada momento contigo es un regalo que atesoro en mi corazón. Gracias por existir y llenar mi vida de luz y amor.'
    },
    {
        type: 'poem',
        content: 'En tus ojos noto el cielo,\nlento, siento que me voy,\nen tus brazos, mi consuelo,\nen tu sonrisa, dulce fulgor.'
    },
    {
        type: 'image',
        src: 'images/imagen1.jpg',
        caption: 'Nuestro primer momento juntos'
    },
    {
        type: 'message',
        content: 'Te amo no solo por quien eres, sino por quien soy cuando estoy contigo. Eres mi hogar, mi paz, mi todo.'
    },
    {
        type: 'poem',
        content: 'Eres tú la bella estrella guía de mi travesía,\nluz que ilumina mis dias,\nsueño en tenerte cada día,\nvida mía❤️.'
    },
    {
        type: 'image',
        src: 'images/imagen2.jpg',
        caption: 'Recuerdos que guardamos por siempre'
    },
    {
        type: 'message',
        content: 'Gracias por cada sonrisa, cada abrazo, cada susurro de amor. Eres mi persona favorita en todo el universo. Te amo infinitamente.'
    },
    {
        type: 'poem',
        content: 'Contigo el tiempo pasa lento,\nsiento que hasta se detiene,\ncalmas todos mis tormentos,\neres tu quién me sostiene.'
    }
];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.5 ? '❤️' : '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsAnimation.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

envelope.addEventListener('click', function() {
    clicks++;
    
    // Crear corazones flotantes
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
    
    if (clicks === 1) {
        counter.textContent = 'Toca 2 veces más... 💕';
    } else if (clicks === 2) {
        counter.textContent = 'Una vez más... 💖';
    }
    
    envelope.classList.add('shake');
    
    setTimeout(() => {
        envelope.classList.remove('shake');
    }, 500);

    if (clicks === 3) {
        openEnvelope();
    }
});

function openEnvelope() {
    counter.style.opacity = '0';
    seal.classList.add('hidden');
    flap.classList.add('open');
    
    // Crear muchos corazones al abrir
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
    
    // Iniciar música
    music.play().catch(e => console.log('Interactúa con la página para escuchar la música'));

    setTimeout(() => {
        envelope.classList.add('fly-away');
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            showPapers();
        }, 1200);
    }, 1000);
}

function showPapers() {
    papersContainer.classList.add('visible');
    
    papers.forEach((paper, index) => {
        setTimeout(() => {
            createPaper(paper, index);
        }, index * 250);
    });
}

function createPaper(paperData, index) {
    const paper = document.createElement('div');
    paper.className = 'paper';
    
    // Ajustar distribución según tamaño de pantalla
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Radio adaptativo según el tamaño de pantalla
    let radius;
    let paperWidth;
    let paperHeight;
    
    if (isSmallMobile) {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.32;
        paperWidth = 170;
        paperHeight = 240;
    } else if (isMobile) {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.33;
        paperWidth = 200;
        paperHeight = 280;
    } else {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
        paperWidth = 260;
        paperHeight = 340;
    }
    
    const angle = (index * (360 / papers.length)) * (Math.PI / 180);
    
    const x = centerX + radius * Math.cos(angle) - (paperWidth / 2);
    const y = centerY + radius * Math.sin(angle) - (paperHeight / 2);
    const randomRotate = (Math.random() * 20 - 10);
    
    paper.style.left = Math.max(5, Math.min(x, window.innerWidth - paperWidth - 5)) + 'px';
    paper.style.top = Math.max(5, Math.min(y, window.innerHeight - paperHeight - 5)) + 'px';
    paper.style.transform = `rotate(${randomRotate}deg)`;
    paper.style.animation = `fallIn 0.8s ease-out, float 4s ease-in-out ${index * 0.5}s infinite`;
    paper.style.animationDelay = `0s, ${index * 0.5}s`;

    // Guardar posición original
    paper.dataset.originalX = paper.style.left;
    paper.dataset.originalY = paper.style.top;
    paper.dataset.originalRotate = randomRotate;

    // Lado frontal (boca abajo)
    const front = document.createElement('div');
    front.className = 'paper-front';
    front.innerHTML = '💌';

    // Lado trasero (contenido)
    const back = document.createElement('div');
    back.className = 'paper-back';

    if (paperData.type === 'message') {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = paperData.content;
        back.appendChild(message);
    } else if (paperData.type === 'poem') {
        const poem = document.createElement('div');
        poem.className = 'poem';
        poem.innerHTML = paperData.content.replace(/\n/g, '<br>');
        back.appendChild(poem);
    } else if (paperData.type === 'image') {
        const img = document.createElement('img');
        img.src = paperData.src;
        img.alt = 'Recuerdo especial';
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ffe9f0" width="200" height="200"/%3E%3Ctext x="50%25" y="45%25" text-anchor="middle" font-size="60"%3E💕%3C/text%3E%3Ctext x="50%25" y="65%25" text-anchor="middle" dy=".3em" fill="%23d4749a" font-family="Georgia"%3ENuestra foto%3C/text%3E%3C/svg%3E';
        };
        back.appendChild(img);
        
        if (paperData.caption) {
            const caption = document.createElement('div');
            caption.className = 'message';
            caption.textContent = paperData.caption;
            back.appendChild(caption);
        }
    }

    paper.appendChild(front);
    paper.appendChild(back);

    paper.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Crear corazones al tocar
        for (let i = 0; i < 2; i++) {
            setTimeout(() => createFloatingHeart(), i * 50);
        }
        
        if (currentZoomedPaper && currentZoomedPaper !== this) {
            // Si hay otra hoja ampliada, restaurarla primero
            resetPaper(currentZoomedPaper);
        }

        if (this.classList.contains('zoomed')) {
            // Si está ampliada, restaurar a posición original
            resetPaper(this);
        } else {
            // Ampliar la hoja
            this.classList.add('zoomed');
            this.classList.add('flipped');
            overlay.classList.add('active');
            currentZoomedPaper = this;
        }
    });

    papersContainer.appendChild(paper);
}

function resetPaper(paper) {
    paper.classList.remove('zoomed');
    paper.classList.remove('flipped');
    overlay.classList.remove('active');
    currentZoomedPaper = null;
}

// Cerrar hoja al hacer clic en el overlay
overlay.addEventListener('click', function() {
    if (currentZoomedPaper) {
        resetPaper(currentZoomedPaper);
    }
});

// Corazones flotantes continuos después de abrir
setInterval(() => {
    if (papersContainer.classList.contains('visible')) {
        createFloatingHeart();
    }
}, 2000);
