let currentIndex = 0; // Índice da palavra atual
let btn = false;
let knowWords = 0;
const flashWord = document.querySelector(".word");
const flashTraducao = document.querySelector(".traducao");
const numberWords = document.querySelector(".numberWords");
const conhecidas = document.querySelector(".conhecidas");
const buttonKnow = document.getElementById("btnKnow");
const buttonDontKnow = document.getElementById("btnDontKnow");


function updateWord(btn) {
    // Verifica se as palavras já foram carregadas
    if (window.jsonWords && window.jsonWords.length > 0) {
        if(btn == true) {
            knowWords++;
        }
        //Atualiza as informações
        numberWords.innerHTML = `${currentIndex}/${window.jsonWords.length}`
        conhecidas.innerHTML = `${knowWords}`;
        // Exibe a palavra atual
        flashWord.innerHTML = window.jsonWords[currentIndex]["word"].toUpperCase();
        flashTraducao.innerHTML = window.jsonWords[currentIndex]["traducao"].toUpperCase();
        
        // Atualiza o índice para a próxima palavra (lista circular)
        currentIndex = (currentIndex + 1) % window.jsonWords.length;
        if(currentIndex == 0){
            knowWords = -1;
        }
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
            updateWord(false);
        })
        .catch(error => {
            console.error('Erro ao carregar palavras:', error);
        });
});

// Adiciona um ouvinte de evento para o botão 'changeButton'
document.getElementById('changeButton').addEventListener('click', function() {
    updateWord(false);
});
document.getElementById('bntDontKnow').addEventListener('click', function() {
    updateWord(false);
});

document.getElementById('bntKnow').addEventListener('click', function() {
    updateWord(true);
});
