import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import {KIND as ButtonKind} from 'baseui/button';

const confirmMessage = 'Are you sure want to delete?';
const notAbleDeleteMessage = 'You can\'t delete a non-empty bundle';

const DeleteMoneyBundleModal = ({isOpen, onClose, onSubmit, isSubmitting, ...bundle}) => {
  const isDisabled = Boolean(bundle.amount);
  const handleConfirm = () => !isDisabled && onSubmit(bundle.id);

  const message = isDisabled ? notAbleDeleteMessage : confirmMessage;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeable
      animate
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={handleConfirm}
          isLoading={isSubmitting}
          disabled={isDisabled}
        >
          Confirm
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteMoneyBundleModal;
