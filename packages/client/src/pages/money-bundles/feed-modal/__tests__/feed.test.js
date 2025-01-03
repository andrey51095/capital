import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Feed from '../feed'; // Adjust import based on the file structure
import {FeedItem} from '../FeedItem'; // Assuming FeedItem is imported from the correct path

// Mock FeedItem to avoid testing its internals
jest.mock('../FeedItem', () => ({
  FeedItem: ({...props}) => (
    <div
      data-testid="feed-item"
      {...props}
    />
  ),
}));

describe('Feed Component', () => {
  const mockCreatedAt = 1638495600; // Example timestamp for testing
  const mockFromJson = '{"id": 1, "name": "Old Item"}'; // Example JSON for 'from'
  const mockToJson = '{"id": 1, "name": "New Item"}'; // Example JSON for 'to'

  it('renders correctly when the feed is created (no "from" and "to" JSON)', () => {
    render(
      <Feed
        createdAt={mockCreatedAt}
        from={null}
        to={mockToJson}
      />
    );

    // Check if the creation text appears correctly
    expect(screen.getByText('Created')).toBeInTheDocument();

    // Check if the feed date is rendered correctly
    expect(screen.getByText(new Date(mockCreatedAt * 1000).toLocaleString())).toBeInTheDocument();

    // Check if JsonRender is called and displays "New" title
    expect(screen.getByText('New:')).toBeInTheDocument();
    expect(screen.getByTestId('feed-item')).toBeInTheDocument();
  });

  it('renders correctly when the feed is updated (has both "from" and "to" JSON)', () => {
    render(
      <Feed
        createdAt={mockCreatedAt}
        from={mockFromJson}
        to={mockToJson}
      />
    );

    // Check if the updated text appears correctly
    expect(screen.getByText('Updated')).toBeInTheDocument();

    // Check if the feed date is rendered correctly
    expect(screen.getByText(new Date(mockCreatedAt * 1000).toLocaleString())).toBeInTheDocument();

    // Check if JsonRender for "Old" and "New" titles are displayed
    expect(screen.getByText('Old:')).toBeInTheDocument();
    expect(screen.getByText('New:')).toBeInTheDocument();
    expect(screen.getAllByTestId('feed-item').length).toBe(2); // Ensure both Old and New items are rendered
  });

  it('does not render JsonRender if JSON is invalid', () => {
    const invalidJson = '{"id": 1, "name": "Invalid Item"'; // Missing closing brace

    render(
      <Feed
        createdAt={mockCreatedAt}
        from={invalidJson}
        to={mockToJson}
      />
    );

    // Check if the invalid JSON does not render the "Old" item
    expect(screen.queryByText('Old:')).not.toBeInTheDocument();
    expect(screen.getByText('New:')).toBeInTheDocument();
  });

  it('renders nothing if no "to" JSON is provided', () => {
    render(
      <Feed
        createdAt={mockCreatedAt}
        from={mockFromJson}
        to={null}
      />
    );

    // "New" content should not render if "to" is null
    expect(screen.queryByText('New:')).not.toBeInTheDocument();
  });

  it('logs an error if invalid JSON is provided and still renders the feed', () => {
    const invalidJson = '{"id": 1, "name": "Invalid Item"'; // Invalid JSON

    // Spy on console.error to verify that error is logged
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Feed
        createdAt={mockCreatedAt}
        from={invalidJson}
        to={mockToJson}
      />
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid JSON:', invalidJson);

    // Check that the feed still renders correctly despite the error
    expect(screen.getByText('Updated')).toBeInTheDocument();
    expect(screen.getByText('New:')).toBeInTheDocument();

    // Clean up the spy after the test
    consoleErrorSpy.mockRestore();
  });

  it('correctly formats the created date', () => {
    render(
      <Feed
        createdAt={mockCreatedAt}
        from={null}
        to={mockToJson}
      />
    );

    const date = new Date(mockCreatedAt * 1000).toLocaleString();

    // Check if the formatted date is correctly rendered
    expect(screen.getByText(date)).toBeInTheDocument();
  });
});

