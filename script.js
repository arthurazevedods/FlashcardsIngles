let currentIndex = 0; // Índice da palavra atual

// Função para obter um número aleatório entre 0 e max (exclusivo)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateWord() {
    const flashWord = document.querySelector(".word");
    const flashAnswer = document.querySelector(".answer");

    // Verifica se as palavras já foram carregadas
    if (window.jsonWords && window.jsonWords.length > 0) {
        // Exibe a palavra atual
        flashWord.innerHTML = window.jsonWords[currentIndex]["word"];
        flashAnswer.innerHTML = window.jsonWords[currentIndex]["traducao"];

        // Atualiza o índice para a próxima palavra (lista circular)
        currentIndex = (currentIndex + 1) % window.jsonWords.length;
    } else {
        console.error('Erro: Nenhuma palavra disponível.');
    }
}

// Adiciona um ouvinte de evento para o evento 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function () {
    // Use a função fetch para carregar o arquivo JSON
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            // Faça algo com os dados carregados, por exemplo, atribua-os a uma variável global
            window.jsonWords = data;

            // Atualiza a palavra assim que os dados forem carregados
            updateWord();
        })
        .catch(error => {
            console.error('Erro ao carregar palavras:', error);
        });
});

// Adiciona um ouvinte de evento para o botão 'changeButton'
document.getElementById('changeButton').addEventListener('click', updateWord);