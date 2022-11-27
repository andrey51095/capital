import React from 'react';
import {Block} from 'baseui/block';

const skip = ['id', '_id'];

const JsonRender = ({title, json}) => {
  if (!json) {
    return null;
  }

  const obj = JSON.parse(json);
  return (
    <Block
      display="flex"
      gridColumnGap="scale200"
    >
      <Block width="scale1000">{title}</Block>
      <Block>
        {Object.keys(obj).map(key => (
          !!obj[key] && !skip.includes(key) && (
            <div key={key}>
              <span>
                {key}
              </span>
              {' '}
              -
              {' '}
              <span>{obj[key]}</span>
            </div>
          )
        ))}
      </Block>
    </Block>
  );
};

const Feed = ({createdAt, to, from}) => (
  <Block padding="scale300">
    <Block
      display="flex"
      justifyContent="center"
    >
      createdAt:
      {' '}
      {createdAt}
    </Block>

    <JsonRender
      json={from}
      title="from"
    />

    <JsonRender
      json={to}
      title="to"
    />

    {/* <JsonRender Array of obj
      json={transferredTo}
      title="transferredTo"
    /> */}

  </Block>
);

export default Feed;
