import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Block} from 'baseui/block';

import MoneyBundles from '../pages/money-bundles';
import CreateMoneyBundle from '../pages/create-money-bundle';
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
        element={<Navigate to={routes.capital} />}
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
        path={routes.createMoneyBundle}
        element={<CreateMoneyBundle />}
      />
    </Routes>
  </Block>
);

export default RootRoutes;
