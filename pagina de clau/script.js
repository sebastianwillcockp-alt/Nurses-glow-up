// Nurses Glow Up - Script de Funcionalidad Interactiva

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa Móvil
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Acordeón de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Cerrar todos los demás ítems
                faqItems.forEach(i => i.classList.remove('active'));

                // Si no estaba abierto, abrir el clickeado
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 3. Modales de Detalles de Tratamientos
    const modal = document.getElementById('treatment-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-description');
    const modalBenefits = document.getElementById('modal-benefits');
    const modalDuration = document.getElementById('modal-duration');
    const closeModalBtn = document.querySelector('.close-modal');

    // Datos detallados de los tratamientos
    const treatmentDetails = {
        'prp-facial': {
            title: 'Plasma Rico en Plaquetas (PRP) Facial',
            image: 'https://images.unsplash.com/photo-1761819920857-7edc5e808fd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhY2lhbCUyMHBsYXNmYXxlbnwwfHwwfHx8MA%3D%3D',
            description: 'El PRP Facial es un tratamiento autólogo bioseguro que utiliza los factores de crecimiento concentrados en tu propia sangre para bioestimular las células de la piel. Promueve la síntesis natural de colágeno y elastina, restaurando la firmeza, hidratación y luminosidad de tu rostro.',
            benefits: [
                'Atenúa líneas de expresión y microarrugas.',
                'Disminuye la apariencia de poros dilatados y cicatrices.',
                'Aporta brillo natural, tersura e hidratación profunda.',
                'Tratamiento 100% biocompatible, sin riesgo de alergia o rechazo.'
            ],
            duration: '60 minutos aprox.'
        },
        'prp-capilar': {
            title: 'Plasma Rico en Plaquetas (PRP) Capilar',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7YE_KR2tN-yp8CZ4NNu9V2UW1KtImDKMwFx2wln4JhcDQnHLaY2aOvynt&s=10',
            description: 'Terapia avanzada para revitalizar el cuero cabelludo. Al aplicar los factores de crecimiento en las zonas donde el cabello ha perdido densidad, se regeneran los folículos pilosos debilitados, estimulando la fase de crecimiento activo y frenando la caída.',
            benefits: [
                'Frena eficazmente la caída excesiva del cabello.',
                'Aumenta el grosor, fuerza y densidad de la hebra capilar.',
                'Mejora la vascularización y salud del cuero cabelludo.',
                'Resultados progresivos con aspecto totalmente natural.'
            ],
            duration: '60 minutos aprox.'
        },
        'alta-frecuencia': {
            title: 'Tratamiento de Alta Frecuencia',
            image: 'alta_frecuencia.jpg',
            description: 'Procedimiento cosmetológico que utiliza electrodos de vidrio que transmiten una corriente suave de alta frecuencia. Genera ozono con propiedades antisépticas, descongestivas y cicatrizantes en la piel y el cuero cabelludo.',
            benefits: [
                'Acción bactericida y antiséptica (ideal para acné o post-extracción).',
                'Oxigena el tejido celular y estimula la microcirculación.',
                'Efecto calmante, antiinflamatorio y refinador de poros.',
                'Excelente complemento para potenciar tratamientos faciales y capilares.'
            ],
            duration: '30 a 45 minutos aprox.'
        }
    };

    // Abrir modal al hacer clic en "Más Información" o en la tarjeta
    const detailButtons = document.querySelectorAll('.open-treatment-details');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const treatmentKey = btn.getAttribute('data-treatment');
            const data = treatmentDetails[treatmentKey];

            if (data && modal) {
                modalTitle.textContent = data.title;
                modalImage.src = data.image;
                modalImage.alt = data.title;
                modalDesc.textContent = data.description;
                modalDuration.textContent = data.duration;

                // Limpiar y llenar lista de beneficios
                modalBenefits.innerHTML = '';
                data.benefits.forEach(b => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-check-circle"></i> ${b}`;
                    modalBenefits.appendChild(li);
                });

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
            }
        });
    });

    // Cerrar modal
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Cerrar al hacer clic fuera del contenido
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // 4. Animaciones al scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .about-content, .stat-card, .faq-item, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
