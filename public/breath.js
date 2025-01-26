document.addEventListener("DOMContentLoaded", () => {
    let breathingIntervals = [
      { action: "Inhale...", duration: 3 }, // inhale for 10 seconds
      { action: "Hold...", duration: 7 },    // hold for 7 seconds
      { action: "Exhale...", duration: 6}  // exhale for 10 seconds
    ];
  
    let currentInterval = 0;
    let timer;
    let isBreathing = false;
  
    const actionText = document.getElementById("actionText");
    const timerText = document.getElementById("timer");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
  
    function startBreathing() {
      isBreathing = true;
      startButton.disabled = true; // Disable start button
      stopButton.disabled = false; // Enable stop button
      changeCycle();
    }
  
    function stopBreathing() {
      isBreathing = false;
      startButton.disabled = false; // Enable start button
      stopButton.disabled = true; // Disable stop button
      clearInterval(timer);
      actionText.textContent = "Breathing Stopped";
      timerText.textContent = "00:00";
    }
  
    function changeCycle() {
      if (!isBreathing) return;
  
      // Set the action text and reset the timer
      actionText.textContent = breathingIntervals[currentInterval].action;
      let duration = breathingIntervals[currentInterval].duration;
      let secondsLeft = duration;
  
      // Start the timer countdown
      timer = setInterval(() => {
        timerText.textContent = formatTime(secondsLeft);
        if (secondsLeft <= 0) {
          clearInterval(timer);
          // Move to next breathing action
          currentInterval = (currentInterval + 1) % breathingIntervals.length;
          setTimeout(changeCycle, 1000); // Wait before starting the next cycle
        }
        secondsLeft--;
      }, 1000);
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return `${minutes}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
    }
  
    // Start and Stop button event listeners
    startButton.addEventListener("click", startBreathing);
    stopButton.addEventListener("click", stopBreathing);
  });
  