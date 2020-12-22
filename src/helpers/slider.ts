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
    };

    new Swiper('.swiper-container.forward', swiperOptions);
    swiperOptions.autoplay = true;
    new Swiper('.swiper-container.reverse', swiperOptions);

    let bannerTextTimeline = gsap.timeline({
      defaults: { duration: 1, delay: 1 },
    });
    let comingSoonTimeline = gsap.timeline({
      defaults : { duration: .8, delay: 3} ,
    });
    let wireframeTimeline = gsap.timeline({
      defaults: { duration: 0.7, ease: Back.easeOut.config(2), opacity: 0 },
    });
    let wholePhoneTimeline = gsap.timeline({
      defaults: { duration: 1.5, delay: 1 },
    });

    wireframeTimeline
      .from(
        '.iphone-bg, .iphone-inner-frame',
        { delay: 1, scale: 0.2, transformOrigin: 'center' },
        '=.2'
      )
      .from('.iphone-buttons', { scaleY: 0, transformOrigin: 'top' }, '=.2')
      .from(
        '.iphone-speaker, .iphone-camera, .blip',
        { scale: 0.2, transformOrigin: 'center' },
        '-=.7'
      )
      .from('.skeleton1', { scaleX: 0 })
      .from('.skeleton2', { scaleX: 0 }, '-=.2')
      .from('.skeleton3', { scaleX: 0 }, '-=.3')
      .from('.skeleton4', { scaleX: 0 }, '-=.4')
      .from('.skeleton5', { scaleX: 0 }, '-=.4')
      .from('.skeleton6', { scaleX: 0 }, '-=.4')
      .from('.skeleton7', { scaleX: 0 }, '-=.5')
      .from('.skeleton8', { scaleX: 0 }, '-=.5')
      .from('.skeleton9', { scaleX: 0 }, '-=.5')
      .from('.skeleton10', { scaleX: 0 }, '-=.5')
      .from('.skeleton11', { scaleX: 0 }, '-=.6')
      .from('.skeleton12', { scaleX: 0 }, '-=.6')
      .from('.skeleton13', { scaleX: 0 }, '-=.6')
      .from('.skeleton14', { scaleX: 0 }, '-=.7')
      .from('.pay-button', { scaleY: 0, transformOrigin: 'bottom' }, '=.9');

    wholePhoneTimeline.from('.whole-phone', {
      delay: 8,
      y: 3,
      repeat: -1,
      yoyo: true,
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
