import React, {useMemo} from 'react';
import {Block} from 'baseui/block';
import {useNavigate, useParams} from 'react-router-dom';
import {Drawer} from 'baseui/drawer';

import {routes} from '../../constants';
import {useMoneyBundles, useMoneySummary} from '../../hooks/graphql';

import Details from './details';
import BackupButton from './backup-button';
import MoneyBundleTable from './table';
import SummaryCard from './summary-card';

const MoneyBundles = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const {moneyBundles, loading} = useMoneyBundles();
  const summaryResult = useMoneySummary();

  const selectedRow = useMemo(() => moneyBundles.find(b => b.id ===id), [id, moneyBundles]);

  const handleViewItem = row => {
    navigate(`${routes.capital}/${row.id}`);
  };

  return (
    <>
      <Block
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Block
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Block display="flex">
            <SummaryCard {...summaryResult} />
          </Block>

          <BackupButton />
        </Block>

        <MoneyBundleTable
          handleViewItem={handleViewItem}
          moneyBundles={moneyBundles}
          loading={loading}
        />

      </Block>

      <Drawer
        isOpen={Boolean(selectedRow)}
        onClose={() => navigate(routes.capital)}
      >
        {selectedRow && (
          <Details
            {...selectedRow}
            allList={moneyBundles}
          />
        )}
      </Drawer>
    </>
  );
};

export default MoneyBundles;
