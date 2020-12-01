<<<<<<< HEAD
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  onSearch(e: React.FormEvent<EventTarget>): void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  return (
    <div className="search">
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-light small"
          placeholder={t('dashboard.old-user.search')}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};
=======
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  onSearch(e: React.FormEvent<EventTarget>): void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  return (
    <div className="search">
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-light small"
          placeholder={t('dashboard.old-user.search')}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
