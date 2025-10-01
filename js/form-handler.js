// Contact form handling - No loading animations
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

function initContactForm() {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxyo2wG90z5DMjz1zupHgnaaCRuoKQlFdrf630qG315ohpjySUIRIDSH41Wxa_CXrymKg/exec';
  
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessages = document.getElementById('formMessages');

  function showFormMessage(message, isError = false) {
    formMessages.innerHTML = `<div class="form-message ${isError ? 'form-error' : 'form-success'}">${message}</div>`;
    
    // Auto-hide success messages after 5 seconds
    if (!isError) {
      setTimeout(() => {
        formMessages.innerHTML = '';
      }, 5000);
    }
  }

  if(contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.result === 'success') {
          showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
          contactForm.reset();
        } else {
          throw new Error(result.error || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or email me directly at ajmax979361@gmail.com', true);
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
}