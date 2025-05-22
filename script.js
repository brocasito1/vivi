document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const startDateInput = document.getElementById('start-date');
    const setDateButton = document.getElementById('set-date');
    const loveMessage = document.getElementById('love-message');
    const photoGallery = document.getElementById('photo-gallery');
    
    // Mensagens românticas para exibir aleatoriamente
    const romanticMessages = [
        "Você é a pessoa mais especial do mundo para mim. Cada momento ao seu lado é um presente que guardo com carinho no meu coração. Te amo mais a cada dia que passa!",
        "Meu amor por você cresce a cada segundo. Você é minha inspiração, minha alegria e meu porto seguro.",
        "Não importa quanto tempo passe, meu coração sempre baterá mais forte por você. Te amo infinitamente!",
        "Cada segundo ao seu lado vale mais que uma eternidade longe de você. Obrigado(a) por fazer parte da minha vida.",
        "Você é o sonho que eu não sabia que tinha, e agora não consigo imaginar minha vida sem você.",
        "Meu amor por você é como as estrelas: mesmo quando não dá para ver, continua lá, brilhando eternamente.",
        "Seu sorriso ilumina meus dias, seu abraço aquece meu coração, e seu amor dá sentido à minha vida.",
        "Amo cada detalhe seu, cada gesto, cada palavra. Você é perfeito(a) para mim em todos os sentidos.",
        "Nosso amor é como um conto de fadas, mas melhor, porque é real e cresce a cada dia.",
        "Você me faz querer ser uma pessoa melhor a cada dia. Obrigado(a) por me inspirar com seu amor."
    ];
    
    // Data padrão (pode ser alterada pelo usuário)
    let startDate = new Date('2024-03-22');
    startDate.setMonth(startDate.getMonth() - 6); // Por padrão, 6 meses atrás
    
    // Formatar a data para o input
    const formattedDate = formatDateForInput(startDate);
    startDateInput.value = formattedDate;
    
    // Iniciar o contador
    updateCounter();
    setInterval(updateCounter, 1000);
    
    // Alternar mensagens românticas a cada 10 segundos
    setInterval(changeMessage, 10000);
    
    // Evento para definir nova data
    setDateButton.addEventListener('click', function() {
        const newDate = new Date(startDateInput.value);
        if (!isNaN(newDate.getTime())) {
            startDate = newDate;
            localStorage.setItem('loveStartDate', startDate.toISOString());
            updateCounter();
            
            // Adicionar efeito visual de confirmação
            this.classList.add('confirmed');
            setTimeout(() => {
                this.classList.remove('confirmed');
            }, 1000);
            
            // Adicionar corações flutuantes como celebração
            createCelebrationHearts();
        } else {
            alert('Por favor, insira uma data válida.');
        }
    });
    
    // Verificar se há uma data salva no localStorage
    const savedDate = localStorage.getItem('loveStartDate');
    if (savedDate) {
        startDate = new Date(savedDate);
        startDateInput.value = formatDateForInput(startDate);
    }
    
    // Configurar os placeholders de fotos para upload
    setupPhotoPlaceholders();
    
    // Carregar fotos salvas do localStorage
    loadSavedPhotos();
    
    // Adicionar efeitos de hover aos elementos de tempo
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        unit.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Função para atualizar o contador
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        // Converter milissegundos para unidades de tempo
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        
        // Atualizar elementos na página com animação
        updateElementWithAnimation(yearsElement, years);
        updateElementWithAnimation(monthsElement, months);
        updateElementWithAnimation(daysElement, days);
        updateElementWithAnimation(hoursElement, hours);
        updateElementWithAnimation(minutesElement, minutes);
        updateElementWithAnimation(secondsElement, seconds);
    }
    
    // Função para atualizar elemento com animação
    function updateElementWithAnimation(element, value) {
        const currentValue = parseInt(element.textContent);
        if (currentValue !== value) {
            element.classList.add('updating');
            setTimeout(() => {
                element.textContent = value;
                element.classList.remove('updating');
            }, 300);
        } else {
            element.textContent = value;
        }
    }
    
    // Função para alternar mensagens românticas
    function changeMessage() {
        const randomIndex = Math.floor(Math.random() * romanticMessages.length);
        
        // Adicionar classe para animação de fade
        loveMessage.classList.add('fade');
        
        // Atualizar texto após fade out
        setTimeout(() => {
            loveMessage.textContent = romanticMessages[randomIndex];
            loveMessage.classList.remove('fade');
        }, 500);
    }
    
    // Função para configurar os placeholders de fotos
    function setupPhotoPlaceholders() {
        const placeholders = document.querySelectorAll('.photo-placeholder');
        
        placeholders.forEach((placeholder) => {
            const position = placeholder.dataset.position;
            
            placeholder.addEventListener('click', function() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        
                        reader.onload = function(event) {
                            const photoUrl = event.target.result;
                            createPhotoElement(photoUrl, position, placeholder);
                            
                            // Salvar no localStorage
                            savePhotoToLocalStorage(photoUrl, position);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                };
                
                input.click();
            });
        });
    }
    
    // Função para criar elemento de foto
    function createPhotoElement(photoUrl, position, placeholder) {
        // Criar novo elemento para a foto
        const photoItem = document.createElement('div');
        photoItem.className = placeholder.classList.contains('main-photo') ? 'photo-item main-photo' : 'photo-item';
        photoItem.dataset.position = position;
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'Foto do nosso amor';
        
        photoItem.appendChild(img);
        
        // Substituir o placeholder pela foto
        placeholder.parentNode.replaceChild(photoItem, placeholder);
        
        // Adicionar evento de clique para trocar a foto
        photoItem.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const newPhotoUrl = event.target.result;
                        img.src = newPhotoUrl;
                        
                        // Adicionar efeito de transição
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 50);
                        
                        // Atualizar no localStorage
                        savePhotoToLocalStorage(newPhotoUrl, position);
                    };
                    
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
        
        // Adicionar efeito de entrada
        photoItem.style.opacity = '0';
        photoItem.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            photoItem.style.opacity = '1';
            photoItem.style.transform = 'scale(1)';
        }, 50);
    }
    
    // Função para salvar foto no localStorage
    function savePhotoToLocalStorage(photoUrl, position) {
        const savedPhotos = JSON.parse(localStorage.getItem('lovePhotos') || '{}');
        savedPhotos[position] = photoUrl;
        localStorage.setItem('lovePhotos', JSON.stringify(savedPhotos));
    }
    
    // Função para carregar fotos salvas do localStorage
    function loadSavedPhotos() {
        const savedPhotos = JSON.parse(localStorage.getItem('lovePhotos') || '{}');
        
        for (const [position, photoUrl] of Object.entries(savedPhotos)) {
            const placeholder = document.querySelector(`.photo-placeholder[data-position="${position}"]`);
            if (placeholder) {
                createPhotoElement(photoUrl, position, placeholder);
            }
        }
    }
    
    // Função para criar corações de celebração
    function createCelebrationHearts() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            heart.style.opacity = Math.random() * 0.7 + 0.3;
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.color = `hsl(${Math.random() * 30 + 340}, 100%, 65%)`;
            
            container.appendChild(heart);
            
            // Remover após animação
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }
    
    // Função para formatar data para o input
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Adicionar estilos dinâmicos para os corações de celebração
    const style = document.createElement('style');
    style.textContent = `
        .celebration-heart {
            position: absolute;
            animation: float-up-celebration 3s forwards;
            z-index: 100;
            pointer-events: none;
        }
        
        @keyframes float-up-celebration {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .time-unit.updating {
            animation: update-bounce 0.6s;
        }
        
        @keyframes update-bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .confirmed {
            background: linear-gradient(135deg, #ff4d73, #ff8da1) !important;
            transform: scale(1.1) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar efeitos de parallax para elementos flutuantes
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const hearts = document.querySelectorAll('.floating-heart');
        const stars = document.querySelectorAll('.floating-star');
        
        hearts.forEach(heart => {
            heart.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        });
        
        stars.forEach(star => {
            star.style.transform = `translate(${moveX * -0.3}px, ${moveY * -0.3}px)`;
        });
    });
});
