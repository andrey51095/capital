import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {useFeed} from '../../../hooks/graphql'; // Mock the hook
import FeedModalContainer from '../FeedModalContainer';
import FeedModal from '../feed-modal';
import Feed from '../feed';

jest.mock('../../../hooks/graphql', () => ({useFeed: jest.fn()}));

jest.mock('../feed', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Feed Item</div>),
}));

jest.mock('../feed-modal', () => ({
  __esModule: true,
  default: jest.fn(({feed, isOpen, onClose, loading, loadMore}) => (
    <div>
      {isOpen && feed}
      {loading && <div>Loading...</div>}
      <button onClick={loadMore}>Load More</button>
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));

describe('FeedModalContainer', () => {
  const mockOnClose = jest.fn();
  const mockLoadMore = jest.fn();

  beforeEach(() => {
    useFeed.mockClear();
  });

  it('renders the FeedModal when open', async () => {
    useFeed.mockReturnValue({
      feed: [
        {
          id: '1',
          content: 'Feed item 1',
        },
      ],
      loading: false,
      loadMore: mockLoadMore,
    });

    render(<FeedModalContainer
      isOpen={true}
      onClose={mockOnClose}
           />);

    expect(screen.getByText('Feed Item')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('does not render the FeedModal when closed', () => {
    useFeed.mockReturnValue({
      feed: [
        {
          id: '1',
          content: 'Feed item 1',
        },
      ],
      loading: false,
      loadMore: mockLoadMore,
    });

    render(<FeedModalContainer
      isOpen={false}
      onClose={mockOnClose}
           />);

    expect(screen.queryByText('Feed Item')).not.toBeInTheDocument();
  });

  it('displays loading text while feed is loading', () => {
    useFeed.mockReturnValue({
      feed: [],
      loading: true,
      loadMore: mockLoadMore,
    });

    render(<FeedModalContainer
      isOpen={true}
      onClose={mockOnClose}
           />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls loadMore when Load More button is clicked', async () => {
    useFeed.mockReturnValue({
      feed: [
        {
          id: '1',
          content: 'Feed item 1',
        },
      ],
      loading: false,
      loadMore: mockLoadMore,
    });

    render(<FeedModalContainer
      isOpen={true}
      onClose={mockOnClose}
           />);

    fireEvent.click(screen.getByText('Load More'));

    await waitFor(() => expect(mockLoadMore).toHaveBeenCalledTimes(1));
  });

  it('calls onClose when Close button is clicked', () => {
    useFeed.mockReturnValue({
      feed: [
        {
          id: '1',
          content: 'Feed item 1',
        },
      ],
      loading: false,
      loadMore: mockLoadMore,
    });

    render(<FeedModalContainer
      isOpen={true}
      onClose={mockOnClose}
           />);

    fireEvent.click(screen.getByText('Close'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
