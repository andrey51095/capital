import React from 'react';
import {ModalBody} from 'baseui/modal';
import {Block} from 'baseui/block';
import {LabelSmall} from 'baseui/typography';
import {format} from 'date-fns';

const TextWithTitle = ({text, title}) => (
  <Block margin="scale300">
    <LabelSmall>
      {title}
    </LabelSmall>
    <Block>
      {text}
    </Block>
  </Block>
);

const Body = ({type, description, createdAt, updatedAt}) => (
  <ModalBody>
    <Block
      display="grid"
      gridTemplateColumns="1fr 1fr"
      margin="scale200"
      marginTop="scale600"
    >
      <TextWithTitle
        text={type}
        title="Type"
      />

      {Boolean(description) && (
        <TextWithTitle
          text={description}
          title="Description"
        />
      )}

      <TextWithTitle
        text={format(createdAt, 'dd MMM yyyy')}
        title="Created at"
      />

      {Boolean(updatedAt) && (
        <TextWithTitle
          text={format(updatedAt, 'dd MMM yyyy')}
          title="Updated at"
        />
      )}
    </Block>
  </ModalBody>
);

export default Body;
