import React, {useMemo} from 'react';
import {Show} from 'baseui/icon';
import {StatefulDataTable} from 'baseui/data-table';
import {Block} from 'baseui/block';

import {Pencil} from '../../../icons';

import BackupButton from './backup-button';
import columns from './columns';

const MoneyBundleTable = ({moneyBundles, handleViewItem, loading, handleEditItem}) => {

  const tableData = useMemo(() => (moneyBundles || []).map(data => ({
    id: data.id,
    data,
  })), [moneyBundles]);

  const rowActions = [
    {
      label: 'View',
      onClick: ({row}) => handleViewItem(row),
      renderIcon: ({size}) => <Show size={size} />,
    }, {
      label: 'Edit',
      onClick: ({row}) => handleEditItem(row.data),
      renderIcon: ({size}) => <Pencil size={size} />,
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
