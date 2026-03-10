document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (e) => {
        // 1. Prevent the page from refreshing
        e.preventDefault();

        // 2. Capture values using IDs
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // 3. Simple Mock Validation
        if (user === "" || pass === "") {
            alert("Please fill in all fields.");
            return;
        }

        // 4. Handle "Remember Me" logic
        if (remember) {
            localStorage.setItem('savedUser', user);
            console.log("Saving user to local storage...");
        } else {
            localStorage.removeItem('savedUser');
        }

        // 5. Simulate Login Request
        console.log("Logging in...", { user, pass, remember });
        
        // Visual feedback
        const btn = loginForm.querySelector('button');
        btn.textContent = "Authenticating...";
        btn.disabled = true;

        setTimeout(() => {
            alert(`Welcome back, ${user}! Login successful.`);
            
            // Redirect to a dashboard or home page
            // window.location.href = "dashboard.html";
            
            btn.textContent = "Login";
            btn.disabled = false;
        }, 1200);
    });
    loginForm.reset();
});
