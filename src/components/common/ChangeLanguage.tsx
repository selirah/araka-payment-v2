import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContainer, DropdownToggle } from './Styles';

const ChangeLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const href = '#';

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <React.Fragment>
      <LanguageContainer className="col-sm-6 d-flex pl-3">
        <DropdownToggle
          className="dropdown-toggle"
          id="dropdown-flag"
          href={href}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ textDecoration: 'none' }}
        >
          {t('home.language')}{' '}
          {lang === 'en' ? (
            <i className="flag-icon flag-icon-gb"></i>
          ) : (
            <i className="flag-icon flag-icon-fr"></i>
          )}
          <span className="selected-language"></span>
        </DropdownToggle>
        <div
          className="dropdown-menu drop-down-custom"
          aria-labelledby="dropdown-flag"
          x-placement="bottom-start"
          style={{
            position: 'absolute',
            transform: 'translate3d(15px, 19px, 0px)',
            top: '0px',
            left: '0px',
            willChange: 'transform',
          }}
        >
          <a
            className="dropdown-item"
            href={href}
            onClick={() => changeLanguage('en')}
          >
            <i className="flag-icon flag-icon-gb"></i> {t('nav_links.english')}
          </a>
          <a
            className="dropdown-item"
            href={href}
            onClick={() => changeLanguage('fr')}
          >
            <i className="flag-icon flag-icon-fr"></i> {t('nav_links.french')}
          </a>
        </div>
      </LanguageContainer>
    </React.Fragment>
  );
};

export { ChangeLanguage };
