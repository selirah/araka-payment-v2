import React from 'react';
import { Toolbar } from './Toolbar';
import { user as avatar } from '../../images/Images';

export const Recipients: React.FC = () => {
  return (
    <React.Fragment>
      <Toolbar />
      <div className="row">
        <div className="col-12">
          <div className="contact-header">
            <h2>Contacts on ARAKA</h2>
          </div>
          <div className="contacts-container">
            <div className="contact">
              <img src={avatar} alt="contact-profile" />
              <div className="contact-detail">
                <h4>Mr. Maombi Baraka</h4>
                <h6>+340 403 059 5656</h6>
              </div>
            </div>
            <div className="contact">
              <img src={avatar} alt="contact-profile" />
              <div className="contact-detail">
                <h4>Miss. Tatiana Baraka</h4>
                <h6>+340 403 059 8632</h6>
              </div>
            </div>
          </div>
          <div className="contact-header">
            <h2>Other recipients</h2>
          </div>
          <div className="contacts-container">
            <div className="contact">
              <img src={avatar} alt="contact-profile" />
              <div className="contact-detail">
                <h4>Cousin Carlos</h4>
                <h6>+340 433 039 6676</h6>
              </div>
            </div>
            <div className="contact">
              <img src={avatar} alt="contact-profile" />
              <div className="contact-detail">
                <h4>Rick Sanchez</h4>
                <h6>+340 403 059 2334</h6>
              </div>
            </div>
            <div className="contact">
              <img src={avatar} alt="contact-profile" />
              <div className="contact-detail">
                <h4>Morty Smith</h4>
                <h6>+340 403 059 1122</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
