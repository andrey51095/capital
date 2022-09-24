
const TOTAL = 'TOTAL';
const NOT_INVESTED = 'NOT_INVESTED';
const INVESTED = 'INVESTED';

export const configOptions = [TOTAL, INVESTED, NOT_INVESTED];
export const cardConfig = {
  [TOTAL]: 'total',
  [NOT_INVESTED]: 'notInvested',
  [INVESTED]: 'Invested',
};

export const titleMapper = {
  [TOTAL]: 'Total Summary',
  [NOT_INVESTED]: 'Not Invested(banks/banknotes)',
  [INVESTED]: 'Invested',
};
