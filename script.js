const livros = [
    {
        "id": 1,
        "titulo": "Dom Quixote",
        "autor": "Miguel de Cervantes",
        "ano": 1605,
        "editora": "Editora Clássicos",
        "genero": "Romance",
        "descricao": "Um romance satírico sobre um fidalgo que acredita ser um cavaleiro andante."
    },
    {
        "id": 2,
        "titulo": "1984",
        "autor": "George Orwell",
        "ano": 1949,
        "editora": "Companhia das Letras",
        "genero": "Distopia",
        "descricao": "Um retrato sombrio de um futuro totalitário."
    },
    {
        "id": 3,
        "titulo": "A Revolução dos Bichos",
        "autor": "George Orwell",
        "ano": 1945,
        "editora": "Editora B",
        "genero": "Fábula política",
        "descricao": "Uma alegoria sobre o totalitarismo disfarçado de fábula animal."
    },
    {
        "id": 4,
        "titulo": "O Pequeno Príncipe",
        "autor": "Antoine de Saint-Exupéry",
        "ano": 1943,
        "editora": "Agir",
        "genero": "Infantil/Filosófico",
        "descricao": "Um conto filosófico com críticas sociais sutis."
    },
    {
        "id": 5,
        "titulo": "Orgulho e Preconceito",
        "autor": "Jane Austen",
        "ano": 1813,
        "editora": "Penguin",
        "genero": "Romance",
        "descricao": "A história de Elizabeth Bennet enquanto lida com questões de classe e amor."
    },
    {
        "id": 6,
        "titulo": "O Hobbit",
        "autor": "J.R.R. Tolkien",
        "ano": 1937,
        "editora": "HarperCollins",
        "genero": "Fantasia",
        "descricao": "A jornada de Bilbo Bolseiro em uma aventura pela Terra Média."
    },
    {
        "id": 7,
        "titulo": "Moby Dick",
        "autor": "Herman Melville",
        "ano": 1851,
        "editora": "Nova Fronteira",
        "genero": "Aventura",
        "descricao": "A obsessiva caçada do capitão Ahab pela baleia branca."
    },
    {
        "id": 8,
        "titulo": "A Metamorfose",
        "autor": "Franz Kafka",
        "ano": 1915,
        "editora": "L&PM",
        "genero": "Ficção filosófica",
        "descricao": "Um homem acorda transformado em um inseto gigante."
    },
    {
        "id": 9,
        "titulo": "Grande Sertão: Veredas",
        "autor": "João Guimarães Rosa",
        "ano": 1956,
        "editora": "Nova Aguilar",
        "genero": "Romance",
        "descricao": "Um clássico da literatura brasileira sobre o sertão e seus conflitos."
    },
    {
        "id": 10,
        "titulo": "Harry Potter e a Pedra Filosofal",
        "autor": "J.K. Rowling",
        "ano": 1997,
        "editora": "Rocco",
        "genero": "Fantasia",
        "descricao": "O começo da jornada de um jovem bruxo em Hogwarts."
    }
];

function carregarLivros(filtro = '') {
    const container = document.getElementById('livros-container');
    container.innerHTML = '';
    const termo = filtro.trim().toLowerCase();
    const livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );
    livrosFiltrados.forEach(livro => {
        const div = document.createElement('div');
        div.className = 'livro';
        div.innerHTML = `
          <h3>${livro.titulo}</h3>
          <p><strong>Autor:</strong> ${livro.autor}</p>
          <p><strong>Ano:</strong> ${livro.ano}</p>
          <button aria-label="Ver detalhes do livro ${livro.titulo}">Ver Detalhes</button>
        `;
        const btn = div.querySelector('button');
        btn.addEventListener('click', () => verDetalhes(livro.id));
        container.appendChild(div);
    });
}

document.getElementById('barra-pesquisa').addEventListener('input', function() {
    carregarLivros(this.value);
});

function verDetalhes(id) {
    const livro = livros.find(l => l.id === id);
    document.getElementById('livro-titulo').textContent = livro.titulo;
    document.getElementById('livro-descricao').innerHTML = `
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        <p><strong>Editora:</strong> ${livro.editora}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Descrição:</strong> ${livro.descricao}</p>
    `;
    document.getElementById('detalhes-modal').style.display = 'block';
    document.getElementById('nome-livro').value = livro.titulo;

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            document.getElementById('detalhes-modal').style.display = 'none';
        };
    }
}

document.getElementById('form-locacao').addEventListener('submit', function(e) {
    e.preventDefault();
    const nomeLivro = document.getElementById('nome-livro').value;
    const nomeLocatario = document.getElementById('nome-locatario').value.trim();
    const cpf = document.getElementById('cpf-locatario').value.trim();
    const dataLocacao = document.getElementById('data-locacao').value;
    const dataDevolucao = document.getElementById('data-devolucao').value;
    const msg = document.getElementById('msg-locacao');

    if (!/^\d{11}$/.test(cpf)) {
        msg.style.color = "#c0392b";
        msg.textContent = "CPF deve conter exatamente 11 dígitos numéricos.";
        return;
    }

    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    locacoes.push({
        nomeLivro, nomeLocatario, cpf, dataLocacao, dataDevolucao
    });
    localStorage.setItem('locacoes', JSON.stringify(locacoes));
    msg.style.color = "#27ae60";
    msg.textContent = "Locação registrada com sucesso!";
    this.reset();
    document.getElementById('nome-livro').value = nomeLivro;
});

window.onclick = function(event) {
    const modal = document.getElementById('detalhes-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

carregarLivros();