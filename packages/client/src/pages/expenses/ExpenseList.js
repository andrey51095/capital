import React from 'react';
import {Table} from 'baseui/table';
import {Button} from 'baseui/button';

const ExpenseList = ({expenses, onDeleteExpense}) => {
  const rows = expenses.map((expense, i) => [
    expense.date,
    expense.category,
    `$${expense.amount.toFixed(2)}`,
    expense.description || '-',
    <Button
      key={i}
      size="mini"
      onClick={() => onDeleteExpense(expense.id)}
    >
      Delete
    </Button>,
  ]);

  return (
    <Table
      columns={[
        'Date',
        'Category',
        'Amount',
        'Description',
        'Actions',
      ]}
      data={rows}
    />
  );
};

export default ExpenseList;
