import React from 'react';
import {render, screen} from '@testing-library/react';
import {FeedItem} from '../FeedItem';

describe('FeedItem Component', () => {
  it('renders currency and amount correctly', () => {
    const props = {
      currency: 'USD',
      amount: '100',
      description: 'Test description',
      storage: 'Test storage',
      createdAt: 1713452345, // UNIX timestamp
    };

    render(<FeedItem {...props} />);

    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test storage/i)).toBeInTheDocument();
  });
});
