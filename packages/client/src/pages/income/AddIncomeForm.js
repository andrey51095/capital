import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {Select} from 'baseui/select';
import {Block} from 'baseui/block';

const categories = [
  {
    label: 'Salary',
    id: 'Salary',
  },
  {
    label: 'Bonus',
    id: 'Bonus',
  },
  {
    label: 'Investment',
    id: 'Investment',
  },
  {
    label: 'Freelance',
    id: 'Freelance',
  },
  {
    label: 'Other',
    id: 'Other',
  },
];

const AddIncomeForm = ({onAdd}) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onAdd({
      date,
      amount: parseFloat(amount),
      category: category[0]?.id,
      description,
    });
    setDate('');
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <Block
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr 1fr 0.5fr"
      gridColumnGap="10px"
      padding="10px"
    >
      <Input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        placeholder="Date"
      />
      <Input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount ($)"
      />
      <Select
        options={categories}
        value={category}
        onChange={params => setCategory(params.value)}
        placeholder="Category"
      />
      <Input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <Button onClick={handleSubmit}>Add Income</Button>
    </Block>
  );
};

export default AddIncomeForm;
