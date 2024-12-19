import React from 'react';
import {render} from '@testing-library/react';
import App from '../';

jest.mock('../../components/navigation', () => () => <div>SideNav</div>);
jest.mock('../routes', () => () => <div>Routes</div>);

describe('App', () => {
  it('renders SideNav and Routes components', () => {
    const {getByText} = render(<App />);

    expect(getByText('SideNav')).toBeInTheDocument();
    expect(getByText('Routes')).toBeInTheDocument();
  });
});
