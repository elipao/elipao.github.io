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

document.addEventListener("DOMContentLoaded", function() {
    // Check if there's a success or error parameter in the URL
    const params = new URLSearchParams(window.location.search);
    if (params.has("success")) {
        alert("Your message has been sent successfully!");
    } else if (params.has("error")) {
        alert("There was an error sending your message. Please try again.");
    }
});
