import React from 'react';

export const EmptyTransaction: React.FC = () => {
  return (
    <div className="row justify-content-center mt-0">
      <div className="empty-box-transaction">
        <h2>No results matches your search</h2>
      </div>
    </div>
  );
};
