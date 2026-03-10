document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', (e) => {
        // 1. Prevent page refresh
        e.preventDefault();

        // 2. Reference the button to show feedback
        const btn = contactForm.querySelector('.submit-button');
        const originalBtnText = btn.textContent;
        
        // 3. Extract data using FormData
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // 4. UI Feedback: Disable button while "sending"
        btn.disabled = true;
        btn.textContent = "Sending...";

        // 5. Simulate a server request (e.g., API call)
        setTimeout(() => {
            console.log("Contact Form Data:", data);
            
            // 6. Success handling
            alert(`Message Sent!\nThank you, ${data.name}. We will get back to you soon regarding "${data.subject}".`);
            
            // 7. Reset form and button
            contactForm.reset();
            btn.disabled = false;
            btn.textContent = originalBtnText;
        }, 1500);
    });
});
