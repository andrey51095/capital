import React, {useMemo} from 'react';
import {Show} from 'baseui/icon';
import {StatefulDataTable} from 'baseui/data-table';
import {Block} from 'baseui/block';

import BackupButton from './backup-button';
import columns from './columns';

const MoneyBundleTable = ({moneyBundles, handleViewItem, loading}) => {

  const tableData = useMemo(() => (moneyBundles || []).map(data => ({
    id: data.id,
    data,
  })), [moneyBundles]);

  const rowActions = [
    {
      label: 'Check',
      onClick: ({row}) => handleViewItem(row),
      renderIcon: ({size}) => <Show size={size} />,
    },
  ];

  return (
    <>
      <Block
        display="flex"
        justifyContent="end"
        marginBottom="-50px"
        marginTop="20px"
      >
        <BackupButton />
      </Block>

      <StatefulDataTable
        rowActions={rowActions}
        loading={loading}
        columns={columns}
        rows={tableData}
      />
    </>
  );
};
export default MoneyBundleTable;
