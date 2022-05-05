import React, { useState } from 'react'
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import {ButtonGroup, MODE, SIZE, SHAPE} from 'baseui/button-group';

import EditMode from './edit-mode';
import ViewMode from './view-mode';

const modes = { view: 0, edit: 1 };

const Details = (props) => {
  const [mode, setMode] = useState(modes.view);

  return (
    <Block>
      <ButtonGroup
        mode={MODE.radio}
        selected={mode}
        onClick={(event, index) => setMode(index)}
        size={SIZE.mini}
        shape={SHAPE.pill}
      >
        <Button>View</Button>
        <Button>Edit</Button>
      </ButtonGroup>

      <Block paddingTop="scale500">
        {mode === modes.view && (<ViewMode {...props}/>)}
        {mode === modes.edit && (<EditMode {...props} onSuccess={() => setMode(modes.view)}/>)}
      </Block>
    </Block>
  )
}
export default Details;
