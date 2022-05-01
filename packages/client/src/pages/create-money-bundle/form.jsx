import React from 'react'
import { Form, Field } from 'formik';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from 'baseui/select';
import { Button } from 'baseui/button';
import { useQuery } from 'react-apollo';

import { QUERY_CURRENCIES } from '../../gql'

import { formKeys } from './constants';

const MoneyBundleForm = ({ values, handleChange, handleBlur, isSubmitting, errors, touched}) => {
  const { data, loading } = useQuery(QUERY_CURRENCIES);

  const currencyOptions = (data?.currencies || []).map(id => ({ id, label: id }));

  const handleSelectChange = ({ value }) =>
    handleChange({ target: { name: formKeys.currency, value: value[0]?.id || '' } });

  const handleSelectBlur = (event) =>
    handleBlur({ target: { ...event.target, name: formKeys.currency } });

  return (
    <Form>
      <FormControl label={() => "Amount *"} error={touched[formKeys.amount] && errors[formKeys.amount]}>
        <Field as={Input} name={formKeys.amount} type="number" />
      </FormControl>

      <FormControl label={() => "Currency *"} error={touched[formKeys.currency] && errors[formKeys.currency]}>
        <Select
          value={values[formKeys.currency] && [{ id: values[formKeys.currency] }]}
          options={currencyOptions}
          onBlur={handleSelectBlur}
          onChange={handleSelectChange}
          isLoading={loading}
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
