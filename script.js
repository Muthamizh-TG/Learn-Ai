// Matrix effect
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.height = 300;
    canvas.width = 400;

    const letters = "T E C H N O L O G Y   G A R A G E   T R I C H Y";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00f5d4";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 40);
    // Auto year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Reveal cards on scroll (for old section)
    const cards = document.querySelectorAll(".card");
    const revealOnScroll = () => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          card.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      document.body.appendChild(particle);
    }

    // Card Slider Logic
    const sliderTrack = document.querySelector('.slider-track');
    const sliderCards = document.querySelectorAll('.slider-card');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');
    let currentIndex = 0;
    const visibleCards = window.innerWidth < 600 ? 1 : 2;

    function updateSlider() {
      const cardWidth = sliderCards[0].offsetWidth + 30; // gap
      sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    leftArrow.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
    rightArrow.addEventListener('click', () => {
      currentIndex = Math.min(sliderCards.length - visibleCards, currentIndex + 1);
      updateSlider();
    });
    window.addEventListener('resize', () => {
      updateSlider();
    });
    updateSlider();

    function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const toggle = element.querySelector('.faq-toggle');
            const isOpen = answer.classList.contains('open');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('open');
            });
            document.querySelectorAll('.faq-toggle').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isOpen) {
                answer.classList.add('open');
                toggle.classList.add('active');
            }
        }

        function closeFAQ() {
            // You can customize this function to hide the FAQ or redirect
            console.log('Close FAQ clicked');
            // For demo purposes, just hide the container
            document.querySelector('.faq-container').style.opacity = '0.5';
            setTimeout(() => {
                document.querySelector('.faq-container').style.display = 'none';
            }, 300);
        }

        // Close FAQ when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.faq-item') && !e.target.closest('.faq-button') && !e.target.closest('.close-btn')) {
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('open');
                });
                document.querySelectorAll('.faq-toggle').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        });


