const adviceId = document.getElementById('advice-id');
const adviceText = document.getElementById('advice-text');
const nextBtn = document.getElementById('next-btn');
const copyBtn = document.getElementById('copy-btn');

async function fetchAdvice() {
    // Smoothly fade out the current text before switching content
    adviceText.classList.add('fade-out');
    
    try {
        // Using the free slip advice API (adding a timestamp cache-buster)
        const res = await fetch(`https://api.adviceslip.com/advice?t=${new Date().getTime()}`);
        if (!res.ok) throw new Error("Could not fetch advice");
        
        const data = await res.json();
        
        // Wait briefly for the fade-out transition to complete
        setTimeout(() => {
            adviceId.innerText = data.slip.id;
            adviceText.innerText = `"${data.slip.advice}"`;
            adviceText.classList.remove('fade-out');
        }, 300);
        
    } catch (err) {
        setTimeout(() => {
            adviceText.innerText = '"Check back in a moment for more wisdom."';
            adviceText.classList.remove('fade-out');
        }, 300);
        console.error(err);
    }
}

// Click to Copy Clipboard Feature
copyBtn.addEventListener('click', () => {
    const textToCopy = adviceText.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalIcon = copyBtn.innerText;
        copyBtn.innerText = "✓"; // Quick cute visual confirmation
        setTimeout(() => {
            copyBtn.innerText = originalIcon;
        }, 1500);
    });
});

nextBtn.addEventListener('click', fetchAdvice);

// Load an initial piece of advice automatically on open
fetchAdvice();