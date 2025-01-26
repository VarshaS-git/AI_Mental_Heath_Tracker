// Redirect to the sidebar (dashboard) page
function redirectToSidebar() {
    // Ensure sidebar.html is in the correct directory
    window.location.href = "sidebar.html";
  }
  
  // Sign Out functionality
  function signOut() {
    // Clear session storage or any login-related data
    alert("Signed out successfully!");
    window.location.href = "register.html"; // Redirect to login page
  }
  
  // Simulate loading user data
  function loadUserProfile() {
    // Simulating user data retrieval, replace with actual data fetching
    const userData = {
      name: "Varsha",
      dob: "2004-07-14",
      country: "India",
      gender: "Female",
    };
  
    // Populate profile details
    document.getElementById("profile-name").textContent = userData.name;
    document.getElementById("profile-dob").textContent = userData.dob;
    document.getElementById("profile-country").textContent = userData.country;
    document.getElementById("profile-gender").textContent = userData.gender;
  }
  
  // On DOMContentLoaded, load the profile details
  document.addEventListener("DOMContentLoaded", loadUserProfile);
