import React from 'react';

type NoFeeProps = {
  message: string;
};

export const NoFee: React.FC<NoFeeProps> = ({ message }) => {
  return <h6>{message}</h6>;
};
