import React from 'react';
import {ModalHeader} from 'baseui/modal';
import {ParagraphMedium} from 'baseui/typography';
import {Block} from 'baseui/block';

import Currency from '../../../components/currency';

const Header = ({storage, amount, currency}) => (
  <ModalHeader>
    <Block
      display="flex"
      alignItems="end"
    >
      {storage}

      <ParagraphMedium display="flex">
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
      </ParagraphMedium>
    </Block>
  </ModalHeader>
);
export default Header;
