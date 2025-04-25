/**
 * Sistema de Partículas Animadas
 * Cria partículas flutuantes no fundo da página
 */
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 100;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Posição inicial aleatória para cada partícula
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        // Define um delay aleatório para a animação
        particle.style.setProperty('--delay', Math.random() * 5);
        // Atribui um tipo de animação (0 a 3) para cada partícula
        particle.setAttribute('data-type', i % 4);
        particlesContainer.appendChild(particle);

        // Força um reflow para garantir que a animação seja reiniciada
        particle.offsetHeight;
    }
}

/**
 * Atualiza as partículas periodicamente
 * Remove todas as partículas existentes e cria novas
 */
function refreshParticles() {
    const particlesContainer = document.querySelector('.particles');
    particlesContainer.innerHTML = '';
    createParticles();
}

// Inicializa o sistema de partículas
createParticles();

// Atualiza as partículas a cada 30 segundos para manter a animação fluida
setInterval(refreshParticles, 30000);

/**
 * Sistema de Login e Validação de Senha
 */
// Seleciona os elementos do formulário de login
const loginForm = document.querySelector('form');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

/**
 * Verifica a força da senha inserida
 * @param {string} password - A senha a ser verificada
 * Pontuação baseada em:
 * - Comprimento mínimo de 8 caracteres
 * - Presença de letras minúsculas
 * - Presença de letras maiúsculas
 * - Presença de números
 */
function checkPasswordStrength(password) {
    let strength = 0;
    let message = '';

    // Avalia cada critério de força
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;

    // Atualiza a barra de força e mensagem baseado na pontuação
    if (strength <= 25) {
        strengthBar.style.width = '25%';
        strengthBar.style.background = '#ff4444';
        message = 'Fraca';
    } else if (strength <= 50) {
        strengthBar.style.width = '50%';
        strengthBar.style.background = '#ffbb33';
        message = 'Média';
    } else if (strength <= 75) {
        strengthBar.style.width = '75%';
        strengthBar.style.background = '#00C851';
        message = 'Boa';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#007E33';
        message = 'Forte';
    }

    strengthText.textContent = message;
}

// Monitora mudanças no campo de senha
senhaInput.addEventListener('input', (e) => {
    checkPasswordStrength(e.target.value);
});

// Manipula o envio do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // TODO: Implementar lógica de autenticação
    console.log('Usuário:', usuarioInput.value);
    console.log('Senha:', senhaInput.value);
    console.log('Lembrar-me:', document.getElementById('lembrar').checked);
});

/**
 * Sistema de Animação ao Scroll
 */
/**
 * Verifica se um elemento está visível na viewport
 * @param {HTMLElement} el - Elemento a ser verificado
 * @returns {boolean} - True se o elemento estiver visível
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Considera o elemento visível quando 30% dele está na tela
    const elementVisible = 30;
    
    return (
        rect.top <= (windowHeight - elementVisible) &&
        rect.bottom >= elementVisible
    );
}

/**
 * Gerencia a visibilidade dos elementos durante o scroll
 * Adiciona/remove a classe 'visible' baseado na posição do elemento
 */
function handleScroll() {
    const sections = document.querySelectorAll('.quem-somos, .objetivo-marca, .avaliacoes, .comentarios');
    
    sections.forEach(section => {
        const isVisible = isElementInViewport(section);
        
        if (isVisible) {
            section.classList.add('visible');
        } else if (section.getBoundingClientRect().top > window.innerHeight) {
            // Remove a classe apenas se o elemento estiver acima da viewport
            section.classList.remove('visible');
        }
    });
}

// Implementa throttle no evento de scroll para melhor performance
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Inicializa a verificação de elementos visíveis
window.addEventListener('load', handleScroll);
window.addEventListener('resize', handleScroll);

/**
 * Sistema de Comentários
 */
const comentarioForm = document.getElementById('comentarioForm');
if (comentarioForm) {
    comentarioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;
        const mensagem = document.getElementById('mensagem').value;
        
        // TODO: Implementar envio dos dados para o servidor
        console.log('Comentário enviado:', { nome, email, rating, mensagem });
        
        // Feedback para o usuário
        alert('Obrigado pelo seu comentário!');
        
        // Limpa o formulário
        comentarioForm.reset();
    });
} 