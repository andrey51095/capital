import React from 'react';
import {Block} from 'baseui/block';
import {HeadingXSmall} from 'baseui/typography';
import {format} from 'date-fns';

import Currency from '../../components/currency';

const TextWithTitle = ({text, title}) => (
  <Block margin="scale300">
    <Block color="primary500">
      {title}
    </Block>
    <Block>
      {text}
    </Block>
  </Block>
);

const ViewMode = ({currency, amount, type, storage, description, createdAt, updatedAt}) => (
  <div>
    <Block
      display="flex"
      alignItems="end"
    >
      <HeadingXSmall>
        {storage}
      </HeadingXSmall>

      <Block
        marginLeft="scale200"
        marginRight="scale50"
      >
        {amount}
      </Block>

      <Block display="flex">
        (
        <Currency value={currency} />
        )
      </Block>
    </Block>

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
  </div>
);

export default ViewMode;
