import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BackupButton from '../BackupButton'; // Adjust import based on file structure
import { BACKUP_MUTATION } from '../../../gql';

// Mocking the necessary GraphQL Mutation
const mockBackupMutation = {
  request: {
    query: BACKUP_MUTATION,
  },
  result: {
    data: {
      backup: JSON.stringify({ key: 'value' }), // Mocked backup data response
    },
  },
};

describe('BackupButton Component', () => {
  it('opens modal on button click', () => {
    render(
      <MockedProvider mocks={[mockBackupMutation]} addTypename={false}>
        <BackupButton />
      </MockedProvider>
    );

    // Verify that the button is rendered
    const button = screen.getByText('Backup Data');
    fireEvent.click(button);

    // Verify modal is opened
    expect(screen.getByText('Backup Data')).toBeInTheDocument();
  });

  it('displays error when backup name is not provided', () => {
    render(
      <MockedProvider mocks={[mockBackupMutation]} addTypename={false}>
        <BackupButton />
      </MockedProvider>
    );

    // Open the modal
    fireEvent.click(screen.getByText('Backup Data'));
    
    // Click the download button without entering a name
    fireEvent.click(screen.getByText('Download'));
    
    // Check that error message appears
    expect(screen.getByText('Please provide a name')).toBeInTheDocument();
  });

  it('downloads the backup file when valid name is provided', async () => {
    render(
      <MockedProvider mocks={[mockBackupMutation]} addTypename={false}>
        <BackupButton />
      </MockedProvider>
    );

    // Open the modal
    fireEvent.click(screen.getByText('Backup Data'));

    // Provide a valid backup name
    fireEvent.change(screen.getByLabelText('Please enter a name of the file'), {
      target: { value: 'test-backup' },
    });

    // Click the download button
    fireEvent.click(screen.getByText('Download'));

    // Wait for the file to be triggered for download
    await waitFor(() => expect(screen.getByText('Backup Data')).not.toBeInTheDocument());

    // The link element should be clicked and download should happen
    expect(screen.getByRole('link')).toHaveAttribute('download', 'test-backup.json');
  });

  it('handles error if backup mutation fails', async () => {
    const errorMock = {
      request: {
        query: BACKUP_MUTATION,
      },
      error: new Error('Backup failed'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <BackupButton />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Backup Data'));

    fireEvent.change(screen.getByLabelText('Please enter a name of the file'), {
      target: { value: 'test-backup' },
    });

    fireEvent.click(screen.getByText('Download'));

    // Wait for the error to be displayed
    await waitFor(() => expect(screen.queryByText('Backup failed')).toBeInTheDocument());
  });
});
