let currentIndex = 0; // Índice da palavra atual
let btn = false;
let knowWords = 0;
const arrDesconhecidas = [];
const flashWord = document.querySelector(".word");
const flashTraducao = document.querySelector(".traducao");
const numberWords = document.querySelector(".numberWords");
const conhecidas = document.querySelector(".conhecidas");
const buttonKnow = document.getElementById("btnKnow");
const buttonDontKnow = document.getElementById("btnDontKnow");
const desconhecidas = document.querySelector(".dont-know-words-container");

function updateDontWords() {
    // Verifica se as palavras já foram carregadas
    if (window.jsonWords && window.jsonWords.length > 0) {
        // Cria um novo elemento div para a palavra desconhecida
        const newElm = document.createElement('div');
        newElm.classList.add("dont-know-word");

        // Cria elementos div para exibir a palavra e sua tradução
        const elmWord = document.createElement('div');
        const elmTranslate = document.createElement('div');

        elmWord.classList.add("dont-know-elmword");
        elmTranslate.classList.add("dont-know-elmtranslate");

        // Obtém a palavra e sua tradução a partir do JSON usando o índice atual
        const currentWord = window.jsonWords[currentIndex]["word"].toUpperCase();
        const currentTranslation = window.jsonWords[currentIndex]["traducao"].toUpperCase();

        // Define o conteúdo dos elementos div criados
        elmWord.innerHTML = currentWord;
        elmTranslate.innerHTML = currentTranslation;

        // Adiciona os elementos div criados ao elemento principal da lista de palavras desconhecidas
        newElm.appendChild(elmWord);
        newElm.appendChild(elmTranslate);

        // Adiciona o novo elemento à lista de palavras desconhecidas
        desconhecidas.appendChild(newElm);
        arrDesconhecidas.push(newElm);
    } else {
        console.error('Erro: Nenhuma palavra disponível.');
    }
}


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
    updateDontWords(); 
    updateWord(false);
});

document.getElementById('bntKnow').addEventListener('click', function() {
    updateWord(true);
});
