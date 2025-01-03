import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {Select} from 'baseui/select';

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

const IncomeFilter = ({onFilter}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilter = () => {
    onFilter({
      fromDate,
      toDate,
      categories: selectedCategories.map(c => c.id),
    });
  };

  return (
    <Block
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr 0.5fr"
      gridColumnGap="10px"
      padding="10px"
    >
      <Input
        type="date"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
        placeholder="From Date"
      />
      <Input
        type="date"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
        placeholder="To Date"
      />
      <Select
        options={categories}
        value={selectedCategories}
        onChange={params => setSelectedCategories(params.value)}
        placeholder="Select Categories"
        multi
      />
      <Button onClick={handleFilter}>Apply Filters</Button>
    </Block>
  );
};

export default IncomeFilter;
