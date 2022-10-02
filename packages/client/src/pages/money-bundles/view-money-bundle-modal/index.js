import React from 'react';
import {
  Modal,
  SIZE,
  ROLE,
} from 'baseui/modal';

import Header from './header';
import Body from './body';

const ViewMoneyBundleModal = ({isOpen, onClose, storage, amount, currency, ...bodyProps}) => {
  const headerProps = {
    storage,
    amount,
    currency,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeable
      animate
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <Header {...headerProps} />

      <Body {...bodyProps} />
    </Modal>
  );
};

export default ViewMoneyBundleModal;
