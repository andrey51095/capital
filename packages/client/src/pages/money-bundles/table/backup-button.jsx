import React, {useRef, useState} from 'react';
import {Button, SIZE, SHAPE} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from 'baseui/modal';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {toaster} from 'baseui/toast';
import {useMutation} from 'react-apollo';

import {BACKUP_MUTATION} from '../../../gql';

const postfix = '.json';

export default function BackupButton() {
  const linkEl = useRef(null);
  const [backupName, setBackupName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [mutate, {loading}] = useMutation(BACKUP_MUTATION, {
    onError: error => {
      toaster.negative(error.message);
    },
    onCompleted: async data => {
      const backup = backupName + postfix;
      const file = new File([data.backup], backup, {type: 'application/json'});

      linkEl.current.href = URL.createObjectURL(file);
      linkEl.current.download = backup;
      await linkEl.current.click();
      toaster.positive('Backup data successfully downloaded!');
      handleClose();
    },
  });

  const handleOnClick = e => {
    e.preventDefault();
    if (!backupName) {
      setError('Please provide a name');
    } else {
      mutate();
    }
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChangeBackupName = e => {
    if (error) {
      setError('');
    }
    setBackupName(e.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        isLoading={loading}
        size={SIZE.compact}
        shape={SHAPE.pill}
      >
        Backup Data
      </Button>
      <a ref={node => linkEl.current = node} />
      <Modal
        onClose={handleClose}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Backup Data</ModalHeader>
        <form onSubmit={handleOnClick}>
          <ModalBody>
            <FormControl
              error={error}
              label="Please enter a name of the file"
            >
              <Input
                value={backupName}
                onChange={handleChangeBackupName}
                size={SIZE.compact}
                endEnhancer={() => postfix}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ModalButton type="submit" >
              Download
            </ModalButton>
          </ModalFooter>
        </form>
      </Modal>

    </div>
  );
}
