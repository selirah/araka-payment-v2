<<<<<<< HEAD
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
=======
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
