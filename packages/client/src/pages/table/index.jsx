import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Box, Button, Typography, Modal } from '@mui/material';

import { QUERY_MONEY_BUNDLES } from '../../gql';
import { modalStyles } from '../../styles';

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

const Table = () => {
  const [row, setRow] = useState(null)
  const { data, loading } = useQuery(QUERY_MONEY_BUNDLES);

  if (loading) {
    return 'Loading...'
  }

  const handleOnRowClick = ({ row }, muiEvent) => {
    setRow(row);
  }

  const handleCloseModal = () => {
    setRow(null);
  };

  return (
    <>
      <DataGrid
        rows={data?.moneyBundles}
        columns={columns}
        disableSelectionOnClick
        onRowClick={handleOnRowClick}
      />

       {row && (<Modal
        open={Boolean(row)}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {row.amount} {row.currency}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {row.storage}
          </Typography>
          {row.description && (<Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {row.description }
          </Typography>)}
        </Box>
      </Modal>)}
    </>
  )
}

export default Table
