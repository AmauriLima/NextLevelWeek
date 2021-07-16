import Modal from './modal.js'

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDesc = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button')

// Pegar todos os botões
const checkButtons = document.querySelectorAll('.actions a.check');

checkButtons.forEach(button => {
  // adicionar a escuta
  button.addEventListener('click', handleClick);
})

const deleteButtons = document.querySelectorAll('.actions a.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false) );
})

function handleClick(event, check = true) {
  event.preventDefault();
  const text = check ? 'Marcar como lida' : "Excluir";
  const slug = check ? 'check' : 'delete';
  const roomId = document.querySelector('#room-id').dataset.id;
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form');
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = check ? `${text}` : `${text} esta pergunta`;
  modalDesc.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red');
  
  // abrir modal
  modal.open();
}


const buttonCopy = document.querySelector('#room-id');

buttonCopy.addEventListener('click', () => {
  const textToCopy = document.querySelector('#room-id p')
  
  let elementText = textToCopy.innerHTML;
  
  let inputElement = document.createElement('input');
  inputElement.setAttribute('value', elementText);
  document.body.appendChild(inputElement);
  
  inputElement.select();
  
  document.execCommand('copy');

  inputElement.parentNode.removeChild(inputElement);
})
