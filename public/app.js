const express = require('express');
const Sentiment = require('sentiment');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route: Serve the HTML form with voice and text input for sentiment analysis
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Sentiment Analysis</title>
        <script>
          // Function to analyze text input
          function analyzeText() {
            const text = document.getElementById('text').value;
            if (text) {
              fetch('/analyze', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
              })
                .then(response => response.json())
                .then(data => {
                  showAlert(data.score); // Trigger the alert based on the score
                  document.getElementById('result').innerText = \`Sentiment: \${data.message}, Score: \${data.score}\`;
                })
                .catch(error => console.error('Error:', error));
            } else {
              alert('Please enter some text for analysis.');
            }
          }

          // Function to analyze voice input
          function analyzeVoice() {
            if (!('webkitSpeechRecognition' in window)) {
              alert('Your browser does not support speech recognition. Try using Google Chrome.');
              return;
            }

            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            document.getElementById('result').innerText = 'Listening... Speak now!';

            recognition.start();

            recognition.onresult = function (event) {
              const transcript = event.results[0][0].transcript;
              fetch('/analyze', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: transcript }),
              })
                .then(response => response.json())
                .then(data => {
                  showAlert(data.score); // Trigger the alert based on the score
                  document.getElementById('result').innerText = 
                    \`Voice Input: "\${transcript}"\nSentiment: \${data.message}, Score: \${data.score}\`;
                })
                .catch(error => console.error('Error:', error));
            };

            recognition.onerror = function (event) {
              document.getElementById('result').innerText = 'Error during recognition: ' + event.error;
            };
          }

          // Function to show alert based on sentiment score
          function showAlert(score) {
            console.log('Alert Triggered with Score:', score); // Debugging
            if (score > 0) {
              alert(\`Positive Sentiment (Score: \${score}):You’re doing amazing! It’s wonderful to see you in such a positive and balanced state. Keep nurturing this energy by continuing the practices that bring you peace and happiness.\`);
            } else if (score < 0) {
              alert(\`Negative Sentiment (Score: \${score}):It’s okay to feel this way.Counseling can provide tools to cope with sadness and stress. It’s a space just for you, where you won’t feel judged.Please contact a professional counseller provided in HELPLINE TAB
\`);
            } else {
              alert(\`Neutral Sentiment (Score: \${score}):You're in a balanced state right now—this is a great place to be! To keep this balance, consider taking a small moment for yourself today. Maybe go for a short walk, enjoy a hobby, or simply reflect on something positive in your life.\`);
            }
          }
        </script>
      </head>
      <body>
        <h1>Sentiment Analysis</h1>
        <form onsubmit="return false;">
          <label for="text">Enter your text:</label><br>
          <textarea id="text" rows="4" cols="50"></textarea><br><br>
          <button type="button" onclick="analyzeText()">Analyze Text</button><br><br>
          <button type="button" onclick="analyzeVoice()">Analyze Voice</button>
        </form>
        <div id="result"></div>
      </body>
    </html>
  `);
});

// Route: Handle sentiment analysis (both text and voice input)
app.post('/analyze', (req, res) => {
  const inputText = req.body.text;

  if (!inputText) {
    return res.json({ message: 'Please provide some text for analysis.' });
  }

  const sentiment = new Sentiment();
  const analysisResult = sentiment.analyze(inputText);
  const score = analysisResult.score;

  // Determine the sentiment result
  let sentimentResult;
  if (score > 0) {
    sentimentResult = 'Positive Sentiment';
  } else if (score < 0) {
    sentimentResult = 'Negative Sentiment';
  } else {
    sentimentResult = 'Neutral Sentiment';
  }

  // Respond with the sentiment result and score
  res.json({
    message: sentimentResult,
    score: score, // Include the score for the alert and result display
  });
});

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
