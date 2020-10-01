import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContainer } from './Styles';

const ChangeLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  return (
    <React.Fragment>
      <LanguageContainer>
        <i
          className="flag-icon flag-icon-gb"
          onClick={() => changeLanguage('en')}
        ></i>
        <i
          className="flag-icon flag-icon-fr"
          onClick={() => changeLanguage('fr')}
        ></i>
      </LanguageContainer>
    </React.Fragment>
  );
};

export { ChangeLanguage };
