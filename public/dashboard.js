document.addEventListener("DOMContentLoaded", () => {
    // Array of quotes
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not the key to happiness. Happiness is the key to success.",
      "Keep going. Everything you need will come to you at the perfect time.",
      "Your limitation—it’s only your imagination.",
      "Push yourself, because no one else is going to do it for you."
    ];
  
    // Get the quote text element by id
    const quoteText = document.getElementById("quote-text");
  
    let currentIndex = 0;
  
    // Function to update the quote
    function updateQuote() {
      quoteText.textContent = quotes[currentIndex];
      currentIndex = (currentIndex + 1) % quotes.length; // Loop back to the first quote
    }
  
    // Initial quote update
    updateQuote();
  
    // Set interval to change quote every 5 seconds
    setInterval(updateQuote, 5000); // 5000ms = 5 seconds
  });
  