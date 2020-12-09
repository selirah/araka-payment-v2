import React from 'react';

type Props = {
  title: string;
  disabled?: boolean;
  type: any;
  onContinueProcess(): void;
  addPrevious: boolean;
  onPreviousProcess(): void;
};

const Button: React.FC<Props> = ({
  title,
  disabled,
  type,
  onContinueProcess,
  addPrevious,
  onPreviousProcess,
}) => {
  return (
    <div className="row justify-content-center option-submit">
      {addPrevious ? (
        <button
          type={type}
          className="btn btn btn-outline-secondary button-previous"
          onClick={() => onPreviousProcess()}
        >
          Previous
        </button>
      ) : null}

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
