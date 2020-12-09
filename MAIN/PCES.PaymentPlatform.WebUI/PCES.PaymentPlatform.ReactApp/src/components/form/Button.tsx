import React from 'react';

interface ButtonProps {
  title: string;
  className: string;
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, className, loading }) => {
  return (
    <React.Fragment>
      <button
        type="submit"
        className="btn-submit btn-success-submit"
        disabled={loading}
      >
        {title}
      </button>
    </React.Fragment>
  );
};

export { Button };
