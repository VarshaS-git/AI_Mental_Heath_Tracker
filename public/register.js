const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Register form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Registration success message
    } else {
      alert(result.error); // Error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Login form submission
// Login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Show login success message
      localStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = 'profile.html'; // Redirect to profile page
    } else {
      alert(result.error); // Show error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

// Toggle between forms
function showRegisterForm() {
  registerForm.style.display = 'block';
  loginForm.style.display = 'none';
}

function showLoginForm() {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
}
