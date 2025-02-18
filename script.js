// Script for additional interactive features can go here

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const h2Elements = document.querySelectorAll("section h2");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible"); // Remove when out of view
                }
            });
        },
        { threshold: 0.6 } // Adjusts when effect triggers (60% in view)
    );

    h2Elements.forEach((h2) => {
        observer.observe(h2);
    });
});


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Clear form inputs
    this.reset();

    // Show success message
    let message = document.getElementById("successMessage");
    message.classList.remove("hidden");
    message.classList.add("show");

    // Hide message after 3 seconds
    setTimeout(() => {
        message.classList.remove("show");
    }, 3000);
});