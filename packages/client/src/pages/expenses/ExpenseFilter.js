import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {Block} from 'baseui/block';

const ExpenseFilter = ({onFilterChange}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      startDate: startDate || null,
      endDate: endDate || null,
      categories: categories ? categories.split(',').map(cat => cat.trim()) : null,
    };
    onFilterChange(filters);
  };

  return (
    <Block
      display="flex"
      gridGap="scale600"
      marginBottom="scale600"
    >
      <Input
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        placeholder="Start Date (YYYY-MM-DD)"
        type="date"
      />
      <Input
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        placeholder="End Date (YYYY-MM-DD)"
        type="date"
      />
      <Input
        value={categories}
        onChange={e => setCategories(e.target.value)}
        placeholder="Categories (comma-separated)"
      />
      <Button onClick={handleApplyFilters}>Apply Filters</Button>
    </Block>
  );
};

export default ExpenseFilter;
