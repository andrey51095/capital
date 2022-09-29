import React from 'react';
import {Drawer} from 'baseui/drawer';

import EditMode from './edit-mode';

const EditDrawer = ({isOpen, onClose, ...restProps}) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
  >
    <EditMode
      {...restProps}
    />
  </Drawer>
);

export default EditDrawer;
