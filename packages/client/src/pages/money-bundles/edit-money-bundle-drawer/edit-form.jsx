import React, {useMemo} from 'react';
import {Block} from 'baseui/block';
import {useFormik, FormikProvider} from 'formik';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {get, isEmpty} from 'lodash';

import {formKeys} from '../constants';

import AmountInput from './amount-input';
import TransferBundles from './transfer-bundles';

const EditForm = ({amount, description, id, currency, storage, allList, onSubmit}) => {
  const formik = useFormik({
    initialValues: {
      amount,
      description,
      storage,
      transfer: [],
      currency,
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
        Edit
        {' '}
        { values.storage}
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

        <TransferBundles
          values={values}
          getError={getError}
          optionsTransferTo={allListFilteredByCurrency}
          getCommonProps={getCommonProps}
        />

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

export default EditForm;
