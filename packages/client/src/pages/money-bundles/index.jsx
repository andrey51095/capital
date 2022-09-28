import React, {useMemo, useState} from 'react';
import {Block} from 'baseui/block';
import {useNavigate, useParams} from 'react-router-dom';
import {Drawer} from 'baseui/drawer';
import {Button} from 'baseui/button';
import {toaster} from 'baseui/toast';

import {routes} from '../../constants';
import {useCreateMoneyBundle, useMoneyBundles, useMoneySummary} from '../../hooks/graphql';

import Details from './details';
import MoneyBundleTable from './table';
import SummaryCard from './summary-card';
import CreateMoneyBundleModal from './create-money-bundle-modal';

const MoneyBundles = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const {moneyBundles, loading, refetch} = useMoneyBundles();
  const summaryResult = useMoneySummary();

  const [creatingNewBundle, setCreatingNewBundle] = useState(false);

  const handleRefetch = () => {
    refetch();
    summaryResult.refetch();
  };

  const handleCloseCreateMoneyBundleModal = () =>
    setCreatingNewBundle(false);

  const handleOpenCreateMoneyBundleModal = () =>
    setCreatingNewBundle(true);

  const handleOnConfirmCreateMoneyBundle = () => {
    handleRefetch();
    handleCloseCreateMoneyBundleModal();
  };

  const {createMoneyBundle} = useCreateMoneyBundle({
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Created new money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`);
      handleOnConfirmCreateMoneyBundle();
    },
  });

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

          <Button
            onClick={handleOpenCreateMoneyBundleModal}
          >
            Create Money Bundle
          </Button>
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
            refetch={handleRefetch}
          />
        )}
      </Drawer>

      {creatingNewBundle && (
        <CreateMoneyBundleModal
          isOpen={creatingNewBundle}
          onSubmit={createMoneyBundle}
          onClose={handleCloseCreateMoneyBundleModal}
        />
      )}
    </>
  );
};

export default MoneyBundles;
