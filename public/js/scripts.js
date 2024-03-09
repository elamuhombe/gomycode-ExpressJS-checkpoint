  // JavaScript to toggle visibility of navigation menu
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const navigationMenu = document.getElementById('navigation-menu');

  hamburgerIcon.addEventListener('click', function() {
    navigationMenu.classList.toggle('hidden');
  });

