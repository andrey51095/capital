import React, { useMemo} from 'react'
import { Block } from 'baseui/block'
import { Button } from 'baseui/button'
import { toaster } from 'baseui/toast';

import Currency from '../../components/currency';
import { useLazyFetch } from '../../hooks';

const USD = 'USD';
const getApilayerArgs = (currencies) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", process.env.REACT_APP_APILAYER_KEY);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const url = `https://api.apilayer.com/currency_data/live?source=${USD}&currencies=${currencies}`
  return [url, requestOptions];
};

export default function SummaryInUsd({ summary }) {
  const summaryParam = summary.map(({ currency }) => currency).join(',');
  const [getData, {loading, data}] = useLazyFetch(...getApilayerArgs(summaryParam))

  const totalValue = useMemo(() => {
    if (!data) {
      return 0
    }

    return summary.reduce((acc, { currency, amount }) => {
      if (currency === USD) return acc + amount;

      const exRate = data.quotes[`${data.source}${currency}`];
      if (!exRate) {
        toaster.warning(`${data.source}${currency} exchange rate is missing`)
        return acc;
      }

      return  acc + amount / exRate
    }, 0)
  }, [summary, data]);

  const handleClick = () => { getData() }

  return (
    <Block display="flex" marginTop="scale500" justifyContent="center" alignItems="center" gridColumnGap="scale400">
      <Button onClick={handleClick} isLoading={loading}>
        Get in Usd
      </Button>

      {data && (
        <Block display="flex" >
          ~{Math.round(totalValue)}
          (<Currency value={data.source} />)
        </Block>
      )
      }
   </Block>
 )
}