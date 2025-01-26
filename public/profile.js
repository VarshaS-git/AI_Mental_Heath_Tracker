document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.querySelector(".edit-btn");
    const signOutButton = document.querySelector(".signout-btn");
  
    // Fill user information from localStorage or an API
   // Example data fetched from the server
const userData = {
  name: "Varsha",
  date_of_birth: "2004-07-13T18:30:00.000Z",
  country: "India",
  gender: "Female"
};

// Populate profile data
document.getElementById('name').innerText = userData.name;
document.getElementById('dob').innerText = new Date(userData.date_of_birth).toISOString().split('T')[0];
document.getElementById('country').innerText = userData.country;
document.getElementById('gender').innerText = userData.gender;

function signOut() {
  alert('Signing out...');
  // Implement sign-out logic here
}

  });
  