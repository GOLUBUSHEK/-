// Управление слайдером фактов на страницах событий

document.addEventListener("DOMContentLoaded", function() {
   const sliders = document.querySelectorAll('.facts-slider');
   
   sliders.forEach(slider => {
      const slides = slider.querySelectorAll('.slide');
      let currentIndex = 0;
      
      function showSlide(index) {
         slides.forEach(slide => slide.classList.remove('active'));
         slides[index].classList.add('active');
      }
      
      // Кнопка "Следующий факт"
      const nextBtn = slider.querySelector('#nextBtn');
      nextBtn.addEventListener('click', () => {
         currentIndex = (currentIndex + 1) % slides.length; // Цикличность
         showSlide(currentIndex);
      });

      // Кнопка "Предыдущий факт"
      const prevBtn = slider.querySelector('#prevBtn');
      prevBtn.addEventListener('click', () => {
         currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Цикличность назад
         showSlide(currentIndex);
      });
      
      showSlide(0); // Показать первый факт при загрузке
   });
});
