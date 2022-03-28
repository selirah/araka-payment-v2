import Swiper, { SwiperOptions } from 'swiper';
import gsap, { Back } from 'gsap';

const slider = () => {
  if (document.querySelector('.home-page') !== null) {
    const swiperOptions: SwiperOptions = {
      speed: 5000,
      direction: 'horizontal',
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 0,
        reverseDirection: true,
      },
      slidesPerView: 6,
      spaceBetween: 30,
      centeredSlides: true,
      breakpoints: {
        480: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        720: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        940: {
          slidesPerView: 6,
          spaceBetween: 30,
        }
      }
    };

    new Swiper('.swiper-container.forward', swiperOptions);
    swiperOptions.autoplay = true;
    new Swiper('.swiper-container.reverse', swiperOptions);

    let bannerTextTimeline = gsap.timeline({
      defaults: { duration: 1, delay: 1 },
    });
    let comingSoonTimeline = gsap.timeline({
      defaults: { duration: 0.8, delay: 3 },
    });
    gsap.timeline({
      defaults: { duration: 0.7, ease: Back.easeOut.config(2), opacity: 0 },
    });

    bannerTextTimeline.from('.banner-text', {
      opacity: 0,
      y: 30,
      stagger: 0.5,
    });
    comingSoonTimeline.from('.comingSoon', {
      opacity: 0,
      y: 40,
      stagger: 2.5,
    });
  }
};

export { slider };
