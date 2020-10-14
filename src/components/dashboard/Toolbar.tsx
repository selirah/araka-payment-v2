import React from 'react';
import { modalTypes } from '../../helpers/constants';

interface ToolbarProps {
  onShowModalClick(type: string): void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onShowModalClick }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="toolbar">
          <button className="btn">Add your bank account</button>
          <button
            className="btn"
            onClick={() => onShowModalClick(modalTypes.ADD_BENEFICIARY)}
            data-target="#staticBackdrop"
          >
            Add beneficiary
          </button>
          <button className="btn">Search</button>
        </div>
      </div>
    </div>
  );
};
