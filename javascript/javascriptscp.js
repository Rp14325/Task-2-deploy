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
