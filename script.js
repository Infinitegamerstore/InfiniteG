// Initialize Vanta.js waves background with dither effect
document.addEventListener('DOMContentLoaded', function() {
  VANTA.WAVES({
    el: "#vanta-bg",
    color: 0x282929,
    shininess: 50,
    waveHeight: 15,
    waveSpeed: 0.7,
    zoom: 0.75,
    forceAnimate: true
  });

  // WhatsApp group link
  const whatsappGroupURL = 'https://chat.whatsapp.com/LoOk6aSCYWG2puPoAGLhYT?mode=ac_t';
  
  // Slider functionality - KaisenStore inspired
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentIndex = 0;
  const slideCount = slides.length;
  
  function showSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  // Auto-rotate slides every 4 seconds
  let slideInterval = setInterval(nextSlide, 4000);
  
  // Add click handlers for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 4000);
    });
  });
  
  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 4000);
  });
  
  // Saturday Sales Countdown
  function updateCountdown() {
    const now = new Date();
    const nextSaturday = new Date();
    
    // Set to next Saturday at 00:00:00
    nextSaturday.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
    nextSaturday.setHours(0, 0, 0, 0);
    
    // If today is Saturday, check if it's past midnight
    if (now.getDay() === 6) {
      if (now.getHours() >= 0 && now.getHours() < 24) {
        // It's Saturday! Show the sales
        document.getElementById('countdown-container').style.display = 'none';
        document.getElementById('saturday-grid').style.display = 'grid';
        return;
      } else {
        // It's Saturday but past sales time, show next week
        nextSaturday.setDate(nextSaturday.getDate() + 7);
      }
    }
    
    const diff = nextSaturday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    
    document.getElementById('countdown-timer').textContent = 
      `${days}d ${hrs}h ${mins}m ${secs}s`;
    
    // If it's Saturday, show the sales
    if (now.getDay() === 6) {
      document.getElementById('countdown-container').style.display = 'none';
      document.getElementById('saturday-grid').style.display = 'grid';
    } else {
      document.getElementById('countdown-container').style.display = 'block';
      document.getElementById('saturday-grid').style.display = 'none';
    }
  }
  
  // Initialize countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Add hover effects to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleY = (x - centerX) / 20;
      const angleX = (centerY - y) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});