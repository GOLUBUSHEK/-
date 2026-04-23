// Управление слайдером фактов (Свайп влево-вправо)

document.addEventListener("DOMContentLoaded", function() {
   const sliders = document.querySelectorAll('.facts-slider');
   
   sliders.forEach(slider => {
      const track = slider.querySelector('.slider-track');
      const slides = slider.querySelectorAll('.slide');
      
      let isDragging = false;
      let startPos = 0;
      let currentIndex = 0;
      let timeoutId; // Для фиксации клика

      const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(slides[0]).paddingRight);

      // Функция для сдвига слайдера
      const shiftSlide = (index) => {
         if (index < 0 || index >= slides.length) return; // Проверка границ
         currentIndex = index;
         track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      };

      // Обработчики событий мыши
      track.addEventListener('mousedown', (e) => {
         isDragging = true;
         startPos = e.clientX;
         track.style.cursor = 'grabbing';
         clearTimeout(timeoutId); // Сбрасываем таймер, чтобы не сработал клик
      });

      document.addEventListener('mousemove', (e) => {
         if (!isDragging) return;
         const movePos = e.clientX - startPos;
         track.style.transform = `translateX(-${currentIndex * slideWidth + movePos}px)`;
      });

      document.addEventListener('mouseup', (e) => {
         if (!isDragging) return;
         isDragging = false;
         track.style.cursor = 'grab';
         
         const movePos = e.clientX - startPos;
         
         // Если свайп больше половины ширины слайда, переключаем
         if (Math.abs(movePos) > slideWidth / 2) {
            if (movePos < 0) { // Свайп ВПРАВО (к следующему)
               shiftSlide(currentIndex + 1);
            } else { // Свайп ВЛЕВО (к предыдущему)
               shiftSlide(currentIndex - 1);
            }
         } else { // Иначе возвращаем назад
            shiftSlide(currentIndex);
         }
      });

      // Обработчики событий касания (для телефонов)
      track.addEventListener('touchstart', (e) => {
         isDragging = true;
         startPos = e.touches[0].clientX;
         track.style.cursor = 'grabbing';
         clearTimeout(timeoutId);
      });

      document.addEventListener('touchmove', (e) => {
         if (!isDragging) return;
         const movePos = e.touches[0].clientX - startPos;
         track.style.transform = `translateX(-${currentIndex * slideWidth + movePos}px)`;
      });

      document.addEventListener('touchend', () => {
         isDragging = false;
         track.style.cursor = 'grab';
          // Для тач-устройств просто фиксируем текущий слайд при отпускании
          shiftSlide(currentIndex);
      });

       // Фиксация клика по слайду (чтобы не срабатывал drag при клике)
       track.addEventListener('click', () => {
           timeoutId = setTimeout(() => {
               shiftSlide(currentIndex + 1);
           }, 250); // Небольшая задержка, чтобы отличить клик от свайпа
       });
       
       // Отмена фиксации, если началось движение мышью
       track.addEventListener('mousedown', () => clearTimeout(timeoutId));
       track.addEventListener('touchstart', () => clearTimeout(timeoutId));
   });
});
