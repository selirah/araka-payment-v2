import React from 'react';
import * as Images from '../../images/Images';

const Slider: React.FC = () => {
  return (
    <section className="logo-slider">
      <div className="container">
        <div className="row bg-white">
          <div className="col-sm-12">
            <div className="customer-logos slider swiper-container forward">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src={Images.airtel} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.dstv} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.canal} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.vodacom} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.mpesa} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.orange} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.airtelMoney} alt="logo" />
                </div>
              </div>
            </div>
            <div className="mt-4 customer-logos slider swiper-container reverse">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src={Images.airtelMoney} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.airtel} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.mpesa} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.dstv} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.vodacom} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.orange} alt="logo" />
                </div>
                <div className="swiper-slide">
                  <img src={Images.canal} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Slider };
