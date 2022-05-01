import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Table from '../pages/table';
import {routes} from '../constants';

const RootRoutes = () => (
  <Routes>
    <Route
      path={routes.table}
      element={<Table />}
    />
  </Routes>
);

export default RootRoutes;
