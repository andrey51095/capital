import React from 'react';
import {Block} from 'baseui/block';

import {FeedItem} from './FeedItem';

const JsonRender = ({title, json}) => {
  if (!json) {
    return null;
  }

  let parsedData;
  try {
    parsedData = JSON.parse(json);
  } catch (e) {
    console.error('Invalid JSON:', json);
    return null;
  }

  return (
    <Block
      display="flex"
      gridColumnGap="scale200"
      marginBottom="scale200"
    >
      <Block
        width="scale1200"
        fontWeight="bold"
        color="contentPrimary"
      >
        {title}
        :
      </Block>
      <Block>
        <FeedItem {...parsedData} />
      </Block>
    </Block>
  );
};

const Feed = ({createdAt, to, from}) => {
  const isEdited = from && to;

  return (
    <Block
      padding="scale300"
      marginBottom="scale400"
      backgroundColor="mono200"
      borderRadius="scale300"
    >
      <Block
        display="flex"
        justifyContent="space-between"
        marginBottom="scale200"
      >
        <Block
          fontWeight="bold"
          fontSize="14px"
        >
          {isEdited ? 'Updated' : 'Created'}
        </Block>
        <Block
          fontSize="12px"
          color="contentSecondary"
        >
          {new Date(createdAt * 1000).toLocaleString()}
        </Block>
      </Block>

      {isEdited ? (
        <>
          <JsonRender
            title="Old"
            json={from}
          />
          <JsonRender
            title="New"
            json={to}
          />
        </>
      ) : (
        <JsonRender
          title="New"
          json={to}
        />
      )}
    </Block>
  );
};

export default Feed;
