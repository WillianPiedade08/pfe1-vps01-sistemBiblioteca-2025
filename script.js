document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os botões de detalhes
  const detailButtons = document.querySelectorAll('.detail-btn');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalYear = document.getElementById('modal-year');
  const modalPublisher = document.getElementById('modal-publisher');
  const modalGenre = document.getElementById('modal-genre');
  const modalDescription = document.getElementById('modal-description');
  const closeModal = document.querySelector('.close-btn');

  // Adiciona evento de clique para cada botão de detalhes
  detailButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // Encontra o card correspondente ao botão clicado
      const card = event.target.closest('.card');

      // Obtém os detalhes do livro
      const title = card.querySelector('h3').textContent;
      const author = card.querySelector('p strong').textContent;
      const year = card.getAttribute('data-year');
      const publisher = card.getAttribute('data-publisher');
      const genre = card.getAttribute('data-genre');
      const description = card.getAttribute('data-description');

      // Preenche o modal com os detalhes do livro
      modalTitle.textContent = `Título: ${title}`;
      modalAuthor.textContent = `Autor: ${author}`;
      modalYear.textContent = `Ano: ${year}`;
      modalPublisher.textContent = `Editora: ${publisher}`;
      modalGenre.textContent = `Gênero: ${genre}`;
      modalDescription.textContent = `Descrição: ${description}`;

      // Exibe o modal
      modal.classList.add('visible');
    });
  });

  // Fecha o modal ao clicar no botão de fechar
  closeModal.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  // Fecha o modal ao clicar fora do conteúdo
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('visible');
    }
  });
});