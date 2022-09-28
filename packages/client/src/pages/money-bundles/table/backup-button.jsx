import React, {useRef} from 'react';
import {Button, SIZE, SHAPE} from 'baseui/button';
import {toaster} from 'baseui/toast';
import {useMutation} from 'react-apollo';

import {BACKUP_MUTATION} from '../../../gql';

export default function BackupButton() {
  const linkEl = useRef(null);
  const [mutate, {loading}] = useMutation(BACKUP_MUTATION, {
    onError: error => {
      toaster.negative(error.message);
    },
    onCompleted: async data => {
      const file = new File([data.backup], 'backup.json', {type: 'application/json'});

      linkEl.current.href = URL.createObjectURL(file);
      linkEl.current.download = 'backup.json';
      await linkEl.current.click();
      toaster.positive('Backup data successfully downloaded!');
    },
  });

  const handleOnClick = () => {
    mutate();
  };

  return (
    <div>
      <Button
        onClick={handleOnClick}
        isLoading={loading}
        size={SIZE.compact}
        shape={SHAPE.pill}
      >
        Download data
      </Button>
      <a ref={node => linkEl.current = node} />
    </div>
  );
}
