function showWarning(button) {
  // Set the button to a warning state
  button.style.backgroundColor = '#ff0000';
  button.style.color = '#ffffff';
  button.innerText = 'Disabled!';

  // After 1 second, reset the button to its original state
  setTimeout(function() {
      button.style.backgroundColor = '';
      button.style.color = '';
      // If the button is the first child, set its text to 'Login', otherwise 'Sign Up'
      button.innerText = button === document.querySelector('.btns button:first-child') ? 'Login' : 'Sign Up';
  }, 1000);
}

  
// When the user scrolls the page, execute the scrollFunction
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // If the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    // Else hide the button
    document.getElementById("myBtn").style.display = "none";
  }
}

function topFunction() {
  // When the user clicks on the button, scroll to the top of the document
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//=================================================================================================

// Global variable to keep track of current speech
let currentSpeech = null;

/**
 * Speaks the provided text using text-to-speech.
 * @param {string} text - The text to be spoken.
 */
function speakText(text) {
    // Check if we are currently speaking
    if (window.speechSynthesis.speaking) {
        // If we are speaking, stop the current speech
        window.speechSynthesis.cancel();
        // If the current speech is the same as the new text, don't start speaking again
        if (currentSpeech === text) {
            currentSpeech = null;
            return;
        }
    }

    // Set up new speech
    const speech = new SpeechSynthesisUtterance(text);
    // Assign currentSpeech to new text
    currentSpeech = text;
    // Speak the actual text
    window.speechSynthesis.speak(speech);
}

// Event listener for a button with id 'fetchButton'
document.getElementById("fetchButton").addEventListener('click', () => {
    // Fetch JSON data from a correct URL or file path
    fetch('Json/json.json')  // Make sure this path is correct!
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});

/**
 * Displays fetched data on webpage.
 * @param {Array} data - An array of data items.
 */
function displayData(data) {
    const displayArea = document.getElementById("dataDisplay");
    
    // Clear previous content in display area before appending new data
	displayArea.innerHTML = '';

	data.forEach(item => {
		const div = document.createElement("div");
		const content = `<strong>Subject: </strong> ${item.subject}
            <br><strong>Class: </strong> ${item.class}
            <br><strong>Summary: </strong> ${item.summary}
            <br>`;

        // Create a button for text-to-speech
        const speechButton = document.createElement('button');
        speechButton.textContent = "Read/Stop";

        // Set up the text to be spoken
        const textToSpeak = item.summary;
        speechButton.addEventListener('click', () => { speakText(textToSpeak) });

        // Append content and button to the display area
        div.innerHTML = content;
        displayArea.appendChild(speechButton);
        displayArea.appendChild(div);
    });
}
