document.addEventListener('DOMContentLoaded', () => {
    // Select the form from your HTML (make sure your <form> has class="contact-form")
    const contactForm = document.querySelector('.contact-form') || document.getElementById('signupForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = btn.textContent;
        
        // Capture ALL fields from the form
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // 1. Loading State
        btn.disabled = true;
        btn.textContent = "Processing...";

        setTimeout(() => {
            // 2. Show the summary of the record
            showSummaryModal(data, () => {
                // 3. Reset form and re-enable button AFTER "Continue" is clicked
                contactForm.reset();
                btn.disabled = false;
                btn.textContent = originalBtnText;
            });
        }, 800);
    });

    function showSummaryModal(data, onClose) {
        // Create Dark Overlay
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
            alignItems: 'center', zIndex: '9999', backdropFilter: 'blur(3px)'
        });

        // Generate the list of all recorded data
        const recordList = Object.entries(data)
            .map(([key, value]) => {
                // Formatting key names: "full_name" -> "Full Name"
                const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toLowerCase();
                return `
                <div style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <strong style="text-transform: capitalize; color: #555;">${label}:</strong> 
                    <span style="color: #000; float: right;">${value || 'N/A'}</span>
                </div>`;
            }).join('');

        // Create Modal Box
        const modal = document.createElement('div');
        Object.assign(modal.style, {
            background: 'white', padding: '30px', borderRadius: '12px',
            maxWidth: '400px', width: '90%', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', fontFamily: 'sans-serif'
        });

        modal.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 10px;">📋</div>
            <h2 style="margin: 0 0 15px 0; color: #333;">Record Summary</h2>
            <div style="text-align: left; margin-bottom: 20px; font-size: 14px; max-height: 250px; overflow-y: auto; padding-right: 5px;">
                ${recordList}
            </div>
            <p style="color: #666; font-size: 13px;">Your details have been successfully recorded.</p>
            <button id="closeSummary" style="
                width: 100%; padding: 12px; border: none; border-radius: 8px;
                background: #28a745; color: white; font-weight: bold; 
                cursor: pointer; font-size: 16px; transition: 0.2s;">
                Continue
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

       
        document.getElementById('closeSummary').onclick = () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
                if (onClose) onClose();
            }, 200);
        };
    }
});
