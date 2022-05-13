import React from 'react'
import { Form, Field } from 'formik';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from 'baseui/select';
import { Button } from 'baseui/button';
import { useQuery } from 'react-apollo';

import { QUERY_CURRENCIES, QUERY_TYPES } from '../../gql'

import { formKeys } from './constants';

const MoneyBundleForm = ({ values, handleChange, handleBlur, isSubmitting, errors, touched}) => {
  const currenciesResult = useQuery(QUERY_CURRENCIES);
  const typesResult = useQuery(QUERY_TYPES);

  const currencyOptions = (currenciesResult.data?.currencies || []).map(id => ({ id, label: id }));
  const typesOptions = typesResult.data?.types || [];

  const handleSelectChange = ({ value }) =>
    handleChange({ target: { name: formKeys.currency, value: value[0]?.id || '' } });

  const handleSelectBlur = (event) =>
    handleBlur({ target: { ...event.target, name: formKeys.currency } });

  const getSelectProps = (key) => ({
    onBlur:  (event) => handleBlur({ target: { ...event.target, name: key } }),
    onChange: ({ value }) => handleChange({ target: { name: key, value: value[0]?.id || '' } }),
    value: values[key] && [{ id: values[key] }]
  });

  return (
    <Form>
      <FormControl label={() => "Amount *"} error={touched[formKeys.amount] && errors[formKeys.amount]}>
        <Field as={Input} name={formKeys.amount} type="number" />
      </FormControl>

      <FormControl label={() => "Currency *"} error={touched[formKeys.currency] && errors[formKeys.currency]}>
        <Select
          {...getSelectProps(formKeys.currency)}
          options={currencyOptions}
          isLoading={currenciesResult.loading}
        />
      </FormControl>

      <FormControl label={() => "Type *"} error={touched[formKeys.type] && errors[formKeys.type]}>
        <Select
          {...getSelectProps(formKeys.type)}
          options={typesOptions}
          isLoading={typesResult.loading}
        />
      </FormControl>

      <FormControl label={() => "Storage *"} error={touched[formKeys.storage] && errors[formKeys.storage]}>
        <Field as={Input} name={formKeys.storage} />
      </FormControl>

      <FormControl label={() => "Description"} error={touched[formKeys.description] && errors[formKeys.description]}>
        <Field as={Input} name={formKeys.description} />
      </FormControl>

      <Button type="submit" isLoading={isSubmitting}>Submit</Button>
    </Form>
  )
}
export default MoneyBundleForm;
