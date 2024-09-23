document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a');

    // Function to play sound
    function playSound() {
        const audio = new Audio('sounds/hover-sound.mp3');
        audio.play();
    }

    menuIcon.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Add hover event listeners to nav links
    navLinks.forEach(function(link) {
        link.addEventListener('mouseenter', playSound);
    });
});