document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header fixo com mudança de cor ao rolar
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Animação de elementos ao scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll('.hero-content, .feature-content, .service-box, .process-card');
    animateElements.forEach(el => observer.observe(el));

    // Form submission
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Aqui você pode adicionar a lógica de envio do formulário
            console.log('Form data:', data);
            
            // Simulação de envio
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Feedback visual
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Mensagem Enviada!';
            button.style.backgroundColor = '#00E88F';
            
            // Reset do formulário
            form.reset();
            
            // Restaura o botão após 3 segundos
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 3000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    });
});
