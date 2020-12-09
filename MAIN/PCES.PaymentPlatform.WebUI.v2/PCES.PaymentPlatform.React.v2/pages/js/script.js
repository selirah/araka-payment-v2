import jQuery from 'jquery';
import Swiper from 'swiper';

jQuery(document).ready(function () {
  let swiperOptions = {
    speed: 5000,
    direction: 'horizontal',
    loop: true,
    freeMode: true,
    autoplay: {
      delay: 0,
    },
    slidesPerView: 6,
    spaceBetween: 30,
    centeredSlides: true,
  };
  new Swiper('.swiper-container.forward', swiperOptions);
  swiperOptions.autoplay['reverseDirection'] = true;
  new Swiper('.swiper-container.reverse', swiperOptions);
});
