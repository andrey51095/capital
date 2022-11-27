import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'baseui/modal';

const FeedModal = ({isOpen, onClose, feed}) => (
  <Modal
    onClose={onClose}
    isOpen={isOpen}
    autoFocus={false}
    animate
  >
    <ModalHeader>Feed</ModalHeader>
    <ModalBody>
      {feed}
    </ModalBody>
  </Modal>

);

export default FeedModal;
