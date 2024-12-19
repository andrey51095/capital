import React from 'react';

import {useFeed} from '../../../hooks/graphql';

import FeedModal from './feed-modal';
import Feed from './feed';

const FeedModalContainer = ({isOpen, onClose}) => {
  const {feed, loading, loadMore} = useFeed();

  return (
    <FeedModal
      isOpen={isOpen}
      onClose={onClose}
      feed={feed?.map(f => (
        <Feed
          key={f.id}
          {...f}
        />
      ))}
      loading={loading}
      loadMore={loadMore}
    />
  );
};

export default FeedModalContainer;
