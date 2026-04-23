// Автоматическое перелистывание слайдов на всех страницах

document.addEventListener("DOMContentLoaded", function() {
   const sliders = document.querySelectorAll('.slider');
   
   sliders.forEach(slider => {
      const slides = slider.querySelectorAll('.slide');
      let currentIndex = 0;
      
      function showSlide(index) {
         slides.forEach(slide => slide.classList.remove('active'));
         slides[index].classList.add('active');
      }
      
      // Запускаем авто-перелистывание каждые 5 секунд (5000 мс)
      setInterval(() => {
         currentIndex = (currentIndex + 1) % slides.length;
         showSlide(currentIndex);
      }, 5000);
      
      showSlide(0); // Показать первый слайд при загрузке
   });
});