import React from 'react';
import { useTranslation } from 'react-i18next';

export const Search: React.FC = () => {
  const { t } = useTranslation();
  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-light border-0 small"
          placeholder={t('dashboard.old-user.search')}
          aria-label="Search"
        />
        <div className="input-group-append">
          <button className="btn" type="submit">
            <i className="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
