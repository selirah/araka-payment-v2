import React from 'react';

interface EmptyRecipientProps {
  message: string;
}

export const EmptyRecipient: React.FC<EmptyRecipientProps> = ({ message }) => {
  return (
    <div className="row justify-content-center">
      <div className="empty-box">
        <h2>{message}</h2>
      </div>
    </div>
  );
};
