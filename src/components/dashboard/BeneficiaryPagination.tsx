import React, { useState } from 'react';
import { Beneficiary } from '../../interfaces';

interface BeneficiaryPaginationProps {
  beneficiaries: Beneficiary[];
  initialPage: number;
  perPage: number;
}

export const BeneficiaryPagination: React.FC<BeneficiaryPaginationProps> = ({
  beneficiaries,
  initialPage,
  perPage,
}) => {
  const total = beneficiaries.length;
  const pageCount = Math.ceil(total / perPage);

  const onHandlePageClick = (data: any): void => {};

  return <h1>Hey</h1>;
};
