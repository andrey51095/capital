import React, {useState, useMemo} from 'react'
import { useQuery } from 'react-apollo'
import { format } from 'date-fns';
import {
  TableBuilder,
  TableBuilderColumn,
  SIZE,
} from 'baseui/table-semantic';
import { Block } from 'baseui/block';
import { StyledLink } from "baseui/link";
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer } from "baseui/drawer";

import { QUERY_MONEY_BUNDLES } from '../../gql';
import Currency from '../../components/currency';

import Details from './details';

const MoneyBundles = () => {
  const { data, loading } = useQuery(QUERY_MONEY_BUNDLES);
  const [sortColumn, setSortColumn] = useState('currency');
  const [sortAsc, setSortAsc] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  //https://baseweb.design/components/table-semantic/#table-builder-with-sorting
  const sortedData = useMemo(() => {
    return (data?.moneyBundles || []).slice().sort((a, b) => {
      const left = sortAsc ? a : b;
      const right = sortAsc ? b : a;
      const leftValue = String(left[sortColumn]);
      const rightValue = String(right[sortColumn]);
      return leftValue.localeCompare(rightValue, 'en', {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }, [sortColumn, sortAsc, data]);

  const handleSort = (id) => {
    if (id === sortColumn) {
      setSortAsc(asc => !asc);
    } else {
      setSortColumn(id);
      setSortAsc(true);
    }
  }
  const selectedRow = useMemo(() => (data?.moneyBundles || []).find(({id}) => `#${id}` === location.hash), [location.hash, data]);

  if (loading) {
    return 'Loading...'
  }

  return (
    <Block>
      <TableBuilder
        data={sortedData}
        size={SIZE.compact}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? 'ASC' : 'DESC'}
        onSort={handleSort}
      >
        <TableBuilderColumn header="Amount" id="amount" numeric sortable>
          {row => <StyledLink href={`#${row.id}`}>{row.amount}</StyledLink>}
        </TableBuilderColumn>
        <TableBuilderColumn header="Currency" id="currency" sortable>
          {row => <Currency value={row.currency} />}
        </TableBuilderColumn>
        <TableBuilderColumn header="Storage">
          {row => row.storage}
        </TableBuilderColumn>
        <TableBuilderColumn header="Created At" id="createdAt" sortable>
          {(row) => format(row.createdAt, 'hh:mm aaa, dd MMM yyyy')}
        </TableBuilderColumn>
        <TableBuilderColumn header="Updated At"  id="updatedAt" sortable>
          {(row) => (row.updatedAt && format(row.updatedAt, 'hh:mm aaa, dd MMM yyyy')) || '-'}
        </TableBuilderColumn>
      </TableBuilder>

      <Drawer isOpen={Boolean(selectedRow)} onClose={() => navigate('#')}>
        {selectedRow && <Details {...selectedRow}/>}
      </Drawer>
    </Block>
  )
}

export default MoneyBundles
