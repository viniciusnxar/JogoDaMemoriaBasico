// Selecionar elementos HTML
const input = document.querySelector('.login-input'); // Elemento de entrada de texto para o nome do jogador
const button = document.querySelector('.login-button'); // Botão de envio do formulário
const form = document.querySelector('.login-form'); // Formulário de login

// Função para validar a entrada de texto
const validateInput = ({ target }) => {
  const { value } = target; // Obter o valor da entrada de texto

  // Verificar se o valor tem mais de um caractere
  if (value.length > 1) {
    button.removeAttribute('disabled'); // Remover o atributo "disabled" do botão
    return;
  }

  button.setAttribute('disabled', ''); // Adicionar o atributo "disabled" ao botão
};

// Função para manipular o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault(); // Impedir o comportamento padrão de envio do formulário

  // Armazenar o nome do jogador no armazenamento local
  localStorage.setItem('player', input.value);

  // Redirecionar para a página do jogo
  window.location = 'pages/game.html';
};

// Adicionar um ouvinte de evento de entrada de texto à entrada de texto
input.addEventListener('input', validateInput);

// Adicionar um ouvinte de evento de envio de formulário ao formulário
form.addEventListener('submit', handleSubmit);
