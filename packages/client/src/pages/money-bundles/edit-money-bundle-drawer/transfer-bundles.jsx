import React from 'react';
import {Block} from 'baseui/block';
import {FieldArray} from 'formik';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Select} from 'baseui/select';
import {Button, KIND, SHAPE, SIZE} from 'baseui/button';
import {Card} from 'baseui/card';
import {get} from 'lodash';

import {Plus, XMark} from '../../../icons';
import {formKeys, getTransferIndex} from '../constants';

const getLabel = ({option}) => `${option.amount}(${option.currency}) - ${option.storage}`;

const TransferBundles = ({values, getError, optionsTransferTo, getCommonProps}) => (
  <FieldArray name={formKeys.transfer}>
    {arrayHelpers => (
      <Block
        margin="scale500"
        display="flex"
        flexDirection="column"
        gridRowGap="scale500"
      >
        {values.transfer?.map((t, i) => {
          const handleRemoveBundle = () => {
            arrayHelpers.remove(i);
          };

          const handleTransferToChange = params => {
            if (params.type === 'select') {
              handleRemoveBundle();
              arrayHelpers.push({
                ...params.option,
                amount: 0,
              });
            }
            if (params.type === 'clear') {
              handleRemoveBundle();
              arrayHelpers.push({
                currency: values.currency,
                storage: values.storage,
                amount: 0,
                description: '',
              });
            }
          };
          return (
            <Card
              key={i}
              overrides={{Root: {style: {position: 'relative'}}}}
            >
              <FormControl
                label={() => 'To'}
                caption={() => 'Leave empty for new bundle'}
                error={getError(getTransferIndex(i, formKeys.id))}
              >
                <Select
                  value={get(values, getTransferIndex(i, formKeys.id)) && [{id: get(values, getTransferIndex(i, formKeys.id))}]}
                  options={optionsTransferTo}
                  getOptionLabel={getLabel}
                  getValueLabel={getLabel}
                  onChange={handleTransferToChange}
                />
              </FormControl>

              <Block
                display="flex"
                gridColumnGap="scale400"
              >
                <Block>
                  <FormControl
                    label={() => 'Amount to transfer *'}
                    error={getError(getTransferIndex(i, formKeys.amount))}
                  >
                    <Input
                      {...getCommonProps(getTransferIndex(i, formKeys.amount))}
                      onChange={e => {
                        const {onChange} = getCommonProps(getTransferIndex(i, formKeys.amount));
                        onChange({
                          target: {
                            value: values.amount - e.target.value + (getCommonProps(getTransferIndex(i, formKeys.amount)).value || 0),
                            name: formKeys.amount,
                          },
                        });
                        onChange(e);
                      }}
                      type="number"
                      min="0"
                    />
                  </FormControl>
                </Block>
                <Block>
                  <FormControl
                    label={() => 'Currency *'}
                    error={getError(getTransferIndex(i, formKeys.currency))}
                  >
                    <Input
                      {...getCommonProps(getTransferIndex(i, formKeys.currency))}
                      disabled
                    />
                  </FormControl>
                </Block>
              </Block>

              <FormControl
                label={() => 'Storage *'}
                error={getError(getTransferIndex(i, formKeys.storage))}
              >
                <Input {...getCommonProps(getTransferIndex(i, formKeys.storage))} />
              </FormControl>

              <FormControl
                label={() => 'Description'}
                error={getError(getTransferIndex(i, formKeys.description))}
              >
                <Input {...getCommonProps(getTransferIndex(i, formKeys.description))} />
              </FormControl>

              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                    },
                  },
                }}
                onClick={handleRemoveBundle}
                kind={KIND.secondary}
                size={SIZE.mini}
                shape={SHAPE.circle}
              >
                <XMark />
              </Button>
            </Card>
          );
        })}

        <Button
          onClick={() => {
            arrayHelpers.push({
              currency: values.currency,
              storage: '',
              amount: 0,
              description: '',
            });
          }}
          kind={KIND.secondary}
          size={SIZE.compact}
          shape={SHAPE.pill}
          endEnhancer={Plus}
        >
          Add
        </Button>
      </Block>
    )}
  </FieldArray>
);

export default TransferBundles;
