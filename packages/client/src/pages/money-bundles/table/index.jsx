import React, {useMemo} from 'react';
import {Show} from 'baseui/icon';
import {StatefulDataTable} from 'baseui/data-table';

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
    <StatefulDataTable
      rowActions={rowActions}
      loading={loading}
      columns={columns}
      rows={tableData}
    />
  );
};
export default MoneyBundleTable;
