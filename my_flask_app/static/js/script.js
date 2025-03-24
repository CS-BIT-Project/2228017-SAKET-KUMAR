 
// static/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Fade in container
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.transition = 'opacity 0.5s';
        container.style.opacity = '1';
    }, 100);
});