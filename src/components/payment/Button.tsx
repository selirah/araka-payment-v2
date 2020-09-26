import React from 'react';

type Props = {
  title: string;
  disabled?: boolean;
  type: any;
  onContinueProcess(): void;
};

const Button: React.FC<Props> = ({
  title,
  disabled,
  type,
  onContinueProcess,
}) => {
  return (
    <div className="row justify-content-center option-submit">
      <button
        type={type}
        className="btn option-submit-button"
        disabled={disabled}
        onClick={() => onContinueProcess()}
      >
        {title}
      </button>
    </div>
  );
};

export { Button };
