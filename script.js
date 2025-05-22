// Função para calcular e atualizar o contador
function updateCounter() {
    // Data de início (quando vocês se conheceram) - atualizada para 22/03/2025
    const startDate = new Date('2025-03-22T00:00:00');
    const currentDate = new Date();
    
    // Calcula a diferença em milissegundos
    const difference = currentDate - startDate;
    
    // Converte para dias, horas, minutos e segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Atualiza os elementos HTML com animação
    animateCounterUpdate('days', days);
    animateCounterUpdate('hours', hours);
    animateCounterUpdate('minutes', minutes);
    animateCounterUpdate('seconds', seconds);
}

// Função para animar a atualização dos números
function animateCounterUpdate(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);
    
    // Se o valor for diferente, anima a mudança
    if (currentValue !== newValue) {
        element.classList.add('updating');
        
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('updating');
        }, 300);
    }
}

// Adiciona efeitos visuais aos placeholders de fotos
function addPhotoEffects() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach((placeholder, index) => {
        // Adiciona delay na animação para cada foto
        placeholder.style.animationDelay = `${index * 0.1}s`;
        
        // Adiciona efeito de hover com rotação aleatória
        placeholder.addEventListener('mouseover', () => {
            const randomRotate = Math.random() * 10 - 5; // Entre -5 e 5 graus
            placeholder.style.transform = `scale(1.1) rotate(${randomRotate}deg)`;
            placeholder.style.boxShadow = '0 8px 25px rgba(255, 94, 98, 0.5)';
            placeholder.style.borderColor = '#ff9966';
        });
        
        placeholder.addEventListener('mouseout', () => {
            placeholder.style.transform = 'scale(1) rotate(0deg)';
            placeholder.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            placeholder.style.borderColor = '#ff5e62';
        });
        
        // Adiciona efeito de aparecer gradualmente
        placeholder.classList.add('fade-in');
    });
}

// Cria corações flutuantes animados
function createFloatingHearts() {
    const container = document.querySelector('.container');
    const heartColors = ['#ff5e62', '#ff9966', '#e91e63', '#d81b60', '#fce4ec'];
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 25 + 10;
        
        // Velocidade aleatória
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        // Cor aleatória
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        
        // Aplica estilos
        heart.style.left = `${posX}%`;
        heart.style.top = `${posY}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.backgroundColor = color;
        heart.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        heart.style.opacity = Math.random() * 0.5 + 0.1; // Opacidade entre 0.1 e 0.6
        
        // Adiciona ao container
        container.appendChild(heart);
    }
}

// Adiciona efeitos de partículas brilhantes
function createSparkles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 70; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 5 + 1;
        
        // Velocidade aleatória
        const duration = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        
        // Aplica estilos
        sparkle.style.left = `${posX}%`;
        sparkle.style.top = `${posY}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
        
        // Adiciona ao container
        container.appendChild(sparkle);
    }
}

// Adiciona efeito de zoom nas fotos ao clicar
function addPhotoZoomEffect() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // Cria overlay para zoom
            const overlay = document.createElement('div');
            overlay.classList.add('photo-overlay');
            
            // Cria clone da foto para mostrar ampliada
            const photoClone = placeholder.cloneNode(true);
            photoClone.classList.add('photo-zoomed');
            
            // Adiciona botão de fechar
            const closeButton = document.createElement('div');
            closeButton.classList.add('close-button');
            closeButton.innerHTML = '&times;';
            
            // Adiciona ao DOM
            overlay.appendChild(photoClone);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
            
            // Anima a entrada
            setTimeout(() => {
                overlay.classList.add('active');
                photoClone.classList.add('active');
            }, 10);
            
            // Configura fechamento
            closeButton.addEventListener('click', () => {
                overlay.classList.remove('active');
                photoClone.classList.remove('active');
                
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });
}

// Adiciona efeito de coração pulsante nos cantos da frase especial
function animateHeartDecorations() {
    const heartDecorations = document.querySelectorAll('.heart-decoration');
    
    heartDecorations.forEach((heart, index) => {
        // Adiciona delay para cada coração
        heart.style.animationDelay = `${index * 0.2}s`;
    });
}

// Adiciona efeito de brilho nos corações principais
function addHeartGlow() {
    const fancyHearts = document.querySelectorAll('.fancy-heart');
    
    fancyHearts.forEach((heart, index) => {
        // Adiciona delay para cada coração
        heart.style.animationDelay = `${index * 0.3}s`;
        
        // Adiciona efeito de brilho
        const glow = document.createElement('div');
        glow.classList.add('heart-glow');
        heart.appendChild(glow);
    });
}

// Adiciona estilos CSS para os elementos animados
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .floating-heart {
            position: absolute;
            z-index: -1;
            border-radius: 50%;
            transform: rotate(45deg);
            pointer-events: none;
        }
        
        .floating-heart::before,
        .floating-heart::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: inherit;
            border-radius: 50%;
        }
        
        .floating-heart::before {
            left: -50%;
        }
        
        .floating-heart::after {
            top: -50%;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(45deg);
            }
            50% {
                transform: translateY(-100px) rotate(45deg);
            }
            100% {
                transform: translateY(0) rotate(45deg);
            }
        }
        
        .sparkle {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            z-index: -1;
            pointer-events: none;
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes twinkle {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0.5);
            }
        }
        
        .updating {
            animation: update-bounce 0.5s ease;
        }
        
        @keyframes update-bounce {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .fade-in {
            opacity: 0;
            animation: fade-in 0.8s forwards;
        }
        
        @keyframes fade-in {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .photo-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .photo-overlay.active {
            opacity: 1;
        }
        
        .photo-zoomed {
            width: 80%;
            max-width: 800px;
            height: auto;
            max-height: 80vh;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .photo-zoomed.active {
            transform: scale(1);
        }
        
        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 94, 98, 0.8);
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .close-button:hover {
            background-color: rgba(255, 94, 98, 1);
        }
        
        .heart-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            filter: blur(10px);
            background: inherit;
            opacity: 0.5;
            animation: glow-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow-pulse {
            0% {
                opacity: 0.3;
                transform: scale(1.1);
            }
            100% {
                opacity: 0.7;
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Inicializa quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona estilos para animações
    addAnimationStyles();
    
    // Atualiza o contador imediatamente
    updateCounter();
    
    // Configura atualização a cada segundo
    setInterval(updateCounter, 1000);
    
    // Adiciona efeitos visuais
    addPhotoEffects();
    createFloatingHearts();
    createSparkles();
    addPhotoZoomEffect();
    animateHeartDecorations();
    addHeartGlow();
    
    // Adiciona animação de entrada para elementos principais
    document.querySelector('.counter-section').classList.add('fade-in');
    document.querySelector('.special-phrase').classList.add('fade-in');
    document.querySelector('.photo-gallery').classList.add('fade-in');
    
    // Adiciona efeito de digitação para a frase especial
    const specialPhrase = document.querySelector('.special-phrase p');
    const originalText = specialPhrase.textContent;
    specialPhrase.textContent = '';
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            specialPhrase.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
});
