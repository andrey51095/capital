import React from 'react';
import {useStyletron} from 'baseui';
import {Block} from 'baseui/block';

export const FeedItem = ({currency, amount, description, storage, createdAt}) => {
  const [css] = useStyletron();
  return (
    <Block
      overrides={{
        Root: {
          style: {
            marginBottom: '12px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          },
        },
      }}
    >
      <Block
        display="flex"
        justifyContent="space-between"
        marginBottom="8px"
      >
        <span
          className={css({
            fontWeight: 'bold',
            color: '#3498db',
            fontSize: '14px',
          })}
        >
          {currency}
        </span>
        <span
          className={css({
            fontWeight: 'bold',
            color: '#27ae60',
            fontSize: '14px',
          })}
        >
          {amount}
        </span>
      </Block>

      {description && (
        <Block
          marginBottom="8px"
          color="contentSecondary"
          fontSize="12px"
        >
          {description}
        </Block>
      )}

      <Block
        display="flex"
        justifyContent="space-between"
        fontSize="11px"
        color="mono700"
      >
        <span>{storage || 'None'}</span>
        <span>{new Date(createdAt * 1000).toLocaleString()}</span>
      </Block>
    </Block>
  );
};

