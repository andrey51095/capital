import React from 'react';
import {render, screen} from '@testing-library/react';
import {format} from 'date-fns';
import Body from './Body';

const mockProps = {
  type: 'Income',
  description: 'Salary',
  createdAt: new Date(2023, 5, 15), // 15th June 2023
  updatedAt: new Date(2023, 6, 10), // 10th July 2023
};

describe('Body component', () => {
  it('should render all fields when description is present', () => {
    render(<Body {...mockProps} />);

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText(mockProps.type)).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText(format(mockProps.createdAt, 'dd MMM yyyy'))).toBeInTheDocument();
    expect(screen.getByText('Updated at')).toBeInTheDocument();
    expect(screen.getByText(format(mockProps.updatedAt, 'dd MMM yyyy'))).toBeInTheDocument();
  });

  it('should render without description when it is empty', () => {
    const propsWithoutDescription = {
      ...mockProps,
      description: '',
    };

    render(<Body {...propsWithoutDescription} />);

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText(propsWithoutDescription.type)).toBeInTheDocument();
    expect(screen.queryByText('Description')).toBeNull();
    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText(format(propsWithoutDescription.createdAt, 'dd MMM yyyy'))).toBeInTheDocument();
    expect(screen.getByText('Updated at')).toBeInTheDocument();
    expect(screen.getByText(format(propsWithoutDescription.updatedAt, 'dd MMM yyyy'))).toBeInTheDocument();
  });

  it('should display formatted date correctly', () => {
    const formattedDate = format(mockProps.createdAt, 'dd MMM yyyy');
    render(<Body {...mockProps} />);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should render only "Created at" and "Updated at" if description is missing', () => {
    const propsWithoutDescription = {
      ...mockProps,
      description: '',
    };

    render(<Body {...propsWithoutDescription} />);

    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText(format(propsWithoutDescription.createdAt, 'dd MMM yyyy'))).toBeInTheDocument();
    expect(screen.getByText('Updated at')).toBeInTheDocument();
    expect(screen.getByText(format(propsWithoutDescription.updatedAt, 'dd MMM yyyy'))).toBeInTheDocument();
  });

  it('should handle missing updatedAt gracefully', () => {
    const propsWithoutUpdatedAt = {
      ...mockProps,
      updatedAt: undefined,
    };

    render(<Body {...propsWithoutUpdatedAt} />);

    expect(screen.getByText('Created at')).toBeInTheDocument();
    expect(screen.getByText(format(propsWithoutUpdatedAt.createdAt, 'dd MMM yyyy'))).toBeInTheDocument();
    expect(screen.queryByText('Updated at')).toBeNull();
  });
});
