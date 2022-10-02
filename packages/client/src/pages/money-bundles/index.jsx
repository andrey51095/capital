import React, {useState} from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {toaster} from 'baseui/toast';

import {useCreateMoneyBundle, useMoneyBundles, useMoneySummary, useUpdateMoneyBundle} from '../../hooks/graphql';

import MoneyBundleTable from './table';
import SummaryCard from './summary-card';
import ViewMoneyBundleModal from './view-money-bundle-modal';
import CreateMoneyBundleModal from './create-money-bundle-modal';
import EditDrawer from './edit-drawer';

const MoneyBundles = () => {
  const {moneyBundles, loading, refetch} = useMoneyBundles();
  const summaryResult = useMoneySummary();

  const [viewingBundle, setViewingBundle] = useState(null);
  const [editingBundle, setEditingBundle] = useState(null);
  const [creatingNewBundle, setCreatingNewBundle] = useState(false);

  const handleRefetch = () => {
    refetch();
    summaryResult.refetch();
  };

  const handleCloseCreateMoneyBundleModal = () =>
    setCreatingNewBundle(false);

  const handleOpenCreateMoneyBundleModal = () =>
    setCreatingNewBundle(true);

  const handleCloseEditing = () => {
    setEditingBundle(null);
  };

  const handleSetEditingBundle = data => {
    setEditingBundle(data);
  };

  const handleCloseViewing = () => {
    setViewingBundle(null);
  };

  const handleSetViewingBundle = data => {
    setViewingBundle(data);
  };

  const handleOnConfirmCreateMoneyBundle = () => {
    handleRefetch();
    handleCloseCreateMoneyBundleModal();
  };

  const handleOnConfirmUpdateMoneyBundle = () => {
    handleRefetch();
    handleCloseEditing();
  };

  const {createMoneyBundle} = useCreateMoneyBundle({
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Created new money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`);
      handleOnConfirmCreateMoneyBundle();
    },
  });

  const {updateMoneyBundle} = useUpdateMoneyBundle({
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Updated money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`);
      handleOnConfirmUpdateMoneyBundle();
    },
  });

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
          handleViewItem={handleSetViewingBundle}
          handleEditItem={handleSetEditingBundle}
          moneyBundles={moneyBundles}
          loading={loading}
        />

      </Block>

      {viewingBundle && (
        <ViewMoneyBundleModal
          {...viewingBundle}
          isOpen={Boolean(viewingBundle)}
          onClose={handleCloseViewing}
        />
      )}

      {editingBundle && (
        <EditDrawer
          {...editingBundle}
          allList={moneyBundles}
          isOpen={Boolean(editingBundle)}
          onSubmit={updateMoneyBundle}
          onClose={handleCloseEditing}
        />
      )}

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
