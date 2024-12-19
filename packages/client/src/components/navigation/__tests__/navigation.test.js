import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import SideNav from '../';

// Mock the useLocation and useNavigate hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('SideNav', () => {
  it('renders nothing when navItems is empty', () => {
    const {container} = render(
      <Router>
        <SideNav />
      </Router>
    );
    expect(container.firstChild).toBeNull(); // If navItems is empty, nothing should render
  });
});
