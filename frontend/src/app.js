import { initMap } from './api/googleMap/googleMap';
import { menu } from './components/menu/menu';
import { showNavCard } from './components/navCard/showNavCard';
import { loadGoogleMapsAPI } from './api/googleMap/loadGoogleMapsAPI';
import { handleLogin } from './utils/handleLogin';

// Get the login status from localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (isLoggedIn) {
  const layout = document.querySelector('.layout');
  layout.style.display = 'flex';
  const loginForm = document.querySelector('.login-form');
  loginForm.style.display = 'none';

  // Load Google Maps API and initialize the map
  loadGoogleMapsAPI();
  initMap();
  menu();
  showNavCard();
} else {
  const loginBtn = document.querySelector('.login-btn');
  const passwordInput = document.getElementById('password');

  loginBtn.addEventListener('click', handleLogin);

  passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  });
}
