import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {Block} from 'baseui/block';

import IncomeFilter from './IncomeFilter';
import IncomeList from './IncomeList';
import AddIncomeForm from './AddIncomeForm';
import {GET_INCOMES, ADD_INCOME, DELETE_INCOME} from '../../gql';

const IncomePage = () => {
  const [filter, setFilter] = useState({});
  const {data, refetch} = useQuery(GET_INCOMES, {variables: {filter}});

  const [addIncome] = useMutation(ADD_INCOME, {onCompleted: () => refetch()});

  const [deleteIncome] = useMutation(DELETE_INCOME, {onCompleted: () => refetch()});

  const handleAdd = input => {
    addIncome({variables: {input}});
  };

  return (
    <Block
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <h1>Income Management</h1>
      <IncomeFilter onFilter={setFilter} />
      <AddIncomeForm onAdd={handleAdd} />
      <IncomeList
        incomes={data?.getIncomes || []}
        onDelete={id => deleteIncome({variables: {id}})}
      />
    </Block>
  );
};

export default IncomePage;
