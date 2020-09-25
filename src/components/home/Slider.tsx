import React from 'react';

const Slider: React.FC = () => {
  return (
    <section className="logo-slider">
      <div className="container">
        <div className="row bg-white">
          <div className="col-sm-12">
            <div className="customer-logos slider swiper-container forward">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src="/img/logos/airtel.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/dstv.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/canalplus.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/vodacom.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/mpesa.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/orangemoney.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/airtelmoney.jpg" />
                </div>
              </div>
            </div>
            <div className="mt-4 customer-logos slider swiper-container reverse">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src="/img/logos/airtelmoney.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/airtel.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/mpesa.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/dstv.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/vodacom.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/orangemoney.jpg" />
                </div>
                <div className="swiper-slide">
                  <img src="/img/logos/canalplus.jpg" />
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
