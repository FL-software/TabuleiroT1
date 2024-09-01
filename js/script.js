const mainContent = document.getElementById('main-content');

function loadPage(page) {
    // Remove o conteúdo anterior do main
    mainContent.innerHTML = '';
    
    const menus = document.querySelectorAll('.menu-principal');
            
    menus.forEach(menu => {
        menu.classList.remove('ativo');

        if (menu !== menu.nextElementSibling) {
            menu.nextElementSibling.style.display = 'none';
        }
    });

    // Carrega o conteúdo da página
    fetch(page)
        .then(response => response.text())
        .then(html => {
            mainContent.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
        });
}

// Adiciona evento de clique para os links do menu
const links = document.querySelectorAll('nav a, header a');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        // Verifica se o link é um item de menu (tem a classe 'menu-principal')
        if (this.classList.contains('menu-principal')) {
            event.preventDefault(); // Impede o comportamento padrão do link
            
            const menus = document.querySelectorAll('.menu-principal');
            
            menus.forEach(menu => {
                if (menu !== this) {
                    menu.classList.remove('ativo');
                }

                if (menu !== menu.nextElementSibling) {
                    menu.nextElementSibling.style.display = 'none';
                }
            });

            // Adiciona ou remove a classe 'ativo' no item clicado
            if (this.classList.contains('ativo')) {
                this.classList.remove('ativo'); // Fecha o submenu
                this.nextElementSibling.style.display = 'none';
            } else {
                this.classList.add('ativo'); // Abre o submenu
                this.nextElementSibling.style.display = 'block';
            }

            return; // Sai da função para evitar o carregamento da página
        }

        // Se não for um item de menu, carrega a página normalmente
        event.preventDefault(); // Impede o comportamento padrão do link

        const href = this.getAttribute('href');

        loadPage(href);
    });
});

// Adiciona evento de clique para os links do menu
const link_rodape = document.querySelector('.link-rodape');

link_rodape.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    const href = this.getAttribute('href');

    loadPage(href);
});

// Carrega a página inicial (inicio.html)
loadPage('view/inicio.html');