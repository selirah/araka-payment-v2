import React from 'react';

const EmptyBox: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="new-user">
          <div className="top-display">Oops!!</div>
          <div className="bottom-display">
            Sorry, this operation can't be performed at this time
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmptyBox };
