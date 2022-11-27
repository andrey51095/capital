import React from 'react';

import {useFeed} from '../../../hooks/graphql';

import FeedModal from './feed-modal';
import Feed from './feed';

const FeedModalContainer = ({isOpen, onClose}) => {
  const {feed} = useFeed();

  return (
    <FeedModal
      isOpen={isOpen}
      onClose={onClose}
      feed={feed?.map(Feed)}
    />
  );
};

export default FeedModalContainer;
