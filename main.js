
const trail = [];
const maxTrailLength = 15;
const dotPool = []; // Reuse elements instead of creating new ones

// Pre-create dots to avoid DOM creation during mousemove
for (let i = 0; i < maxTrailLength; i++) {
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.position = 'fixed';
  dot.style.pointerEvents = 'none';
  dot.style.opacity = '0';
  document.body.appendChild(dot);
  dotPool.push(dot);
}

let mouseX = 0, mouseY = 0;
let animationId;




// Just track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (!animationId) {
    animationId = requestAnimationFrame(updateTrail);
  }
});

function updateTrail() {
  // Add new position
  trail.push({ x: mouseX, y: mouseY });
  
  if (trail.length > maxTrailLength) {
    trail.shift();
  }
  
  // Update dots
  trail.forEach((pos, index) => {
    const dot = dotPool[index];
    const opacity = (index + 1) / trail.length;
    
    dot.style.left = pos.x - 4 + 'px';
    dot.style.top = pos.y - 4 + 'px';
    dot.style.opacity = opacity;
    dot.style.transform = `scale(${opacity})`;
  });
  
  // Hide unused dots
  for (let i = trail.length; i < maxTrailLength; i++) {
    dotPool[i].style.opacity = '0';
  }
  
  animationId = null;
}

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const anchor = event.target.closest('a');
        const targetId = anchor.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('jiggle');
      setTimeout(() => entry.target.classList.remove('jiggle'), 600); // remove to allow retrigger
    }
  });
});

document.querySelectorAll('.card').forEach(el => observer.observe(el));


const cards = document.querySelectorAll(".card");
const originalHeight = 100;

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("expand");
    card.style.transition = "height 0.5s ease, box-shadow 0.3s ease";
    card.style.height = "auto";

    const fullHeight = card.scrollHeight;
    card.style.height = originalHeight + "px";

    requestAnimationFrame(() => {
      card.style.height = fullHeight + "px";
    });
  });

  card.addEventListener("mouseleave", () => {
    const fullHeight = card.scrollHeight;
    card.style.height = fullHeight + "px";

    setTimeout(() => {
      card.style.transition = "height 0.3s ease";
      card.style.height = originalHeight + "px";

      card.addEventListener("transitionend", () => {
        card.style.height = "";
        card.style.transition = "";
      }, { once: true });
    }, 200); 
    card.classList.remove("expand");
  });
});


