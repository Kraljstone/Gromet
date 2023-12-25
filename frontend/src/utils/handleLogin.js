import { loadGoogleMapsAPI } from '../api/googleMap/loadGoogleMapsAPI';
import { initMap } from '../api/googleMap/googleMap';
import { menu } from '../components/menu/menu';
import { showNavCard } from '../components/navCard/showNavCard';

export const handleLogin = () => {
  const hardcodedUsername = 'grometAdmin';
  const hardcodedPassword = 'adminadmin2024';

  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;

  if (
    enteredUsername === hardcodedUsername &&
    enteredPassword === hardcodedPassword
  ) {
    // Set isLoggedIn to true in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set expiration time to 12 hour from now (in milliseconds)
    const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
    console.log(expirationTime);
    localStorage.setItem('loginExpiration', expirationTime);

    const layout = document.querySelector('.layout');
    layout.style.display = 'flex';
    const loginForm = document.querySelector('.login-form');
    loginForm.style.display = 'none';

    loadGoogleMapsAPI();
    initMap();
    menu();
    showNavCard();
  } else {
    alert('Invalid username or password. Please try again.');
  }
};
