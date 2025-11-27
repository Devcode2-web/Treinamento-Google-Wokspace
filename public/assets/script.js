document.addEventListener('DOMContentLoaded', () => {

    /**
     * ------------------------------------------------------------------------
     * LOAD TOOL CARDS DYNAMICALLY
     * ------------------------------------------------------------------------
     * Busca os dados das ferramentas de um arquivo JSON e os carrega
     * dinamicamente na seção de ferramentas.
     */
    const loadToolCards = async () => {
        try {
            const response = await fetch('assets/dados.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const cardsData = await response.json();
            const cardContainer = document.querySelector('.card-container');

            if (cardContainer) {
                cardContainer.innerHTML = ''; // Limpa o container
                cardsData.forEach(card => {
                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');
                    
                    // Add a class based on the card title
                    const titleClass = 'card-' + card.title.toLowerCase().replace(' ', '-');
                    cardElement.classList.add(titleClass);

                    cardElement.innerHTML = `
                        <div class="card-header"></div>
                        <div class="card-content">
                            <img src="${card.image_url}" alt="Ícone do ${card.title}" class="card-icon">
                            <h3>${card.title}</h3>
                            <p>${card.description}</p>
                            <a href="${card.page_url}" class="btn-secondary" aria-label="Saiba mais sobre o ${card.title}">Saiba Mais</a>
                        </div>
                    `;
                    cardContainer.appendChild(cardElement);
                });

                // Now that the section has content, observe it
                const toolsSection = document.getElementById('tools');
                if (toolsSection) {
                    observer.observe(toolsSection);
                }
            }
        } catch (error) {
            console.error("Não foi possível carregar os cards de ferramentas:", error);
        }
    };

    loadToolCards();


    /**
     * ------------------------------------------------------------------------
     * SMOOTH SCROLL ANCHOR LINKS
     * ------------------------------------------------------------------------
     * Aplica uma animação de rolagem suave para todos os links âncora 
     * internos da página (que começam com #).
     */
    const smoothScroll = (event) => {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
 
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
 
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    };
 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
 
    /**
     * ------------------------------------------------------------------------
     * HAMBURGER MENU LOGIC
     * ------------------------------------------------------------------------
     * Alterna a visibilidade do menu de navegação em dispositivos móveis
     * e atualiza os atributos ARIA para acessibilidade.
     */
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');
 
    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            // Alterna a classe que mostra/esconde o menu
            mainNav.classList.toggle('is-active');

            // Atualiza o atributo aria-expanded para leitores de tela
            const isExpanded = mainNav.classList.contains('is-active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
        });
    }
 
    /**
     * ------------------------------------------------------------------------
     * SCROLL FADE-IN ANIMATION
     * ------------------------------------------------------------------------
     * Utiliza a Intersection Observer API para adicionar uma classe de 
     * visibilidade a seções quando elas entram no viewport, ativando uma
     * animação de fade-in definida no CSS.
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-section');
                // Stop observing once it's visible to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% da seção está visível
    });

    // Observe all hidden sections except the one we are loading dynamically
    const hiddenSections = document.querySelectorAll('.hidden-section:not(#tools)');
    hiddenSections.forEach(section => {
        observer.observe(section);
    });
});
