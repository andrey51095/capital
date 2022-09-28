import React from 'react';
import {Formik} from 'formik';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'baseui/modal';

import {validationSchema} from './validation';
import MoneyBundleForm from './form';
import {initialForm} from './constants';

const CreateMoneyBundleModal = ({isOpen, onClose, onSubmit}) => {
  const handleOnSubmit = async (values, actions) => {
    await onSubmit(values);
    actions.setSubmitting(false);
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      autoFocus={false}
      animate
    >
      <ModalHeader> Create Money Bundle</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialForm}
          onSubmit={handleOnSubmit}
          validationSchema={validationSchema}
        >
          {MoneyBundleForm}
        </Formik>
      </ModalBody>
    </Modal>

  );
};

export default CreateMoneyBundleModal;
