import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'baseui/modal';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

const FeedModal = ({isOpen, onClose, feed, loading, loadMore}) => (
  <Modal
    onClose={onClose}
    isOpen={isOpen}
    autoFocus={false}
    animate
  >
    <ModalHeader>Feed</ModalHeader>
    <ModalBody>
      {feed}
      {loading && (
        <Block
          marginTop="scale400"
          color="contentSecondary"
        >
          loading...
        </Block>
      )}
      <Block
        marginTop="scale400"
        display="flex"
        justifyContent="center"
      >
        <Button
          onClick={loadMore}
          isLoading={loading}
          disabled={loading}
        >
          Load more
        </Button>
      </Block>
    </ModalBody>
  </Modal>

);

export default FeedModal;
