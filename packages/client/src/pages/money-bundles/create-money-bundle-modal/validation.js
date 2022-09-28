import * as Yup from 'yup';

import {formKeys} from './constants';

export const validationSchema = Yup.object().shape({
  [formKeys.amount]: Yup.number().required(),
  [formKeys.currency]: Yup.string().required(),
  [formKeys.storage]: Yup.string().required(),
  [formKeys.description]: Yup.string(),
});
