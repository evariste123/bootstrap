document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    // 1. Scroll-to-Reveal Animation
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                section.style.transition = "all 0.6s ease-out";
            }
        });
    };

    // Initial styles for the animation
    sections.forEach(s => {
        s.style.opacity = "0";
        s.style.transform = "translateY(20px)";
    });

    // 2. Click to Highlight Card
    sections.forEach(section => {
        section.addEventListener('click', () => {
            // Remove highlight from others
            sections.forEach(s => s.style.border = "none");
            // Add highlight to clicked one
            section.style.border = "2px solid #007bff";
            section.style.borderRadius = "12px";
        });
    });

    // 3. Simple Search/Filter (Console Example)
    // Call filterContent('Global') in console to test
    window.filterContent = (term) => {
        sections.forEach(section => {
            const text = section.innerText.toLowerCase();
            section.style.display = text.includes(term.toLowerCase()) ? "block" : "none";
        });
    };

    // 4. Smooth scroll for internal links (if you have a nav)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Listen for scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load
});
