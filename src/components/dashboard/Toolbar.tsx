import React from 'react';

export const Toolbar: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="toolbar">
          <button className="btn">Add your bank account</button>
          <button className="btn">Add recipient</button>
          <button className="btn">Search</button>
        </div>
      </div>
    </div>
  );
};
