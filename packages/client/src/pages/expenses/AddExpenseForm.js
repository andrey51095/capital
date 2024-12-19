import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {Select} from 'baseui/select';
import {Block} from 'baseui/block';

const AddExpenseForm = ({onAddExpense}) => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const input = {
      date,
      category: category[0]?.id || 'Other',
      amount: parseFloat(amount),
      description,
    };
    onAddExpense(input);
    setDate('');
    setCategory([]);
    setAmount('');
    setDescription('');
  };

  return (
    <Block
      display="flex"
      gridGap="scale600"
      marginBottom="scale600"
    >
      <Input
        value={date}
        onChange={e => setDate(e.target.value)}
        placeholder="Date (YYYY-MM-DD)"
        type="date"
      />
      <Select
        options={[
          {
            id: 'Groceries',
            label: 'Groceries',
          },
          {
            id: 'Clothing',
            label: 'Clothing',
          },
          {
            id: 'Transport',
            label: 'Transport',
          },
          {
            id: 'Entertainment',
            label: 'Entertainment',
          },
          {
            id: 'Bills',
            label: 'Bills',
          },
          {
            id: 'Other',
            label: 'Other',
          },
        ]}
        value={category}
        placeholder="Select Category"
        onChange={params => setCategory(params.value)}
      />
      <Input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount ($)"
        type="number"
      />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <Button onClick={handleAdd}>Add Expense</Button>
    </Block>
  );
};

export default AddExpenseForm;
