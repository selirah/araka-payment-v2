import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import {
  resetTransaction,
  setRepeatTransaction,
  flushCategories,
  fetchCategories,
} from '../../store/payment';

const Reset: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const resetTrans = (): void => {
    dispatch(resetTransaction());
    dispatch(setRepeatTransaction(false));
    dispatch(flushCategories());
    dispatch(fetchCategories());
  };

  return (
    <div className="reset-footer">
      <button className="btn" onClick={() => resetTrans()}>
        <i className="fa fa-undo"></i> Reset
      </button>
    </div>
  );
};

export { Reset };
