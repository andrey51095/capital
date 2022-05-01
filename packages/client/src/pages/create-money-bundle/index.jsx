import React from 'react';
import { Block } from 'baseui/block';
import {HeadingMedium} from 'baseui/typography';
import {Spinner} from 'baseui/spinner'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {Select} from 'baseui/select';
import { useQuery } from 'react-apollo';
import { Formik, Form,Field } from 'formik';
import { Button } from 'baseui/button';

import { QUERY_CURRENCIES } from '../../gql'

import { validationSchema } from './validation';
import MoneyBundleForm from './form';
import { initialForm } from './constants';

const CreateMoneyBundle = () => {
  const handleOnSubmit = (values, actions) => {
    setTimeout(() => {
      // TODO make async call
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
    <Block>
      <HeadingMedium>
        Create Money Bundle
      </HeadingMedium>

      <Formik
        initialValues={initialForm}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
       {MoneyBundleForm}
      </Formik>
    </Block>
  );
}


export default CreateMoneyBundle;
