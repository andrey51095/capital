import React from 'react';
import {Drawer} from 'baseui/drawer';

import EditForm from './edit-form';

const EditDrawer = ({isOpen, onClose, ...restProps}) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
  >
    <EditForm {...restProps} />
  </Drawer>
);

export default EditDrawer;
