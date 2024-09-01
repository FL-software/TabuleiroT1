const mainContent = document.getElementById('main-content');
const links = document.querySelectorAll('nav a, header a');
const link_rodape = document.querySelector('.link-rodape');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

function loadPage(page) {
    // Remove o conteúdo anterior do main
    mainContent.innerHTML = '';
    
    const menus = document.querySelectorAll('.menu-principal');
            
    menus.forEach(menu => {
        menu.classList.remove('ativo');

        if (menu.nextElementSibling && menu !== menu.nextElementSibling) {
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

    nav.classList.remove('ativo');
}

// Adiciona evento de clique para os links do menu
links.forEach(link => {
    link.addEventListener('click', function(event) {            
        const menus = document.querySelectorAll('.menu-principal');
        
        menus.forEach(menu => {
            if (menu !== this) {
                menu.classList.remove('ativo');
            }

            if (menu.nextElementSibling && menu !== menu.nextElementSibling) {
                menu.nextElementSibling.style.display = 'none';
            }
        });

        // Verifica se o link é um item de menu (tem a classe 'menu-principal')
        if (this.nextElementSibling && this.classList.contains('menu-principal')) {
            event.preventDefault(); // Impede o comportamento padrão do link

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
link_rodape.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    const href = this.getAttribute('href');

    loadPage(href);
});

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('ativo'); // Alterna a exibição do menu
});

// Carrega a página inicial (inicio.html)
loadPage('view/inicio.html');