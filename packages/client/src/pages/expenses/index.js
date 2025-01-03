import React, {useState, useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {GET_EXPENSES} from '../../gql/queries';
import {CREATE_EXPENSE, DELETE_EXPENSE} from '../../gql/mutations';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import {Block} from 'baseui/block';

const ExpensesPage = () => {
  const [filters, setFilters] = useState({});
  const [expenses, setExpenses] = useState([]);

  const {data, refetch} = useQuery(GET_EXPENSES, {variables: {filter: filters}});

  const [createExpense] = useMutation(CREATE_EXPENSE);
  const [deleteExpense] = useMutation(DELETE_EXPENSE);

  useEffect(() => {
    if (data) {
      setExpenses(data.getExpenses);
    }
  }, [data]);

  const handleAddExpense = async input => {
    await createExpense({variables: {input}});
    refetch();
  };

  const handleDeleteExpense = async id => {
    await deleteExpense({variables: {id}});
    refetch();
  };

  return (
    <Block
      padding="scale800"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <h1>Expense Manager</h1>

      <ExpenseFilter onFilterChange={setFilters} />
      <AddExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
      />
    </Block>
  );
};

export default ExpensesPage;
