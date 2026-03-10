document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capture all input values
        const username = document.getElementById('username').value.trim();
        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const agreed   = document.getElementById('remember').checked;

        // 2. Simple logic check
        if (password.length < 6) {
            alert("Password is too short!");
            return;
        }

        // 3. UI Feedback (Button State)
        const btn = signupForm.querySelector('button');
        btn.disabled = true;
        btn.textContent = "Processing...";

        // 4. Simulate Account Creation
        setTimeout(() => {
            // Create a "Success Card" to show the details
            const profileHTML = `
                <div id="account-details" style="margin-top: 20px; padding: 20px; border: 2px solid #28a745; border-radius: 8px; background: #f0fff0;">
                    <h3 style="color: #28a745; margin-top: 0;">✅ Account Created!</h3>
                    <p><strong>Username:</strong> ${username}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Password:</strong> ${'*'.repeat(password.length)} (Hidden)</p>
                    <p><strong>Terms Accepted:</strong> ${agreed ? 'Yes' : 'No'}</p>
                    <button onclick="location.reload()" style="background:#555; color:white; padding:5px 10px; border:none; cursor:pointer;">Close</button>
                </div>
            `;

            // Replace the form with the account details OR append below it
            signupForm.innerHTML = profileHTML;

            console.log("Full User Profile Object:", {
                username,
                email,
                password,
                signupDate: new Date().toLocaleString()
            });

        }, 1200);
    });
});
