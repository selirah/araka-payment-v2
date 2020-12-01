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
