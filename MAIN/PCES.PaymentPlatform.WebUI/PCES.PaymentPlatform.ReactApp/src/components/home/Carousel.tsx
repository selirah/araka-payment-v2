import React from 'react';
import { ecommerce_1, ecommerce_3, stock_2 } from '../../images/Images';
import { useTranslation } from 'react-i18next';

const Carousel: React.FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="7000"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div
            className="carousel-item active"
            style={{ backgroundImage: `url(${ecommerce_1})` }}
          >
            <div className="carousel-caption text-center">
              <h1>{t('home.welcome')}</h1>
              <h3>{t('home.slogan')}</h3>
              <a
                href="/"
                className="btn btn-outline-light btn--animated btn-lg"
              >
                {t('home.get_started')}
              </a>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{ backgroundImage: `url(${stock_2})` }}
          ></div>

          <div
            className="carousel-item"
            style={{ backgroundImage: `url(${ecommerce_3})` }}
          ></div>
        </div>
        <a
          href="#carouselExampleIndicators"
          className="carousel-control-prev"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </a>
        <a
          href="#carouselExampleIndicators"
          className="carousel-control-next"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </a>
      </div>
    </React.Fragment>
  );
};

export { Carousel };
