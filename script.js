// Criação das partículas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 100;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Posição inicial aleatória
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        // Delay menor e mais consistente
        particle.style.setProperty('--delay', Math.random() * 5);
        // Garantir que cada partícula tenha um tipo de 0 a 3
        particle.setAttribute('data-type', i % 4);
        particlesContainer.appendChild(particle);

        // Forçar reflow para reiniciar a animação
        particle.offsetHeight;
    }
}

// Recriar partículas periodicamente para evitar que fiquem paradas
function refreshParticles() {
    const particlesContainer = document.querySelector('.particles');
    particlesContainer.innerHTML = '';
    createParticles();
}

// Inicializar partículas
createParticles();

// Recriar partículas a cada 30 segundos
setInterval(refreshParticles, 30000);

// Selecionando elementos do formulário
const loginForm = document.querySelector('form');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

// Função para verificar força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    let message = '';

    // Critérios de força
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;

    // Definir cor e mensagem baseado na força
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

// Evento de input da senha
senhaInput.addEventListener('input', (e) => {
    checkPasswordStrength(e.target.value);
});

// Evento de submit do formulário
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica de autenticação no futuro
    console.log('Usuário:', usuarioInput.value);
    console.log('Senha:', senhaInput.value);
    console.log('Lembrar-me:', document.getElementById('lembrar').checked);
}); 