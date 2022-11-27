import React, {useState} from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {toaster} from 'baseui/toast';

import {
  useCreateMoneyBundle,
  useDeleteMoneyBundle,
  useMoneyBundles,
  useMoneySummary,
  useUpdateMoneyBundle,
} from '../../hooks/graphql';

import MoneyBundleTable from './table';
import SummaryCard from './summary-card';
import ViewMoneyBundleModal from './view-money-bundle-modal';
import CreateMoneyBundleModal from './create-money-bundle-modal';
import EditDrawer from './edit-money-bundle-drawer';
import DeleteMoneyBundleModal from './delete-money-bundle-modal';
import FeedModalContainer from './feed-modal';

const MoneyBundles = () => {
  const {moneyBundles, loading, refetch} = useMoneyBundles();
  const summaryResult = useMoneySummary();

  const [viewingBundle, setViewingBundle] = useState(null);
  const [editingBundle, setEditingBundle] = useState(null);
  const [deletingBundle, setDeletingBundle] = useState(null);
  const [creatingBundle, setCreatingBundle] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);

  const handleRefetch = () => {
    refetch();
    summaryResult.refetch();
  };

  const handleCloseFeed = () => setOpenFeed(false);
  const handleOpenFeed = () => setOpenFeed(true);

  const handleCloseCreating = () => setCreatingBundle(false);
  const handleOpenCreating = () => setCreatingBundle(true);

  const handleCloseEditing = () => setEditingBundle(null);
  const handleOpenEditing = data => setEditingBundle(data);

  const handleCloseViewing = () => setViewingBundle(null);
  const handleOpenViewing = data => setViewingBundle(data);

  const handleCloseDeleting = () => setDeletingBundle(null);
  const handleOpenDeleing = data => setDeletingBundle(data);

  const handleOnConfirmCreate = () => {
    handleRefetch();
    handleCloseCreating();
  };

  const handleOnConfirmUpdate = () => {
    handleRefetch();
    handleCloseEditing();
  };

  const handleOnConfirmDelete = () => {
    handleRefetch();
    handleCloseDeleting();
  };

  const {createMoneyBundle} = useCreateMoneyBundle({
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Created new money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`);
      handleOnConfirmCreate();
    },
  });

  const {updateMoneyBundle} = useUpdateMoneyBundle({
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Updated money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`);
      handleOnConfirmUpdate();
    },
  });

  const {deleteMoneyBundle, loading: isDeletingLoading} = useDeleteMoneyBundle({
    onCompleted: () => {
      toaster.positive('Successfully Deleted!');
      handleOnConfirmDelete();
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

          <ButtonGroup>
            <Button onClick={handleOpenCreating}>
              Create Money Bundle
            </Button>
            <Button onClick={handleOpenFeed}>
              Open Feed
            </Button>
          </ButtonGroup>
        </Block>

        <MoneyBundleTable
          handleView={handleOpenViewing}
          handleEdit={handleOpenEditing}
          handleDelete={handleOpenDeleing}
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

      {creatingBundle && (
        <CreateMoneyBundleModal
          isOpen={creatingBundle}
          onSubmit={createMoneyBundle}
          onClose={handleCloseCreating}
        />
      )}

      {deletingBundle && (
        <DeleteMoneyBundleModal
          {...deletingBundle}
          isOpen={Boolean(deletingBundle)}
          onSubmit={deleteMoneyBundle}
          isSubmitting={isDeletingLoading}
          onClose={handleCloseDeleting}
        />
      )}

      {openFeed && (
        <FeedModalContainer
          isOpen={openFeed}
          onClose={handleCloseFeed}
        />
      )}
    </>
  );
};

export default MoneyBundles;
