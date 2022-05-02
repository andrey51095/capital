import React from 'react';
import { Block } from 'baseui/block';
import {HeadingMedium} from 'baseui/typography';
import { Formik } from 'formik';
import { toaster } from 'baseui/toast';
import { useMutation } from 'react-apollo';
import { useNavigate } from 'react-router-dom';

import { CREATE_MONEY_BUNDLE_MUTATION, QUERY_MONEY_BUNDLES} from '../../gql'
import { routes } from '../../constants';

import { validationSchema } from './validation';
import MoneyBundleForm from './form';
import { initialForm } from './constants';

const CreateMoneyBundle = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_MONEY_BUNDLE_MUTATION, {
    onCompleted: ({moneyBundle}) => {
      toaster.positive(`Created new money bundle ${moneyBundle.amount}(${moneyBundle.currency})!`)
      navigate(routes.moneyBundles)
    },
    refetchQueries: [{ query: QUERY_MONEY_BUNDLES }],
    awaitRefetchQueries: true
  });

  const handleOnSubmit = async (values, actions) => {
    await mutate({ variables: values })
      actions.setSubmitting(false);
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
