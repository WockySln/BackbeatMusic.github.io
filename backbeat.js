// JavaScript para la página de Backbeat
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. NAVEGACIÓN SUAVE
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 2. DESTACAR SECCIÓN ACTIVA EN EL MENÚ
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id], main[id]');
        const navLinks = document.querySelectorAll('nav a');

        function updateActiveNav() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Ejecutar al cargar
    }

    // 3. FUNCIONALIDAD DE BOTONES - PRODUCTOS
    function initProductButtons() {
        const productButtons = document.querySelectorAll('.product-card button');
        
        productButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Animación de compra
                this.innerHTML = '<i class="fas fa-check"></i> Agregado';
                this.style.background = '#10b981';
                
                // Mostrar notificación
                showNotification(`${productName} agregado al carrito`, 'success');
                
                // Restaurar botón después de 2 segundos
                setTimeout(() => {
                    this.innerHTML = 'Comprar ahora';
                    this.style.background = '';
                }, 2000);
            });
        });
    }

    // 4. FUNCIONALIDAD DE BOTONES - INSTRUMENTOS
    function initInstrumentButtons() {
        const instrumentButtons = document.querySelectorAll('.instrument-category button');
        
        instrumentButtons.forEach(button => {
            button.addEventListener('click', function() {
                const instrumentName = this.closest('.instrument-category').querySelector('h3').textContent;
                showNotification(`Explorando ${instrumentName}...`, 'info');
                
                // Simular carga de catálogo
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
                
                setTimeout(() => {
                    this.innerHTML = 'Ver más';
                    // Aquí podrías abrir un modal o redirigir a una página de catálogo
                    showInstrumentModal(instrumentName);
                }, 1500);
            });
        });
    }

    // 6. BOTÓN DE CLASES
    function initClassButton() {
        const classButton = document.querySelector('#classes button');
        
        if (classButton) {
            classButton.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-calendar-check"></i> Procesando...';
                
                setTimeout(() => {
                    showNotification('¡Genial! Te contactaremos pronto para programar tu clase.', 'success');
                    this.innerHTML = 'Reservar una clase';
                }, 2000);
            });
        }
    }

    // 7. BOTÓN HERO
    function initHeroButton() {
        const heroButton = document.querySelector('.hero .btn-primary');
        
        if (heroButton) {
            heroButton.addEventListener('click', function() {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = productsSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // 8. SISTEMA DE NOTIFICACIONES
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#10b981',
            info: '#06b6d4',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1001;
            background: ${colors[type]}; color: white; padding: 1rem 1.5rem;
            border-radius: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(400px); transition: transform 0.3s ease;
            max-width: 350px; font-weight: 500;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-remove después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // 9. ANIMACIONES AL HACER SCROLL
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos
        const elementsToAnimate = document.querySelectorAll(
            '.product-card, .instrument-category, .classes, .philosophy'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // 10. EFECTOS HOVER MEJORADOS
    function initEnhancedHovers() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // 11. VALIDACIÓN DE FORMULARIO (si agregas uno)
    function initFormValidation() {
        // Para futuras implementaciones de formularios de contacto
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Aquí iría la lógica de validación
                showNotification('Mensaje enviado correctamente', 'success');
            });
        });
    }

    // 12. Carrito de compras 
    let cart = [];
    
    function updateCartUI() {
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const cartContainer = document.getElementById('shopping-cart');

        cartItemsEl.innerHTML = '';

        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.marginBottom = '0.5rem';
            li.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>${item.name} - ${formatPrice(item.price)}</span>
                    <button style="color:red; font-weight:bold; border:none; background:none; cursor:pointer;" onclick="removeFromCart(${index})">×</button>
                </div>
            `;
            cartItemsEl.appendChild(li);
            
            // Convertir el precio a número correctamente
            const priceNumber = parsePrice(item.price);
            total += priceNumber;
        });

        cartTotalEl.textContent = `Total: ${formatPrice(total.toFixed(2))}`;
        cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
    }

    // Función para convertir precios con formato a número
    function parsePrice(priceStr) {
        // Eliminar símbolos de moneda y espacios
        let cleanPrice = priceStr.replace(/[^\d,.-]/g, '');
        // Reemplazar comas por puntos para el formato decimal
        cleanPrice = cleanPrice.replace(',', '');
        // Convertir a número
        return parseFloat(cleanPrice) || 0;
    }

    // Función para formatear precios con el formato de moneda
    function formatPrice(price) {
        // Convertir a número por si acaso
        const num = typeof price === 'string' ? parseFloat(price) : price;
        // Formatear como moneda mexicana
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(num);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    window.removeFromCart = removeFromCart;

    function addToCart(name, price) {
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            // Si ya existe, aumentar cantidad en lugar de agregar duplicado
            showNotification(`Se ha actualizado la cantidad de ${name} en el carrito`, 'info');
        } else {
            cart.push({ 
                name, 
                price,
                quantity: 1
            });
            showNotification(`${name} agregado al carrito`, 'success');
        }
        
        updateCartUI();
    }

    function initBuyButtons() {
        const buyButtons = document.querySelectorAll('.product-card button, .instrument-card button');

        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.product-card, .instrument-card');
                const name = card.querySelector('h3').textContent;
                const price = card.querySelector('.price')?.textContent || "$0.00";

                addToCart(name, price);

                // Animación del botón
                this.innerHTML = '<i class="fas fa-check"></i> Agregado';
                this.style.background = '#10b981';

                setTimeout(() => {
                    this.innerHTML = 'Comprar ahora';
                    this.style.background = '';
                }, 2000);
            });
        });
    }

    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('El carrito está vacío.', 'warning');
            return;
        }
        
        // Calcular total
        const total = cart.reduce((sum, item) => {
            return sum + (parsePrice(item.price) * item.quantity);
        }, 0);
        
        showNotification(`¡Gracias por tu compra! Total: ${formatPrice(total)}`, 'success');
        cart = [];
        updateCartUI();
    });

    // INICIALIZAR TODAS LAS FUNCIONES
    initSmoothScrolling();
    initActiveNavigation();
    initProductButtons();
    initInstrumentButtons();
    initClassButton();
    initHeroButton();
    initScrollAnimations();
    initEnhancedHovers();
    initFormValidation();
    initBuyButtons();

    console.log('🎵 Backbeat JavaScript cargado correctamente');
});