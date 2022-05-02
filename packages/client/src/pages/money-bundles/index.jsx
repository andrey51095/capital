import React, {useState, useMemo} from 'react'
import { useQuery } from 'react-apollo'
import { format } from 'date-fns';
import {
  TableBuilder,
  TableBuilderColumn,
  SIZE,
} from 'baseui/table-semantic';
import { Block } from 'baseui/block';

import { QUERY_MONEY_BUNDLES } from '../../gql';

const MoneyBundles = () => {
  const { data, loading } = useQuery(QUERY_MONEY_BUNDLES);
  const [sortColumn, setSortColumn] = useState('currency');
  const [sortAsc, setSortAsc] = useState(true);

  //https://baseweb.design/components/table-semantic/#table-builder-with-sorting
  const sortedData = useMemo(() => {
    return (data?.moneyBundles || []).slice().sort((a, b) => {
      const left = sortAsc ? a : b;
      const right = sortAsc ? b : a;
      const leftValue = String(left[sortColumn]);
      const rightValue = String(right[sortColumn]);
      return leftValue.localeCompare(rightValue, 'en', {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }, [sortColumn, sortAsc, data]);

  const handleSort = (id) => {
    console.log({id})
    if (id === sortColumn) {
      setSortAsc(asc => !asc);
    } else {
      setSortColumn(id);
      setSortAsc(true);
    }
  }

  if (loading) {
    return 'Loading...'
  }

  return (
    <Block>
      <TableBuilder
        data={sortedData}
        size={SIZE.compact}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? 'ASC' : 'DESC'}
        onSort={handleSort}
      >
        <TableBuilderColumn header="Amount" id="amount" numeric sortable>
          {row => row.amount}
        </TableBuilderColumn>
        <TableBuilderColumn header="Currency" id="currency" sortable>
          {row => row.currency}
        </TableBuilderColumn>
        <TableBuilderColumn header="Storage">
          {row => row.storage}
        </TableBuilderColumn>
        <TableBuilderColumn header="Created At" id="createdAt" sortable>
          {(row) => format(row.createdAt, 'hh:mm aaa, dd MMM yyyy')}
        </TableBuilderColumn>
        <TableBuilderColumn header="Updated At"  id="updatedAt" sortable>
          {(row) => (row.updatedAt && format(row.updatedAt, 'hh:mm aaa, dd MMM yyyy')) || '-'}
        </TableBuilderColumn>
      </TableBuilder>
    </Block>
  )
}

export default MoneyBundles
