document.addEventListener('DOMContentLoaded', () => {
  
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalYear = document.getElementById('modal-year');
  const modalGenre = document.getElementById('modal-genre');
  const modalPublisher = document.getElementById('modal-publisher');
  const modalDescription = document.getElementById('modal-description');
  const closeModal = document.querySelector('.close-btn');

  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('visible');
    }
  });

  
  const addDetailEvent = (button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');

      const title = card.querySelector('h3').textContent;
      const author = card.querySelector('p strong').textContent;
      const year = card.getAttribute('data-year');
      const publisher = card.getAttribute('data-publisher');
      const genre = card.getAttribute('data-genre');
      const description = card.getAttribute('data-description');

      modalTitle.textContent = `Título: ${title}`;
      modalAuthor.textContent = `Autor: ${author}`;
      modalYear.textContent = `Ano: ${year}`;
      modalPublisher.textContent = `Editora: ${publisher}`;
      modalGenre.textContent = `Gênero: ${genre}`;
      modalDescription.textContent = `Descrição: ${description}`;

      modal.classList.add('visible');
    });
  };

  const detailButtons = document.querySelectorAll('.detail-btn');
  detailButtons.forEach(addDetailEvent);

  
  const registerBtn = document.getElementById('register-btn');
  const registerCard = document.getElementById('register-card');

  registerBtn.addEventListener('click', () => {
    registerCard.style.display =
      registerCard.style.display === 'none' || registerCard.style.display === ''
        ? 'block'
        : 'none';
  });

  
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', () => {
    const title = document.getElementById('book-Livro').value;
    const author = document.getElementById('book-Leitor').value;
    const cpf = document.getElementById('book-CPF').value;
    const rentalDate = document.getElementById('book-Data de Locação').value;
    const returnDate = document.getElementById('book-Data Prevista de Devolução').value;

    if (title && author && cpf && rentalDate && returnDate) {
      const cardContainer = document.querySelector('.card-container');

      
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.setAttribute('data-year', rentalDate);
      newCard.setAttribute('data-publisher', 'N/A');
      newCard.setAttribute('data-genre', 'N/A');
      newCard.setAttribute('data-description', `Locação: ${rentalDate}, Devolução: ${returnDate}`);

      newCard.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Autor:</strong> ${author}</p>
        <p><strong>CPF:</strong> ${cpf}</p>
        <button class="detail-btn">Detalhes</button>
      `;

      
      const newDetailBtn = newCard.querySelector('.detail-btn');
      addDetailEvent(newDetailBtn);

      cardContainer.appendChild(newCard);

      
      document.getElementById('book-Livro').value = '';
      document.getElementById('book-Leitor').value = '';
      document.getElementById('book-CPF').value = '';
      document.getElementById('book-Data de Locação').value = '';
      document.getElementById('book-Data Prevista de Devolução').value = '';

     
      registerCard.style.display = 'none';
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  });
});