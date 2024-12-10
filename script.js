document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Criar botão do menu
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.setAttribute('aria-label', 'Menu');
        
        // Adicionar botão ao nav
        nav.appendChild(menuButton);
        
        // Evento de click
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    // Inicializar menu mobile
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                const navLinks = document.querySelector('.nav-links');
                const menuButton = document.querySelector('.mobile-menu-btn');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Header fixo com classe ativa no scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adicionar classe quando rolar mais que 100px
        if (currentScroll > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Esconder/mostrar header baseado na direção do scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que devem ser animados
    document.querySelectorAll('.service-card, .feature, .section-header').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Desabilitar botão de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                // Coleta os dados do formulário
                const formData = {
                    nome: document.getElementById('nome').value,
                    email: document.getElementById('email').value,
                    mensagem: document.getElementById('mensagem').value
                };

                // Aqui você pode adicionar a lógica para enviar os dados para seu servidor
                console.log('Dados do formulário:', formData);
                
                // Simular delay de envio (remover em produção)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Limpar formulário
                contactForm.reset();
                
                // Mostrar mensagem de sucesso
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
                
            } finally {
                // Reabilitar botão
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }

    // Adicionar efeito de hover nos cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
