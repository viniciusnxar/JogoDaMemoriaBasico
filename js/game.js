// Selecionar elementos HTML
const grid = document.querySelector('.grid'); // Elemento HTML que representa a grade do jogo
const spanPlayer = document.querySelector('.player'); // Elemento HTML que exibe o nome do jogador
const timer = document.querySelector('.timer'); // Elemento HTML que exibe o tempo decorrido

// Lista de caracteres utilizados no jogo
const characters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// Função auxiliar para criar elementos HTML
const createElement = (tag, className) => {
  const element = document.createElement(tag); // Criar um novo elemento HTML com a tag fornecida
  element.className = className; // Definir a classe do elemento
  return element;
}

// Variáveis para armazenar as cartas selecionadas
let firstCard = '';
let secondCard = '';

// Verificar o fim do jogo
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card'); // Selecionar todas as cartas desabilitadas

  // Se o número de cartas desabilitadas for igual a 20 (todas as cartas do jogo), encerrar o loop do timer e exibir uma mensagem de parabéns ao jogador
  if (disabledCards.length === 20) {
    clearInterval(this.loop); // Interromper o loop do timer
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

// Verificar se as cartas selecionadas são correspondentes
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character'); // Obter o caractere da primeira carta selecionada
  const secondCharacter = secondCard.getAttribute('data-character'); // Obter o caractere da segunda carta selecionada

  // Se os caracteres forem iguais, adicionar a classe "disabled-card" aos elementos filhos das cartas e verificar o fim do jogo
  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    // Se os caracteres forem diferentes, remover a classe "reveal-card" das cartas após um atraso de 500 milissegundos
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

// Revelar a carta clicada
const revealCard = ({ target }) => {
  // Verificar se a carta já está revelada, caso esteja, retornar
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    // Se a primeira carta ainda não estiver definida, definir a carta atual como a primeira carta
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
    // Se a segunda carta ainda não estiver definida, definir a carta atual como a segunda carta e verificar as cartas selecionadas
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}

// Criar uma carta com base no caractere fornecido
const createCard = (character) => {
  const card = createElement('div', 'card'); // Criar um elemento HTML com a classe "card"
  const front = createElement('div', 'face front'); // Criar um elemento HTML com a classe "face front"
  const back = createElement('div', 'face back'); // Criar um elemento HTML com a classe "face back"

  front.style.backgroundImage = `url('../images/${character}.png')`; // Definir a imagem de fundo da face frontal com base no caractere

  card.appendChild(front); // Adicionar a face frontal à carta
  card.appendChild(back); // Adicionar a face traseira à carta

  card.addEventListener('click', revealCard); // Adicionar um ouvinte de evento de clique à carta para revelá-la
  card.setAttribute('data-character', character); // Definir o atributo "data-character" da carta para armazenar o caractere

  return card; // Retornar a carta criada
}

// Carregar o jogo da memória
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]; // Duplicar os caracteres do jogo

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); // Embaralhar a matriz de caracteres

  shuffledArray.forEach((character) => {
    const card = createCard(character); // Criar uma carta para cada caractere embaralhado
    grid.appendChild(card); // Adicionar a carta à grade do jogo
  });
}

// Iniciar o temporizador do jogo
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML; // Obter o tempo atual do timer convertendo-o em número
    timer.innerHTML = currentTime + 1; // Incrementar o tempo em 1 segundo
  }, 1000);
}

// Manipular o evento de carregamento da janela
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player'); // Obter o nome do jogador do armazenamento local e exibi-lo no elemento spanPlayer
  startTimer(); // Iniciar o temporizador do jogo
  loadGame(); // Carregar o jogo da memória
}
