// Управление слайдером фактов (Автоматическая смена и кнопки)

document.addEventListener("DOMContentLoaded", function() {
   const sliders = document.querySelectorAll('.facts-slider');
   
   sliders.forEach(slider => {
      const track = slider.querySelector('.slider-track');
      const slides = Array.from(track.querySelectorAll('.slide'));
      
      let currentIndex = 0; // Текущий индекс слайда
      let intervalId = null; // ID интервала для автопрокрутки
      
      // Функция для показа конкретного слайда
      const showSlide = (index) => {
         // Проверка границ (если индекс вышел за пределы)
         if (index >= slides.length) index = 0;
         if (index < 0) index = slides.length - 1;
         
         // Убираем класс 'active' у текущего слайда
         slides[currentIndex].classList.remove('active');
         
         // Обновляем индекс и добавляем класс 'active' новому слайду
         currentIndex = index;
         slides[currentIndex].classList.add('active');
      };
      
      // Следующий слайд
      const nextSlide = () => showSlide(currentIndex + 1);
      
      // Предыдущий слайд
      const prevSlide = () => showSlide(currentIndex - 1);
      
      // Автоматическая смена слайдов каждые 7 секунд
      const startAutoPlay = () => {
         intervalId = setInterval(nextSlide, 7000);
      };
      
      // Останавливаем автопрокрутку при наведении мыши на слайдер
      slider.addEventListener('mouseenter', () => clearInterval(intervalId));
      
      // Запускаем снова, когда уводим мышь
      slider.addEventListener('mouseleave', startAutoPlay);
      
      // Запускаем автоматическую смену при загрузке страницы
      showSlide(0); // Показать первый слайд сразу
      startAutoPlay();
   });
});
