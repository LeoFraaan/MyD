/**
 * M&D Servicios Generales — Lógica Interactiva (Diseño Apple Light)
 * Limpieza y Desinfección Profesional a Domicilio en Trujillo y Perú
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. NAVEGACIÓN DESKTOP STICKY & MENÚ MÓVIL ENRIQUECIDO (DRAWER APPLE)
       ========================================================================== */
    const siteHeaderFixed = document.getElementById('siteHeaderFixed');
    const mainAppleNav = document.getElementById('mainAppleNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
    const navLinks = document.querySelectorAll('.nav-links-list a, .mobile-quick-btn');

    // Efecto de Scroll en el Encabezado Fijo
    const handleNavScroll = () => {
        const isScrolled = window.scrollY > 25;
        if (siteHeaderFixed) {
            siteHeaderFixed.classList.toggle('is-scrolled', isScrolled);
        }
        if (mainAppleNav) {
            mainAppleNav.classList.toggle('nav-scrolled', isScrolled);
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // Apertura y Cierre del Menú Móvil
    const openMobileDrawer = () => {
        if (navMenu) navMenu.classList.add('open');
        if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileDrawer = () => {
        if (navMenu) navMenu.classList.remove('open');
        if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (navToggle) navToggle.addEventListener('click', openMobileDrawer);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    /* ==========================================================================
       2. HERO ESCENARIO SLIDER (APPLE CROSSFADE CADA 5 SEGUNDOS & SWIPE)
       ========================================================================== */
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = heroSlider.querySelectorAll('.apple-dot');
        const prevBtn = document.getElementById('applePrevBtn');
        const nextBtn = document.getElementById('appleNextBtn');
        let currentIndex = 0;
        let slideTimer = null;
        const SLIDE_DELAY = 5000;

        const showSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

            currentIndex = (index + slides.length) % slides.length;

            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        };

        const nextSlide = () => showSlide(currentIndex + 1);
        const prevSlide = () => showSlide(currentIndex - 1);

        const startAutoSlide = () => {
            stopAutoSlide();
            slideTimer = setInterval(nextSlide, SLIDE_DELAY);
        };

        const stopAutoSlide = () => {
            if (slideTimer) clearInterval(slideTimer);
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const target = parseInt(dot.getAttribute('data-index'), 10);
                showSlide(target);
                startAutoSlide();
            });
        });

        // Pausa al pasar el cursor (Desktop)
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);

        // Gestos táctiles Swipe para dispositivos móviles
        let touchStartX = 0;
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSlider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 40) {
                if (diff < 0) nextSlide();
                else prevSlide();
                startAutoSlide();
            }
        }, { passive: true });

        // Iniciar rotación automática de 5s
        startAutoSlide();
    }

    /* ==========================================================================
       3. COMPARADOR ANTES Y DESPUÉS INTERACTIVO (SLIDER NATIVO DE ALTA PRECISIÓN)
       ========================================================================== */
    const compareBox = document.getElementById('compareBox');
    const compareRange = document.getElementById('compareRange');

    if (compareBox && compareRange) {
        const updateSlider = (value) => {
            compareBox.style.setProperty('--slider-pos', `${value}%`);
        };

        compareRange.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        compareRange.addEventListener('change', (e) => {
            updateSlider(e.target.value);
        });
    }

    /* ==========================================================================
       4. COTIZADOR INTERACTIVO INTELIGENTE CON APARTADO LIBRE & OPCIONES DINÁMICAS
       ========================================================================== */
    const serviceCatalog = {
        'muebles': {
            name: 'Muebles de Sala',
            title: 'Muebles de Sala',
            sizes: [
                { name: 'Sofá 3 Cuerpos', detail: 'Estándar o reclinable' },
                { name: 'Juego Completo (3 + 2 + 1)', detail: 'Juego de sala familiar' },
                { name: 'Seccional en L', detail: 'Mueble esquinero 3 a 5 cuerpos' },
                { name: 'Sofá 2 Cuerpos', detail: 'Mediano para sala o estar' },
                { name: 'Sillón Individual', detail: '1 cuerpo (reclinable o fijo)' },
                { name: 'Modular Grande / Chaise Longue', detail: 'Mueble amplio por piezas' }
            ]
        },
        'colchones': {
            name: 'Lavado y Desinfección de Colchones',
            title: 'Colchones',
            sizes: [
                { name: '2 Plazas (Matrimonial)', detail: 'Ambas caras y laterales incluidos' },
                { name: 'Queen Size (1.60 x 2.00m)', detail: 'Ambas caras y desinfección a vapor' },
                { name: 'King Size (2.00 x 2.00m)', detail: 'Máximo tamaño y desinfección total' },
                { name: '1 Plaza / 1.5 Plazas', detail: 'Individual infantil o juvenil' },
                { name: 'Colchón de Cuna / Infantil', detail: 'Higiene especial para bebés' },
                { name: 'Combo Colchón + Almohadas', detail: 'Tratamiento profundo antiácaros' }
            ]
        },
        'alfombras': {
            name: 'Lavado de Alfombras',
            title: 'Alfombras',
            sizes: [
                { name: 'Alfombra Mediana de Sala', detail: 'Aprox. 2.00 x 2.50 metros' },
                { name: 'Alfombra Grande de Sala', detail: 'Aprox. 2.50 x 3.50m o más' },
                { name: 'Tapete Decorativo / Pie de Cama', detail: 'Hasta 1.20 x 1.80 metros' },
                { name: 'Alfombra Fija Pared a Pared', detail: 'Cotización por metro cuadrado (m²)' },
                { name: 'Alfombra Shaggy / Pelo Largo', detail: 'Tratamiento delicado y peinado' }
            ]
        },
        'sillas': {
            name: 'Lavado de Sillas y Butacas',
            title: 'Sillas y Butacas',
            sizes: [
                { name: 'Juego de 4 Sillas', detail: 'Comedor tapizado' },
                { name: 'Juego de 6 Sillas', detail: 'Comedor familiar' },
                { name: 'Juego de 8 Sillas', detail: 'Comedor amplio' },
                { name: 'Silla Ejecutiva de Oficina', detail: 'Asiento y respaldo ergonómico' },
                { name: 'Butaca Tapizada', detail: 'Sillón individual de lectura' }
            ]
        },
        'otro': {
            name: 'Servicio Personalizado',
            title: 'Servicio Personalizado',
            sizes: [
                { name: 'Tapicería de Auto / Vehículo', detail: 'Asientos y alfombra de auto' },
                { name: 'Tapicería de Camioneta / SUV', detail: '2 o 3 filas de asientos' },
                { name: 'Servicio Integral Casa / Dpto', detail: 'Paquete de varios ambientes' },
                { name: 'Consulta Especial', detail: 'Detallada en el recuadro de abajo' }
            ]
        }
    };

    const serviceOptions = document.querySelectorAll('.service-opt');
    const dynamicSizeGrid = document.getElementById('dynamicSizeGrid');
    const step2ServiceName = document.getElementById('step2ServiceName');
    const configSelectionSummary = document.getElementById('configSelectionSummary');
    const configCustomTextSnippet = document.getElementById('configCustomTextSnippet');
    const configClientCustomText = document.getElementById('configClientCustomText');
    const configClientName = document.getElementById('configClientName');
    const configClientPhone = document.getElementById('configClientPhone');
    const configClientCity = document.getElementById('configClientCity');
    const btnSendConfigQuote = document.getElementById('btnSendConfigQuote');

    let currentServiceKey = 'muebles';
    let currentSelectedSize = 'Sofá 3 Cuerpos';

    const renderSizeOptions = (serviceKey) => {
        if (!dynamicSizeGrid) return;
        const catalog = serviceCatalog[serviceKey] || serviceCatalog['muebles'];

        if (step2ServiceName) {
            step2ServiceName.textContent = catalog.title;
        }

        dynamicSizeGrid.innerHTML = '';

        catalog.sizes.forEach((item, index) => {
            const opt = document.createElement('div');
            opt.className = `config-option size-opt ${index === 0 ? 'selected' : ''}`;
            opt.setAttribute('data-size', item.name);
            opt.innerHTML = `
                <div class="opt-name">${item.name}</div>
                <div class="opt-detail">${item.detail}</div>
            `;

            opt.addEventListener('click', () => {
                const allSizes = dynamicSizeGrid.querySelectorAll('.size-opt');
                allSizes.forEach(s => s.classList.remove('selected'));
                opt.classList.add('selected');
                currentSelectedSize = item.name;
                updateSummary();
            });

            dynamicSizeGrid.appendChild(opt);
        });

        currentSelectedSize = catalog.sizes[0].name;
        updateSummary();
    };

    const updateSummary = () => {
        const catalog = serviceCatalog[currentServiceKey];
        const sName = catalog ? catalog.name : 'Lavado Profesional';

        if (configSelectionSummary) {
            configSelectionSummary.textContent = `${sName} • ${currentSelectedSize}`;
        }

        // Si el usuario escribió un requerimiento libre, mostrar un extracto en el resumen
        const customText = configClientCustomText ? configClientCustomText.value.trim() : '';
        if (configCustomTextSnippet) {
            if (customText.length > 0) {
                const preview = customText.length > 55 ? customText.substring(0, 52) + '...' : customText;
                configCustomTextSnippet.textContent = `Nota: "${preview}"`;
                configCustomTextSnippet.style.display = 'block';
            } else {
                configCustomTextSnippet.style.display = 'none';
            }
        }
    };

    // Cambio de servicio en el Paso 1
    serviceOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            serviceOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            currentServiceKey = this.getAttribute('data-service-key') || 'muebles';
            renderSizeOptions(currentServiceKey);
        });
    });

    // Escuchar texto libre en tiempo real
    if (configClientCustomText) {
        configClientCustomText.addEventListener('input', updateSummary);
    }

    // Remover clase de error al escribir en los campos obligatorios
    [configClientName, configClientPhone, configClientCity].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (input.value.trim().length > 0) {
                    input.classList.remove('input-error');
                }
            });
        }
    });

    // Inicializar Paso 2 con Muebles
    renderSizeOptions('muebles');

    // Envío estructurado y validado a WhatsApp
    if (btnSendConfigQuote) {
        btnSendConfigQuote.addEventListener('click', (e) => {
            e.preventDefault();

            const name = configClientName ? configClientName.value.trim() : '';
            const phone = configClientPhone ? configClientPhone.value.trim() : '';
            const city = configClientCity ? configClientCity.value.trim() : '';
            const customText = configClientCustomText ? configClientCustomText.value.trim() : '';

            // Validación estricta de campos obligatorios (Nombre, Teléfono, Ciudad)
            let hasError = false;

            if (!name || name.length < 2) {
                if (configClientName) configClientName.classList.add('input-error');
                hasError = true;
            } else if (configClientName) {
                configClientName.classList.remove('input-error');
            }

            const cleanPhone = phone.replace(/[^0-9]/g, '');
            if (!cleanPhone || cleanPhone.length < 6) {
                if (configClientPhone) configClientPhone.classList.add('input-error');
                hasError = true;
            } else if (configClientPhone) {
                configClientPhone.classList.remove('input-error');
            }

            if (!city || city.length < 2) {
                if (configClientCity) configClientCity.classList.add('input-error');
                hasError = true;
            } else if (configClientCity) {
                configClientCity.classList.remove('input-error');
            }

            if (hasError) {
                const firstInvalid = document.querySelector('.config-inputs-row input.input-error');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const catalog = serviceCatalog[currentServiceKey];
            const sName = catalog ? catalog.name : 'Lavado de Muebles';

            // Redacción estructurada: Datos del cliente y servicio PRIMERO, luego mensaje opcional
            let msg = `¡Hola M&D Servicios Generales! 👋\n`;
            msg += `Deseo solicitar una cotización con los siguientes datos:\n\n`;

            msg += `👤 *Nombre:* ${name}\n`;
            msg += `📱 *Teléfono:* ${phone}\n`;
            msg += `📍 *Ciudad / Distrito:* ${city}\n\n`;

            msg += `🛋️ *Servicio solicitado:* ${sName}\n`;
            msg += `📐 *Medida / Tipo:* ${currentSelectedSize}\n`;

            if (customText) {
                msg += `\n📝 *Detalle / Requerimiento adicional:*\n"${customText}"\n`;
            }

            msg += `\n¿Podrían indicarme el costo del servicio y los horarios disponibles? ¡Muchas gracias!`;

            const phoneNumber = '51951558361';
            const fullUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
            window.open(fullUrl, '_blank');
        });
    }

    /* ==========================================================================
       5. CIFRAS CON ANIMACIÓN DE CONTADOR DIGITAL (APPLE STAT COUNTER)
       ========================================================================== */
    const counterElements = document.querySelectorAll('[data-counter-target]');

    if ('IntersectionObserver' in window && counterElements.length > 0) {
        const animateCounter = (el) => {
            const target = parseFloat(el.getAttribute('data-counter-target'));
            const prefix = el.getAttribute('data-counter-prefix') || '';
            const suffix = el.getAttribute('data-counter-suffix') || '';
            const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
            const duration = 1600; // ms
            const startTime = performance.now();

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Easing cúbico hacia afuera
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = (target * easeOut).toFixed(decimals);

                el.textContent = `${prefix}${current}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
                }
            };

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    /* ==========================================================================
       6. EFECTOS GLOBALES DE APARICIÓN AL HACER SCROLL (SCROLL REVEAL)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback si no hay soporte para IntersectionObserver
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

    /* ==========================================================================
       7. PREGUNTAS FRECUENTES (FAQ ACORDEÓN LUMINOSO)
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       8. DESPLAZAMIENTO SUAVE CON OFFSET DE BARRA FIJA
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = mainAppleNav ? mainAppleNav.offsetHeight : 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 12;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
