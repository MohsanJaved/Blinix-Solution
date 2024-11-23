function openSidebar() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("overlay").classList.add("open");
  }
  
  function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
  }

 // PopUP Start here

function openPopup() {
    document.getElementById("popup").classList.add("open");
  }
  
  function closePopup() {
    document.getElementById("popup").classList.remove("open");
  }
  
  // Close the popup when clicking outside the popup content
  window.onclick = function (event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
      closePopup();
    }
  };


 // Custom Swiper Functionality with Loop and Swipe/Touch support
 const swiperWrapper = document.querySelector('.custom-swiper-wrapper');
 const slides = document.querySelectorAll('.custom-swiper-slide');
 const nextButton = document.querySelector('.custom-swiper-button-next');
 const prevButton = document.querySelector('.custom-swiper-button-prev');

 let currentIndex = 0;
 const slidesToShow = 3; // Number of visible slides
 const totalSlides = slides.length;

 let startX = 0;  // Starting X position for touch
 let currentX = 0; // Current X position for touch
 let isDragging = false; // Dragging flag

 // Function to move slides
 function updateSwiper() {
   const slideWidth = slides[0].clientWidth + 40; // Include gap
   swiperWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`; // Adjust the translate
 }

 // Clone slides for loop effect
 function setupLoop() {
   const firstSlides = [...slides].slice(0, slidesToShow);
   const lastSlides = [...slides].slice(-slidesToShow);

   firstSlides.forEach(slide => swiperWrapper.appendChild(slide.cloneNode(true)));
   lastSlides.reverse().forEach(slide => swiperWrapper.prepend(slide.cloneNode(true)));

   updateSwiper();
 }

 // Next Button Click
 nextButton.addEventListener('click', () => {
   moveToNextSlide();
 });

 // Prev Button Click
 prevButton.addEventListener('click', () => {
   moveToPrevSlide();
 });

 function moveToNextSlide() {
   currentIndex++;
   if (currentIndex >= totalSlides + slidesToShow) {
     currentIndex = slidesToShow;
     swiperWrapper.style.transition = 'none'; // Disable transition for jump
     updateSwiper();
     setTimeout(() => {
       swiperWrapper.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
     }, 0);
   }
   updateSwiper();
 }

 function moveToPrevSlide() {
   currentIndex--;
   if (currentIndex < 0) {
     currentIndex = totalSlides;
     swiperWrapper.style.transition = 'none'; // Disable transition for jump
     updateSwiper();
     setTimeout(() => {
       swiperWrapper.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
     }, 0);
   }
   updateSwiper();
 }

 // Swipe/Touch Functionality
 swiperWrapper.addEventListener('touchstart', (e) => {
   startX = e.touches[0].clientX;
   isDragging = true;
 });

 swiperWrapper.addEventListener('touchmove', (e) => {
   if (!isDragging) return;
   currentX = e.touches[0].clientX;
 });

 swiperWrapper.addEventListener('touchend', () => {
   isDragging = false;
   const diffX = currentX - startX;

   if (diffX > 50) {
     moveToPrevSlide(); // Swipe right to go to the previous slide
   } else if (diffX < -50) {
     moveToNextSlide(); // Swipe left to go to the next slide
   }
 });

 // Initialize Swiper
 setupLoop();