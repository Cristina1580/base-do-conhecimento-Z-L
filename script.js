document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campo-busca');
    const cardContainer = document.querySelector('.card-container');
    const botaoBusca = document.getElementById('botao-busca');
    let items = [];

    // Carrega os dados do arquivo JSON para ficarem disponíveis para a busca
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            items = data;
        })
        .catch(error => console.error('Erro ao carregar dados:', error));

    // Função para renderizar os cards na tela
    function renderizarCards(cards) {
        cardContainer.innerHTML = ''; // Limpa os cards existentes
        if (cards.length === 0) {
            cardContainer.innerHTML = '<p style="text-align: center;">Nenhum resultado encontrado.</p>';
            return;
        }

        cards.forEach(item => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <img src="img/${item.imagem}" alt="${item.nome}" class="poster">
                <h2>${item.nome} (${item.data_criacao})</h2>
                <p>${item.descricao}</p>
                <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
                <a href="${item.link}" target="_blank">Saiba mais</a>
            `;
            cardContainer.appendChild(card);
        });
    }

    // Função de busca
    function iniciarBusca() {
        const termo = campoBusca.value.toLowerCase().trim();
        const resultados = items.filter(item => {
            const textoBuscavel = `${item.nome} ${item.descricao} ${item.tags.join(' ')}`.toLowerCase();
            return textoBuscavel.includes(termo);
        });
        renderizarCards(resultados);
    }

    // Adiciona o evento de clique ao botão de busca
    botaoBusca.addEventListener('click', iniciarBusca);

    // Adiciona o evento para a tecla "Enter" no campo de busca
    campoBusca.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            iniciarBusca();
        }
    });
});