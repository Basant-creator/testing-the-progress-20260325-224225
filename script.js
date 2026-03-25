document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when a navigation link is clicked (for smooth scrolling)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the fixed header height
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive Progress Bar Demo
    const progressBar = document.querySelector('.progress-bar');
    const progressLabel = document.querySelector('.progress-label');
    const progressSlider = document.querySelector('.progress-slider');
    const demoControls = document.querySelector('.demo-controls');

    let currentProgress = 50; // Initial progress value

    function updateProgressBar(value) {
        // Ensure value is within 0-100 range
        currentProgress = Math.max(0, Math.min(100, value));
        progressBar.style.width = `${currentProgress}%`;
        progressLabel.textContent = `${currentProgress}%`;
        progressBar.setAttribute('aria-valuenow', currentProgress);
        progressSlider.value = currentProgress;
    }

    // Initialize progress bar
    updateProgressBar(currentProgress);

    // Event listeners for control buttons
    if (demoControls) {
        demoControls.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const action = e.target.dataset.action;
                switch (action) {
                    case 'increase':
                        updateProgressBar(currentProgress + 10);
                        break;
                    case 'decrease':
                        updateProgressBar(currentProgress - 10);
                        break;
                    case 'reset':
                        updateProgressBar(50);
                        break;
                }
            }
        });
    }

    // Event listener for slider
    if (progressSlider) {
        progressSlider.addEventListener('input', (e) => {
            updateProgressBar(parseInt(e.target.value));
        });
    }
});