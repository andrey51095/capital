import React from 'react';
import {Table} from 'baseui/table';

const IncomeList = ({incomes}) => {
  const data = incomes.map(income => [
    income.date,
    income.amount.toFixed(2),
    income.category,
    income.description,
  ]);

  return (
    <Table
      columns={[
        'Date',
        'Amount ($)',
        'Category',
        'Description',
      ]}
      data={data}
    />
  );
};

export default IncomeList;
