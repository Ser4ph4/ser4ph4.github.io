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

    // --- Lógica do Modal de Imagem ---
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeButton = document.getElementsByClassName("close-button")[0];

    // Seleciona todas as imagens dentro dos itens da grade de imagens
    const images = document.querySelectorAll(".image-item img");

    // Adiciona um listener de clique a cada imagem da galeria
    images.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "flex"; // Usa flex para centralizar o modal
            modalImage.src = this.src; // Define a imagem do modal como a imagem clicada
            captionText.innerHTML = this.alt; // Define a legenda do modal como o texto alt da imagem
        });
    });

    // Adiciona um listener de clique ao botão de fechar o modal
    closeButton.addEventListener("click", function() {
        modal.style.display = "none"; // Esconde o modal
    });

    // Adiciona um listener de clique na janela para fechar o modal se o clique for fora da imagem
    window.addEventListener("click", function(event) {
        if (event.target == modal) { // Se o clique foi no próprio fundo do modal
            modal.style.display = "none"; // Esconde o modal
        }
    });
});
