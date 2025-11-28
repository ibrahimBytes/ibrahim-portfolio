
        // Enhanced Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Enhanced animations and interactions
        document.addEventListener('DOMContentLoaded', () => {
            // Animate main title underline
            const mainTitle = document.getElementById('mainTitle');
            setTimeout(() => {
                mainTitle.classList.add('animate');
            }, 500);
            
            // Stagger animation for cards
            const staggerItems = document.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Simulate loading with skeleton screens
            setTimeout(() => {
                // This would be replaced with actual data loading
                console.log('Data loaded');
            }, 1500);
            
            // Add scroll effect to header
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        });

        // Advanced Search Panel
        const searchTrigger = document.getElementById('searchTrigger');
        const searchPanel = document.getElementById('searchPanel');
        const searchPanelClose = document.getElementById('searchPanelClose');
        const searchPanelInput = document.querySelector('.search-panel-input');

        searchTrigger.addEventListener('click', () => {
            searchPanel.classList.add('active');
            searchPanelInput.focus();
        });

        searchPanelClose.addEventListener('click', () => {
            searchPanel.classList.remove('active');
        });

        // Close search panel when clicking outside
        searchPanel.addEventListener('click', (e) => {
            if (e.target === searchPanel) {
                searchPanel.classList.remove('active');
            }
        });

        // Enhanced Service card interactions
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const serviceName = card.querySelector('.service-title').textContent;
                // In a real app, we would navigate to the service page
                console.log('Opening service:', serviceName);
                
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Enhanced Quick action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const actionName = button.querySelector('span').textContent;
                // In a real app, we would perform the quick action
                console.log('Performing action:', actionName);
                
                // Add pulse animation
                button.classList.add('pulse');
                setTimeout(() => {
                    button.classList.remove('pulse');
                }, 600);
            });
        });

        // FAB functionality
        const fab = document.querySelector('.fab');
        fab.addEventListener('click', () => {
            // In a real app, this would open a modal or quick actions
            console.log('FAB clicked');
            
            // Simple animation
            fab.style.transform = 'scale(0.9)';
            setTimeout(() => {
                fab.style.transform = '';
            }, 150);
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style); 

        
    