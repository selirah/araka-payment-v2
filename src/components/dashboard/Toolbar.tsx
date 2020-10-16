import React from 'react';
import { modalTypes } from '../../helpers/constants';
import { useTranslation } from 'react-i18next';

interface ToolbarProps {
  onShowModalClick(type: string): void;
  onSearch(e: React.FormEvent<EventTarget>): void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onShowModalClick,
  onSearch,
}) => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-12">
        <div className="toolbar">
          <button
            className="btn"
            onClick={() => onShowModalClick(modalTypes.ADD_BENEFICIARY)}
          >
            Add beneficiary
          </button>
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
        </div>
      </div>
    </div>
  );
};
