import React, {useState, useMemo} from 'react';
import {Block} from 'baseui/block';
import {useFormik, FormikProvider, FieldArray} from 'formik';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Select} from 'baseui/select';
import {Button, KIND, SHAPE, SIZE} from 'baseui/button';
import {Card} from 'baseui/card';
import {get, isEmpty} from 'lodash';

import {formKeys, getTransferIndex} from './constants';

const AmountInput = ({error, ...props}) => {
  const [showConcat, setShowConcat] = useState(false);
  const [valueToConcat, setValueToConcat] = useState(0);

  const handleShowConcat = () => setShowConcat(true);
  const handleConcatChange = e => setValueToConcat(+e.target.value);
  const handleConcatClick = () => {
    props.onChange({
      target: {
        name: props.name,
        value: props.value + valueToConcat,
      },
    });
    setValueToConcat(0);
    setShowConcat(false);
  };

  return (
    <FormControl
      label={() => 'Amount *'}
      error={error}
    >
      <Input
        {...props}
        type="number"
        min="0"
        overrides={{
          Root: {style: {paddingRight: 0}},
          EndEnhancer: {
            style: {
              paddingRight: 0,
              paddingLeft: 0,
            },
          },
        }}
        endEnhancer={() => (
          <Block maxWidth="320px">
            {!showConcat && (<Button onClick={handleShowConcat}>Add</Button>)}
            {showConcat && (
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
            )}
          </Block>
        )}
      />
    </FormControl>
  );
};

const EditMode = ({amount, description, id, currency, storage, allList, onSubmit}) => {
  const formik = useFormik({
    initialValues: {
      amount,
      description,
      storage,
      transfer: [],
    },
    onSubmit: async (values, actions) => {
      await onSubmit({
        ...values,
        id,
      });
      actions.setSubmitting(false);
    },
  });

  const {
    values,
    touched,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    isSubmitting,
  } = formik;

  const getCommonProps = key => ({
    onChange: handleChange,
    onBlur: handleBlur,
    name: key,
    value: get(values, key),
  });

  const getError = key => touched[key] && errors[key];

  const allListFilteredByCurrency = allList
    .filter(i => i.currency === currency && i.id !== id)
    .map(({id, currency, amount, description, storage}) => ({
      id,
      currency,
      amount,
      description,
      storage,
    }));

  const transferAmount = useMemo(() => values.transfer.reduce((acc, item) => acc + +item.amount, 0), [values.transfer]);
  const isDisabledByAmount = amount === values.amount && description === values.description && storage === values.storage && !transferAmount;

  return (
    <>
      <Block
        paddingTop="scale200"
        paddingBottom="scale500"
      >
        EDIT MODE
      </Block>
      <FormikProvider value={formik}>
        <AmountInput
          error={getError(formKeys.amount)}
          {...getCommonProps(formKeys.amount)}
        />

        <FormControl
          label={() => 'Storage'}
          error={getError(formKeys.storage)}
        >
          <Input {...getCommonProps(formKeys.storage)} />
        </FormControl>

        <FormControl
          label={() => 'Description'}
          error={getError(formKeys.description)}
        >
          <Input {...getCommonProps(formKeys.description)} />
        </FormControl>

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
                return (
                  <Card key={i}>
                    <FormControl
                      label={() => 'To'}
                      caption={() => 'Leave empty for new bundle'}
                      error={getError(getTransferIndex(i, formKeys.id))}
                    >
                      <Select
                        value={get(values, getTransferIndex(i, formKeys.id)) && [{id: get(values, getTransferIndex(i, formKeys.id))}]}
                        options={allListFilteredByCurrency}
                        getOptionLabel={({option}) => `${option.amount}(${option.currency}) - ${option.storage}`}
                        getValueLabel={({option}) => `${option.amount}(${option.currency}) - ${option.storage}`}
                        onChange={params => {
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
                              currency,
                              storage,
                              amount: 0,
                              description: '',
                            });

                          }
                        }}

                      />
                    </FormControl>

                    <FormControl
                      label={() => 'Amount to transfer *'}
                      error={getError(getTransferIndex(i, formKeys.amount))}
                    >
                      <Input
                        {...getCommonProps(getTransferIndex(i, formKeys.amount))}
                        onChange={e => {
                          const transferFromOtherCards = values.transfer.reduce((acc, item, index) => index === i ? acc : acc + item.amount, 0);
                          handleChange({
                            target: {
                              value: amount - transferFromOtherCards - e.target.value,
                              name: formKeys.amount,
                            },
                          });
                          handleChange(e);
                        }}
                        type="number"
                        min="0"
                      />
                    </FormControl>

                    <FormControl
                      label={() => 'Currency *'}
                      error={getError(getTransferIndex(i, formKeys.currency))}
                    >
                      <Input
                        {...getCommonProps(getTransferIndex(i, formKeys.currency))}
                        disabled
                      />
                    </FormControl>

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
                      onClick={handleRemoveBundle}
                      kind={KIND.secondary}
                      size={SIZE.mini}
                      shape={SHAPE.pill}
                    >
                      -
                    </Button>
                  </Card>
                );
              })}

              <Button
                onClick={() => arrayHelpers.push({
                  currency,
                  storage: '',
                  amount: 0,
                  description: '',
                })}
                kind={KIND.secondary}
                size={SIZE.mini}
                shape={SHAPE.pill}
              >
                transfer +
              </Button>
            </Block>
          )}
        </FieldArray>

        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={!isEmpty(errors) || isDisabledByAmount}
        >
          Submit
        </Button>
      </FormikProvider>

    </>
  );

};

export default EditMode;
