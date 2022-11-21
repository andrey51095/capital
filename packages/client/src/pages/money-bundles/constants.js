const currency = 'currency';
const amount = 'amount';
const description = 'description';
const storage = 'storage';
const transfer = 'transfer';
const id = 'id';
const type = 'type';

export const formKeys = {
  transfer,
  id,
  currency,
  amount,
  description,
  storage,
  type,
};

export const getTransferIndex = (index, key) => `${transfer}.${index}.${key}`;
