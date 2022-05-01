import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Block} from 'baseui/block';

import MoneyBundles from '../pages/money-bundles';
import CreateMoneyBundle from '../pages/create-money-bundle';
import {routes} from '../constants';

const RootRoutes = () => (
  <Block padding="scale700">
    <Routes>
      <Route
        path={routes.moneyBundles}
        element={<MoneyBundles />}
      />

      <Route
        path={routes.createMoneyBundle}
        element={<CreateMoneyBundle />}
      />
    </Routes>
  </Block>
);

export default RootRoutes;
