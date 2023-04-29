import React, {useMemo} from 'react';
import {Block} from 'baseui/block';
import {useFormik, FormikProvider} from 'formik';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {Select} from 'baseui/select';
import {get, isEmpty} from 'lodash';

import {useBundleTypesOptions} from '../../../hooks/graphql';
import {formKeys} from '../constants';

import AmountInput from './amount-input';
import TransferBundles from './transfer-bundles';

const EditForm = ({amount, description, id, currency, storage, allList, onSubmit, type}) => {
  const {typesOptions, loading: typesOptionsLoading} = useBundleTypesOptions();

  const formik = useFormik({
    initialValues: {
      amount,
      description: description || '',
      storage,
      transfer: [],
      currency,
      ...(type === 'invalid' ? {type} : {}),
    },
    onSubmit: async (values, actions) => {
      let request = { ...values, id };

      if (request.transfer) {
        request.transfer = request.transfer.map(item => ({...item, type: values?.type || type}))
      }

      await onSubmit(request);
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

  const getSelectProps = key => ({
    onBlur: event => handleBlur({
      target: {
        ...event.target,
        name: key,
      },
    }),
    onChange: ({value}) => handleChange({
      target: {
        name: key,
        value: value[0]?.id || '',
      },
    }),
    value: values[key] && [{id: values[key]}],
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
  const isDisabled = (() => {
    if (amount === values.amount && description === values.description && storage === values.storage && !transferAmount) {
      if (values.type) {
        return values.type === type;
      }
      return true;
    }
    return false;
  })();

  return (
    <>
      <Block
        paddingTop="scale200"
        paddingBottom="scale500"
      >
        Edit
        {' '}
        {values.storage}
      </Block>
      <FormikProvider value={formik}>
        <AmountInput
          error={getError(formKeys.amount)}
          {...getCommonProps(formKeys.amount)}
        />

        {values.type && (
          <FormControl
            label={() => 'Type'}
            error={getError(formKeys.type)}
          >
            <Select
              {...getSelectProps(formKeys.type)}
              options={typesOptions}
              isLoading={typesOptionsLoading}
              clearable={false}
            />
          </FormControl>
        )}

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
          disabled={!isEmpty(errors) || isDisabled}
        >
          Submit
        </Button>
      </FormikProvider>

    </>
  );

};

export default EditForm;
