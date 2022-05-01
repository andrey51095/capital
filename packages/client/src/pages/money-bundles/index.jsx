import React from 'react'
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

  if (loading) {
    return 'Loading...'
  }

  return (
    <Block>
      <TableBuilder data={data?.moneyBundles} size={SIZE.compact}>
        <TableBuilderColumn header="Amount">
          {row => row.amount}
        </TableBuilderColumn>
        <TableBuilderColumn header="Currency" numeric>
          {row => row.currency}
        </TableBuilderColumn>
        <TableBuilderColumn header="Storage" numeric>
          {row => row.storage}
        </TableBuilderColumn>
        <TableBuilderColumn header="Created At" numeric>
          {(row) => format(row.createdAt, 'hh:mm aaa, dd MMM yyyy')}
        </TableBuilderColumn>
        <TableBuilderColumn header="Updated At" numeric>
          {(row) => (row.updatedAt && format(row.updatedAt, 'hh:mm aaa, dd MMM yyyy')) || '-'}
        </TableBuilderColumn>
      </TableBuilder>
    </Block>
  )
}

export default MoneyBundles
