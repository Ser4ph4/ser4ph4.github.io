// Adiciona um listener para garantir que o script só rode depois que o DOM for carregado
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para o efeito de digitação da logo
    const logoTerminal = document.getElementById('logo-terminal');
    // O texto da logo foi alterado para "Ser4ph4 - Project" com símbolos e o cursor piscante
    const logoText = ">>> Ser4ph4 - Project //_"; // O "_" será o cursor piscante.
    let i = 0;
    let deleting = false;
    const typingSpeed = 100; // Velocidade de digitação (em milissegundos)
    const deletingSpeed = 50; // Velocidade de exclusão (em milissegundos)
    const delayBetweenCycles = 2000; // Atraso entre o ciclo de digitação e exclusão (em milissegundos)

    /**
     * Função para simular o efeito de digitação e exclusão em um terminal.
     */
    function typeWriter() {
        // Se não estiver apagando e ainda há texto para digitar
        if (!deleting && i < logoText.length) {
            // Adiciona o próximo caractere
            logoTerminal.textContent += logoText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed); // Chama a função novamente após um atraso
        }
        // Se estiver apagando e ainda há texto para remover
        else if (deleting && i > 0) {
            // Remove o último caractere
            logoTerminal.textContent = logoText.substring(0, i - 1);
            i--;
            setTimeout(typeWriter, deletingSpeed); // Chama a função novamente após um atraso
        }
        // Se terminou de digitar, inicia o processo de exclusão após um atraso
        else if (!deleting && i === logoText.length) {
            deleting = true;
            setTimeout(typeWriter, delayBetweenCycles);
        }
        // Se terminou de apagar, inicia o processo de digitação novamente após um atraso
        else if (deleting && i === 0) {
            deleting = false;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Adiciona a classe para o cursor piscante no início
    logoTerminal.classList.add('blink-caret');

    // Inicia o efeito de digitação
    typeWriter();


    // Script para o background animado estilo Matrix
    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');

    // Define o tamanho inicial do canvas para preencher a janela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres que serão usados na animação
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;<>,.?/~';
    const fontSize = 18; // Tamanho da fonte dos caracteres
    // Calcula o número de colunas baseado na largura do canvas e tamanho da fonte
    const columns = canvas.width / fontSize;

    // Array para armazenar a posição 'y' de cada "gota" em cada coluna
    const drops = [];
    // Inicializa a posição 'y' de cada gota para 1
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    /**
     * Função principal para desenhar a animação do Matrix.
     */
    function drawMatrix() {
        // Preenche o canvas com um fundo preto semi-transparente para o efeito de rastro
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)'; /* Cor de fundo do body, com transparência */
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Define a cor e a fonte para os caracteres
        ctx.fillStyle = '#00ff00'; // Verde neon
        ctx.font = `${fontSize}px Fira Code`; /* Fonte do Matrix agora é Fira Code */

        // Itera sobre cada "gota" (coluna)
        for (let i = 0; i < drops.length; i++) {
            // Pega um caractere aleatório da string de caracteres
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            // Desenha o caractere na posição (i * fontSize, drops[i] * fontSize)
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Se a "gota" atingir a parte inferior da tela ou um ponto aleatório,
            // ela volta ao topo para recomeçar a cair
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Incrementa a posição 'y' da gota, fazendo-a cair
            drops[i]++;
        }
    }

    // Inicia o loop de animação
    setInterval(drawMatrix, 35); // Atualiza a cada 35 milissegundos para um bom fluxo

    // Lida com o redimensionamento da janela para ajustar o canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Recalcula o número de colunas após o redimensionamento
        const columns = canvas.width / fontSize;
        // Redimensiona o array de "drops" se necessário
        while (drops.length < columns) {
            drops.push(0);
        }
        drops.length = columns; // Ajusta o tamanho do array se a janela diminuir
    });

    // --- Lógica do Modal de Imagem (presente apenas em gallery.html) ---
    // Verifica se os elementos do modal existem antes de adicionar listeners
    const modal = document.getElementById("imageModal");
    if (modal) { // Só executa se estiver na página gallery.html
        const modalImage = document.getElementById("modalImage");
        const captionText = document.getElementById("caption");
        const closeButton = document.getElementsByClassName("close-button")[0];

        const images = document.querySelectorAll(".image-item img");

        images.forEach(img => {
            img.addEventListener("click", function() {
                modal.style.display = "flex";
                modalImage.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });

        closeButton.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // --- Lógica do Formulário de Contato (presente apenas em contact.html) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) { // Só executa se estiver na página contact.html
        contactForm.addEventListener('submit', async function(event) { // Adicionado 'async' aqui
            event.preventDefault(); // Impede o envio padrão do formulário

            // Reseta a mensagem do formulário
            formMessage.textContent = '';
            formMessage.className = 'form-message'; // Remove classes de sucesso/erro

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validação básica do lado do cliente
            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'Erro: Todos os campos são obrigatórios.';
                formMessage.classList.add('error');
                return; // Impede o processamento posterior
            }

            // Validação de formato de email simples
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Erro: Por favor, insira um endereço de e-mail válido.';
                formMessage.classList.add('error');
                return;
            }

            // Mostra uma mensagem de "enviando..."
            formMessage.textContent = 'Enviando transmissão... Aguarde.';
            formMessage.classList.add('success'); // Pode ser uma classe diferente para 'info'

            try {
                // Endpoint do Formspree para envio AJAX.
                // IMPORTANTE: Substitua 'YOUR_FORMSPREE_FORM_ID' pelo ID do seu formulário no Formspree.
                // Você pode encontrar este ID após criar um formulário em https://formspree.io/
                const formspreeEndpoint = 'https://formspree.io/f/mldnbqbz';

                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' // Importante para receber JSON de volta
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (response.ok) { // Verifica se a resposta foi bem-sucedida (status 2xx)
                    formMessage.textContent = 'Transmissão enviada com sucesso! Em breve entraremos em contato.';
                    formMessage.classList.add('success');
                    contactForm.reset(); // Limpa o formulário
                } else {
                    // Tenta ler a mensagem de erro do Formspree se houver
                    const errorData = await response.json();
                    const errorMessage = errorData.error || 'Erro ao enviar transmissão. Tente novamente mais tarde.';
                    formMessage.textContent = `Erro: ${errorMessage}`;
                    formMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Erro de rede ou Formspree:', error);
                formMessage.textContent = 'Erro de conexão. Verifique sua rede e tente novamente.';
                formMessage.classList.add('error');
            }
        });
    }
});
