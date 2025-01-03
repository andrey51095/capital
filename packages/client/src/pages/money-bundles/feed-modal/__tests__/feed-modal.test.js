import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import FeedModal from '../FeedModal'; // Adjust the import based on your file structure

// Mock Button from BaseUI as it is part of the Modal component
jest.mock('baseui/button', () => ({
  Button: ({onClick, isLoading, disabled, children}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={isLoading}
    >
      {children}
    </button>
  ),
}));

describe('FeedModal', () => {
  const mockOnClose = jest.fn();
  const mockLoadMore = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockLoadMore.mockClear();
  });

  it('renders the FeedModal when open', () => {
    render(
      <FeedModal
        isOpen={true}
        onClose={mockOnClose}
        feed={[<div key="1">Feed Item 1</div>, <div key="2">Feed Item 2</div>]}
        loading={false}
        loadMore={mockLoadMore}
      />
    );

    // Check modal is open and header is correct
    expect(screen.getByText('Feed')).toBeInTheDocument();

    // Check feed items are rendered
    expect(screen.getByText('Feed Item 1')).toBeInTheDocument();
    expect(screen.getByText('Feed Item 2')).toBeInTheDocument();

    // Check if "Load More" button is present
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });

  it('does not render the modal content when closed', () => {
    render(
      <FeedModal
        isOpen={false}
        onClose={mockOnClose}
        feed={[<div key="1">Feed Item 1</div>]}
        loading={false}
        loadMore={mockLoadMore}
      />
    );

    // Modal body should not be rendered
    expect(screen.queryByText('Feed Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Load more')).not.toBeInTheDocument();
  });

  it('displays loading text when loading prop is true', () => {
    render(
      <FeedModal
        isOpen={true}
        onClose={mockOnClose}
        feed={[<div key="1">Feed Item 1</div>]}
        loading={true}
        loadMore={mockLoadMore}
      />
    );

    // Check if loading text is rendered
    expect(screen.getByText('loading...')).toBeInTheDocument();

    // Check that the "Load more" button is disabled during loading
    const loadMoreButton = screen.getByText('Load more');
    expect(loadMoreButton).toBeDisabled();
  });

  it('calls loadMore when "Load more" button is clicked', async () => {
    render(
      <FeedModal
        isOpen={true}
        onClose={mockOnClose}
        feed={[<div key="1">Feed Item 1</div>]}
        loading={false}
        loadMore={mockLoadMore}
      />
    );

    // Simulate clicking the "Load more" button
    fireEvent.click(screen.getByText('Load more'));

    // Wait for the loadMore function to be called
    await waitFor(() => expect(mockLoadMore).toHaveBeenCalledTimes(1));
  });

  it('calls onClose when the modal close button is clicked', () => {
    render(
      <FeedModal
        isOpen={true}
        onClose={mockOnClose}
        feed={[<div key="1">Feed Item 1</div>]}
        loading={false}
        loadMore={mockLoadMore}
      />
    );

    // Simulate closing the modal by clicking on the backdrop or close button
    fireEvent.click(screen.getByRole('button', {name: /close/i}));

    // Verify that the onClose function has been called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
