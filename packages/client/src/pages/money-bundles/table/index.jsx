import React, {useMemo} from 'react';
import {StatefulDataTable} from 'baseui/data-table';
import {Block} from 'baseui/block';

import {Eye, Pencil, Trash} from '../../../icons';

import BackupButton from './backup-button';
import columns from './columns';

const MoneyBundleTable = ({moneyBundles, handleView, handleDelete, loading, handleEdit}) => {

  const tableData = useMemo(() => (moneyBundles || []).map(data => ({
    id: data.id,
    data,
  })), [moneyBundles]);

  const rowActions = [
    {
      label: 'View',
      onClick: ({row}) => handleView(row.data),
      renderIcon: ({size}) => <Eye size={size} />,
    }, {
      label: 'Edit',
      onClick: ({row}) => handleEdit(row.data),
      renderIcon: ({size}) => <Pencil size={size} />,
    }, {
      label: 'Delete',
      onClick: ({row}) => handleDelete(row.data),
      renderIcon: ({size}) => <Trash size={size} />,
    },
  ];

  return (
    <Block
      position="relative"
      height="100%"
    >
      <Block
        position="absolute"
        right="4px"
        top="12px"
      >
        <BackupButton />
      </Block>

      <StatefulDataTable
        rowActions={rowActions}
        loading={loading}
        columns={columns}
        rows={tableData}
      />
    </Block>
  );
};
export default MoneyBundleTable;
