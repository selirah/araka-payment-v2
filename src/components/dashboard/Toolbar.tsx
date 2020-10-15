import React from 'react';
import { modalTypes } from '../../helpers/constants';
import { Search } from './Search';

interface ToolbarProps {
  onShowModalClick(type: string): void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onShowModalClick }) => {
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
          <Search />
        </div>
      </div>
    </div>
  );
};
