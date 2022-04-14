import React from 'react'
import { useQuery } from 'react-apollo'
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

import {QUERY_MONEY_BUNDLES } from '../../gql';

const columns = [
  { field: 'amount', headerName: 'Amount' },
  {
    field: 'currency',
    headerName: 'Currency',
  },
  {
    field: 'storage',
    width: 300,
    headerName: 'Storage',
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    valueGetter: (params) => format (params.row.createdAt, 'hh:mm aaa, dd MMM yyyy'),
  },
];

const Main = () => {
  const { data, loading } = useQuery(QUERY_MONEY_BUNDLES);

  console.log(data)
  if (loading) {
    return 'Loading...'
  }

  return <><DataGrid rows={data?.moneyBundles} columns={columns}/></>
}

export default Main