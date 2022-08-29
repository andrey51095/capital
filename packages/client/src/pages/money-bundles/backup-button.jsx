import React, {useRef} from 'react';
import {Button} from 'baseui/button';
import {toaster} from 'baseui/toast';
import {useMutation} from 'react-apollo';

import {BACKUP_MUTATION} from '../../gql';

export default function BackupButton() {
  const linkEl = useRef(null);
  const [mutate, {loading}] = useMutation(BACKUP_MUTATION, {
    onError: error => {
      toaster.negative(error.message);
    },
    onCompleted: data => {
      const file = new File([data.backup], 'backup.json', {type: 'application/json'});

      linkEl.current.href = URL.createObjectURL(file);
      linkEl.current.download = 'backup.json';
      linkEl.current.click();
    },
  });

  const handleOnClick = () => {
    mutate();
  };

  return (
    <>
      <Button
        onClick={handleOnClick}
        isLoading={loading}
      >
        Download data
      </Button>
      <a ref={node => linkEl.current = node} />
    </>
  );
}
