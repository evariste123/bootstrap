// 1. Elements
const codeArea = document.getElementById('code');
const terminal = document.getElementById('terminal');
const langSelect = document.getElementById('lang');
const timeDisplay = document.getElementById('time');

// 2. Real-time Clock
setInterval(() => {
    timeDisplay.textContent = `System Time: ${new Date().toLocaleTimeString()}`;
}, 1000);

// 3. Helper: Print to Terminal
function printToTerminal(msg, type = 'log') {
    const div = document.createElement('div');
    div.className = type;
    div.innerHTML = `<b>></b> ${msg}`;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
}

// 4. Run Code (Updated Logic for Real Output & HTML Rendering)
function asserts(initialMsg) {
    const lang = langSelect.value;
    const code = codeArea.value;
    
    // Clear terminal for new run
    terminal.innerHTML = `<b>> [${lang.toUpperCase()}] Running...</b>`;

    if (!code.trim()) {
        printToTerminal('Error: Editor is empty!', 'error');
        return;
    }

    if (lang === 'js') {
        try {
            // 1. Capture console.log output
            const originalLog = console.log;
            console.log = (...args) => {
                const output = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : arg
                ).join(' ');
                printToTerminal(output, 'success');
                originalLog(...args);
            };

            // 2. Execute code and capture returned values
            const result = eval(code);
            if (result !== undefined) {
                printToTerminal(`Returned: ${result}`, 'log');
            }

            // Reset console back to normal
            console.log = originalLog;
        } catch (err) {
            printToTerminal(`Runtime Error: ${err.message}`, 'error');
        }
    } 
    else if (lang === 'html') {
        // For HTML: Render it inside the console area safely
        const frame = document.createElement('div');
        frame.style.background = 'white';
        frame.style.color = 'black';
        frame.style.padding = '10px';
        frame.style.marginTop = '10px';
        frame.style.borderRadius = '4px';
        frame.innerHTML = code;
        terminal.appendChild(frame);
        printToTerminal('HTML Rendered above.', 'success');
    }
    else {
        // Simulation for Backend languages (Python, PHP, etc.)
        setTimeout(() => {
            printToTerminal(`Notice: Browser cannot run ${lang.toUpperCase()} natively.`, 'log');
            printToTerminal(`Simulated Output for: ${code.substring(0, 20)}...`, 'success');
        }, 500);
    }
}

// 5. Button Functionalities
document.querySelector('.btn-clear').onclick = () => {
    codeArea.value = '';
    terminal.innerHTML = '<b>> Terminal Cleared.</b>';
};

document.querySelector('.btn-save').onclick = () => {
    localStorage.setItem('savedCode', codeArea.value);
    printToTerminal('Code saved to local storage.', 'success');
};

document.querySelector('.btn-theme').onclick = function() {
    document.body.classList.toggle('dark-theme');
    this.textContent = document.body.classList.contains('dark-theme') ? '☀️ Light' : '🌙 Theme';
};

document.querySelector('.btn-setting').onclick = () => {
    const size = prompt("Enter font size (e.g., 18px):", "16px");
    if (size) codeArea.style.fontSize = size;
};

document.querySelector('.btn').onclick = () => { // Download button
    const blob = new Blob([codeArea.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `script.${langSelect.value}`;
    link.click();
};

// 6. File & Footer Buttons
document.getElementById('form').onsubmit = (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input').value;
    printToTerminal(`File "${name}" created successfully.`, 'success');
};

document.getElementById('Import').onclick = () => printToTerminal('Opening folder picker...', 'log');
document.getElementById('Share').onclick = () => {
    navigator.clipboard.writeText(codeArea.value);
    alert('Code copied to clipboard!');
};

document.getElementById('Documentation').onclick = () => window.open('https://developer.mozilla.org', '_blank');
document.getElementById('Keyboard').onclick = () => alert('Ctrl+Enter: Run\nCtrl+S: Save\nCtrl+L: Clear');

// 7. Shortcuts
document.onkeydown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') asserts('Running...');
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); document.querySelector('.btn-save').click(); }
};
