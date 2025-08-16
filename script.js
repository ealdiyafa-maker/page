function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };

    const madinahTime = now.toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Riyadh' });
    const nyTime = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' });
    const jakartaTime = now.toLocaleTimeString('en-ID', { ...options, timeZone: 'Asia/Jakarta' });
    const londonTime = now.toLocaleTimeString('en-GB', { ...options, timeZone: 'Europe/London' });
    const moscowTime = now.toLocaleTimeString('ru-RU', { ...options, timeZone: 'Europe/Moscow' });

    document.getElementById('madinah-time').textContent = madinahTime;
    document.getElementById('ny-time').textContent = nyTime;
    document.getElementById('jakarta-time').textContent = jakartaTime;
    document.getElementById('london-time').textContent = londonTime;
    document.getElementById('moscow-time').textContent = moscowTime;
}

updateTime();
setInterval(updateTime, 1000); // Update every second

// Slideshow script
const slides = document.querySelectorAll('.slideshow img');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds
