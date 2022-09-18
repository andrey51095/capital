import {
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
  CustomColumn,
  DatetimeColumn,
} from 'baseui/data-table';

import Currency from '../../../components/currency';

// to use default sorting and filtering func
// eslint-disable-next-line no-unused-vars
const {kind, ...categoricalCurrencyConfig} = CategoricalColumn({
  title: 'Currency',
  mapDataToValue: data => data.currency,
});

const columns = [
  NumericalColumn({
    title: 'Amount',
    mapDataToValue: data => data.amount,
    fillWidth: false,
  }),
  CustomColumn({
    ...categoricalCurrencyConfig,
    fillWidth: false,
    renderCell: Currency,
  }),
  CategoricalColumn({
    title: 'Type',
    mapDataToValue: data => data.type,
    fillWidth: false,
  }),
  StringColumn({
    title: 'Storage',
    mapDataToValue: data => data.storage,
  }),
  StringColumn({
    title: 'Description',
    mapDataToValue: data => data.description || '-',
    sortable: false,
  }),
  DatetimeColumn({
    title: 'Created At',
    mapDataToValue: data => new Date(data.createdAt),
    formatString: 'HH:mm, dd/MM/yy',
    fillWidth: false,
  }),
  DatetimeColumn({
    title: 'Updated At',
    mapDataToValue: data => new Date(data.updatedAt || data.createdAt),
    formatString: 'HH:mm, dd/MM/yy',
    fillWidth: false,
  }),
];

export default columns;
