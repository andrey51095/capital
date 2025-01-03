import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Block} from 'baseui/block';

import MoneyBundles from '../pages/money-bundles';
import InvestmentCalculator from '../pages/investment-calculator';
import Expenses from '../pages/expenses';
import Income from '../pages/income';
import RegisterForm from '../pages/user-registration';
import {routes} from '../constants';

const RootRoutes = () => (
  <Block
    display="flex"
    padding="scale700"
    width="100%"
  >
    <Routes>
      <Route
        path={routes.root}
        element={<RegisterForm />}
      />

      <Route
        path={routes.capital}
        element={<MoneyBundles />}
      >
        <Route
          path=":id"
          element={<MoneyBundles />}
        />
      </Route>
      <Route
        path={routes.investmentCalculator}
        element={<InvestmentCalculator />}
      />
      <Route
        path={routes.expenses}
        element={<Expenses />}
      />
      <Route
        path={routes.income}
        element={<Income />}
      />
    </Routes>
  </Block>
);

export default RootRoutes;
