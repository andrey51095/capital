import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import RootRoutes from '../routes';
import {routes} from '../../constants';

// Mocking pages to isolate the test
jest.mock('../../pages/money-bundles', () => () => <div>MoneyBundles</div>);

describe('RootRoutes', () => {
  it('renders the MoneyBundles component when navigating to /capital', () => {
    render(
      <Router>
        <RootRoutes />
      </Router>
    );

    // Navigate to the /capital route
    window.history.pushState({}, 'Test page', routes.capital);

    // Check if the MoneyBundles component is rendered
    expect(screen.getByText('MoneyBundles')).toBeInTheDocument();
  });

});
