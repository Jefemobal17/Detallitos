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
        content: 'Cada momento contigo es un regalo 🎁 que atesoro en mi corazón ❤️. Gracias doy siempre poque llegaste y llenaste mi vida de luz y amor 🥰.'
    },
    {
        type: 'poem',
        content: 'En tus ojos noto el cielo,\nen tu mirada, un resplandor,\nen tus brazos, mi consuelo,\nbrillas, cual radiante sol☀️.'
    },
    {
        type: 'image',
        src: 'imagenes/imagen1.jpg',
        caption: 'Eres la calma, en medio de mi tormenta.'
    },
    {
        type: 'message',
        content: 'Me gustas, no solo por quien eres, sino por quien soy cuando estoy contigo. Me das seguridad, paz y alegria 🫶🏽.'
    },
    {
        type: 'poem',
        content: 'Eres una bella estrella 💫 guía de mi travesía,\nla luz en mi oscuridad, iluminas todos mis días.\nSueño con tenerte cerca y abrazarte 🫂❤️ cada día,\nse convierte en realidad contigo cada fantasía...'
    },
    {
        type: 'image',
        src: 'imagenes/imagen2.jpg',
        caption: 'Con solo verte, veo lo afortunado que soy.'
    },
    {
        type: 'message',
        content: 'Gracias por cada sonrisa, cada abrazo, cada tiempo juntos. Eres mi persona favorita en todo el mundo. Te quiero infinitamente.'
    },
    {
        type: 'poem',
        content: 'Contigo el tiempo pasa lento,\ncasi que hasta se detiene,\natesoro cada momento,\nque cerca puedo tenerte.'
    },
    {
        type: 'image',
        src: 'imagenes/imagen3.jpg',
        caption: 'Disfruto más las comidas, cuando son contigo.'
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
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }

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
    
    // Detectar tamaño de pantalla
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Configuración adaptable según dispositivo
    let radius;
    let paperWidth;
    let paperHeight;
    
    if (isSmallMobile) {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.32;
        paperWidth = 170;
        paperHeight = 240;
    } else if (isMobile) {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
        paperWidth = 200;
        paperHeight = 280;
    } else {
        radius = Math.min(window.innerWidth, window.innerHeight) * 0.38;
        paperWidth = 240;
        paperHeight = 320;
    }
    
    // Calcular posición en círculo
    const angle = (index * (360 / papers.length)) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle) - (paperWidth / 2);
    const y = centerY + radius * Math.sin(angle) - (paperHeight / 2);
    
    // Rotación más suave
    const randomRotate = (Math.random() * 16 - 8);
    
    // Asegurar que las cartas no salgan de la pantalla
    const finalX = Math.max(10, Math.min(x, window.innerWidth - paperWidth - 10));
    const finalY = Math.max(10, Math.min(y, window.innerHeight - paperHeight - 10));
    
    paper.style.left = finalX + 'px';
    paper.style.top = finalY + 'px';
    paper.style.transform = `rotate(${randomRotate}deg)`;
    paper.style.animation = `fallIn 0.8s ease-out, float 4s ease-in-out ${index * 0.5}s infinite`;
    paper.style.animationDelay = `0s, ${index * 0.5}s`;

    paper.dataset.originalX = finalX;
    paper.dataset.originalY = finalY;
    paper.dataset.originalRotate = randomRotate;

    const front = document.createElement('div');
    front.className = 'paper-front';
    front.innerHTML = '💌';

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
        
        for (let i = 0; i < 2; i++) {
            setTimeout(() => createFloatingHeart(), i * 50);
        }
        
        if (currentZoomedPaper && currentZoomedPaper !== this) {
            resetPaper(currentZoomedPaper);
        }

        if (this.classList.contains('zoomed')) {
            resetPaper(this);
        } else {
            this.style.animation = 'none';
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
    
    const originalX = paper.dataset.originalX;
    const originalY = paper.dataset.originalY;
    const originalRotate = paper.dataset.originalRotate;
    
    paper.style.left = originalX + 'px';
    paper.style.top = originalY + 'px';
    paper.style.transform = `rotate(${originalRotate}deg)`;
    
    const index = Array.from(papersContainer.children).indexOf(paper);
    paper.style.animation = `float 4s ease-in-out ${index * 0.5}s infinite`;
    
    currentZoomedPaper = null;
}

overlay.addEventListener('click', function() {
    if (currentZoomedPaper) {
        resetPaper(currentZoomedPaper);
    }
});

setInterval(() => {
    if (papersContainer.classList.contains('visible')) {
        createFloatingHeart();
    }
}, 2000);

// Reposicionar cartas al cambiar tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (papersContainer.classList.contains('visible') && !currentZoomedPaper) {
            papersContainer.innerHTML = '';
            papers.forEach((paper, index) => {
                createPaper(paper, index);
            });
        }
    }, 500);

});