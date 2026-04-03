// ========== SMOOTH SCROLLING ========== 
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== DYNAMIC OPEN STATUS ==========
    function updateOpenStatus() {
        const statusBox = document.querySelector('.status-box');
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;
        
        // Restaurant hours: 6:00 PM (18:00) to 11:00 PM (23:00)
        // Friday & Saturday until midnight (24:00)
        const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
        const openingTime = 18 * 60; // 6:00 PM
        const closingTime = (dayOfWeek === 5 || dayOfWeek === 6) ? 24 * 60 : 23 * 60; // 11:00 PM or midnight
        
        if (currentTime >= openingTime && currentTime < closingTime) {
            statusBox.innerHTML = '<span class="dot"></span> OPEN NOW';
            statusBox.style.borderColor = '#00ff00';
            statusBox.style.color = '#00ff00';
            statusBox.querySelector('.dot').style.background = '#00ff00';
            
            // Update flicker animation for green
            const style = document.createElement('style');
            style.textContent = `
                @keyframes flicker-green {
                    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                        opacity: 1;
                        box-shadow: 0 0 5px #00ff00;
                    }
                    20%, 24%, 55% {
                        opacity: 0.4;
                        box-shadow: none;
                    }
                }
                .status-box { animation: flicker-green 2s infinite; }
            `;
            document.head.appendChild(style);
        } else if (currentTime < openingTime) {
            const openingHour = 18;
            const openingMinute = 0;
            statusBox.innerHTML = `<span class="dot"></span> OPENING AT ${openingHour}:${openingMinute.toString().padStart(2, '0')} PM`;
        } else {
            statusBox.innerHTML = '<span class="dot"></span> CLOSED NOW';
            statusBox.style.borderColor = '#ff0000';
            statusBox.style.color = '#ff0000';
            statusBox.querySelector('.dot').style.background = '#ff0000';
        }
    }
    
    // Update status immediately and then every minute
    updateOpenStatus();
    setInterval(updateOpenStatus, 60000);

    // ========== FORM SUBMISSION ==========
    const reservationForm = document.querySelector('.contact-form form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const time = this.querySelector('input[type="time"]').value;
            const guests = this.querySelector('input[type="number"]').value;
            
            // Format date for better readability
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create WhatsApp message
            const whatsappMessage = encodeURIComponent(
                `🍖 *KHAN'S BARBEQUE - TABLE RESERVATION* 🍖\n\n` +
                `📝 *Reservation Details:*\n` +
                `👤 Name: ${name}\n` +
                `📞 Phone: ${phone}\n` +
                `📅 Date: ${formattedDate}\n` +
                `🕐 Time: ${time}\n` +
                `👥 Number of Guests: ${guests}\n\n` +
                `🔥 *Please confirm my reservation at Khan's Barbeque, Mosque Street, Arusha*\n` +
                `📞 Contact: +255754652747`
            );
            
            // WhatsApp number (Tanzania format)
            const whatsappNumber = '255754652747';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background: linear-gradient(45deg, #ff4d00, #b22222);
                color: white;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
                animation: sizzle 0.5s;
            `;
            successMessage.innerHTML = `
                <h3>🎉 Reservation Ready!</h3>
                <p>Opening WhatsApp to send your reservation details...</p>
                <p><strong>Check your WhatsApp to confirm the message!</strong></p>
            `;
            
            // Replace form with success message
            this.style.display = 'none';
            this.parentNode.appendChild(successMessage);
            
            // Open WhatsApp with pre-filled message
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1000);
            
            // Log for debugging
            console.log('Reservation data:', { name, phone, date, time, guests });
        });
    }

    // ========== ORDER BUTTON FUNCTIONALITY ==========
    const orderButtons = document.querySelectorAll('.khans-btn');
    
    orderButtons.forEach(button => {
        if (button.textContent.includes('ORDER')) {
            button.addEventListener('click', function() {
                // Prevent body scroll when modal opens
                document.body.style.overflow = 'hidden';
                
                // Create order modal
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s;
                `;
                
                modal.innerHTML = `
                    <div style="background: #222; padding: 40px; border-radius: 12px; border: 2px solid #ff4d00; max-width: 500px; text-align: center; animation: slideUp 0.3s;">
                        <h2 style="color: #ffcc00; margin-bottom: 20px; font-family: 'Oswald', sans-serif;">🍖 ORDER THE MIX MEAL</h2>
                        <p style="color: #ccc; margin-bottom: 30px; line-height: 1.6;">
                            Our famous Mix Meal includes:<br>
                            • Lamb Kebab<br>
                            • Tandoori Chicken<br>
                            • Beef Nyama Choma<br>
                            • Fresh Salads<br>
                            • Jalebi Gold Dessert<br>
                            <br>
                            <strong style="color: #ff4d00;">Price: TSh 45,000</strong>
                        </p>
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            <button onclick="closeOrderModal()" style="background: #333; color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
                            <button onclick="confirmOrder()" style="background: linear-gradient(45deg, #ff4d00, #b22222); color: white; padding: 12px 25px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Order via WhatsApp</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add ESC key listener to close modal
                const escListener = function(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escListener);
                    }
                };
                document.addEventListener('keydown', escListener);
                
                // Add animations
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(50px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            });
        }
    });
    
    // Global function for order confirmation
    window.confirmOrder = function() {
        // Remove modal properly
        closeModal();
        
        // Create confirmation message
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff4d00, #b22222);
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 2001;
            animation: slideInRight 0.5s;
            max-width: 300px;
        `;
        confirmation.innerHTML = `
            <h3 style="margin-bottom: 10px;">🔥 Order Initiated!</h3>
            <p>Opening WhatsApp to complete your Mix Meal order...</p>
        `;
        
        document.body.appendChild(confirmation);
        
        // Open WhatsApp (in a real app, this would have the restaurant's number)
        setTimeout(() => {
            window.open('https://wa.me/255123456789?text=Hi! I would like to order the Mix Meal for delivery/pickup.', '_blank');
            confirmation.remove();
        }, 2000);
        
        // Add slide in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    };

    // Global function to close modal properly
    window.closeOrderModal = function() {
        closeModal();
    };

    // Helper function to properly close modal
    function closeModal() {
        const modal = document.querySelector('div[style*="position: fixed"]');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                modal.remove();
                // Clean up any leftover styles
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }, 300);
        }
    }

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s forwards';
            }
        });
    }, observerOptions);

    // Observe all food cards and sections
    document.querySelectorAll('.food-card, .about-content, .contact-grid').forEach(el => {
        observer.observe(el);
    });

    // Add fade in up animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);

    // ========== NAVBAR SCROLL EFFECT ==========
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
});
