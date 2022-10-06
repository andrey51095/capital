import React, {useState, useCallback} from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

const inputOverrides = {
  Root: {style: {paddingRight: 0}},
  EndEnhancer: {
    style: {
      maxWidth: '320px',
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
};

const AmountInput = ({error, ...props}) => {
  const {name, value, onChange} = props;
  const [showConcat, setShowConcat] = useState(false);
  const [valueToConcat, setValueToConcat] = useState(0);

  const handleShowConcat = () => setShowConcat(true);
  const handleConcatChange = e => setValueToConcat(+e.target.value);
  const handleConcatClick = useCallback(() => {
    onChange({
      target: {
        name: name,
        value: value + valueToConcat,
      },
    });
    setValueToConcat(0);
    setShowConcat(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, value, valueToConcat]);

  const endEnhancer = useCallback(() => {
    if (!showConcat) {
      return <Button onClick={handleShowConcat}>Add</Button>;
    }

    return (
      <Block display="flex">
        <Block
          width="2px"
          height="inherit"
          backgroundColor="gray"
          margin="scale100"
        />
        <Input
          value={valueToConcat}
          type="number"
          onChange={handleConcatChange}
          min="0"
        />
        <Button onClick={handleConcatClick}>Add</Button>
      </Block>
    );
  }, [handleConcatClick, showConcat, valueToConcat]);

  return (
    <FormControl
      label={() => 'Amount *'}
      error={error}
    >
      <Input
        {...props}
        type="number"
        min="0"
        overrides={inputOverrides}
        endEnhancer={endEnhancer}
      />
    </FormControl>
  );
};

export default AmountInput;
