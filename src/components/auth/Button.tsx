import React from 'react';
import { SubmitButton, SmallIcon } from './Styles';

type Props = {
  type: any;
  title: string;
  isSubmitting: boolean;
  processTitle: string;
  classname?: string;
};

const Button: React.FC<Props> = ({
  type,
  title,
  isSubmitting,
  processTitle,
  classname,
}) => {
  return (
    <React.Fragment>
      <SubmitButton
        className={`text-left row mt-4 justify-content-center ${classname}`}
      >
        <button type={type} className="btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <React.Fragment>
              <span>{processTitle}</span>
              <SmallIcon className="fa fa-spinner fa-spin fa-3x fa-fw"></SmallIcon>
              <span className="sr-only">Loading...</span>
            </React.Fragment>
          ) : (
            <span>{title}</span>
          )}
        </button>
      </SubmitButton>
    </React.Fragment>
  );
};

export { Button };
