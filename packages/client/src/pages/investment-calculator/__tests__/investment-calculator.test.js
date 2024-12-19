import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import InvestmentCalculator from '../InvestmentCalculator';

describe('InvestmentCalculator Component', () => {
  beforeEach(() => {
    render(<InvestmentCalculator />);
  });

  it('should render all input fields and button', () => {
    // Check if all input fields and button are rendered
    expect(screen.getByPlaceholderText('Initial Investment ($)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Annual Rate of Return (%)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Monthly Contribution ($, optional)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number of Years')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  it('should update state when input fields change', () => {
    // Simulate input change
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Assert that the values have changed
    expect(screen.getByPlaceholderText('Initial Investment ($)').value).toBe('10000');
    expect(screen.getByPlaceholderText('Annual Rate of Return (%)').value).toBe('5');
    expect(screen.getByPlaceholderText('Monthly Contribution ($, optional)').value).toBe('200');
    expect(screen.getByPlaceholderText('Number of Years').value).toBe('10');
  });

  it('should calculate investment values correctly', async () => {
    // Simulate input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Total Value: $')).toBeInTheDocument();
      expect(screen.getByText('Total Invested: $')).toBeInTheDocument();
      expect(screen.getByText('Net Profit: $')).toBeInTheDocument();
    });
  });

  it('should calculate with reinvest checked', async () => {
    // Simulate input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Check reinvest checkbox
    fireEvent.click(screen.getByLabelText('Reinvest Returns'));

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Total Value: $')).toBeInTheDocument();
      expect(screen.getByText('Total Invested: $')).toBeInTheDocument();
      expect(screen.getByText('Net Profit: $')).toBeInTheDocument();
    });
  });

  it('should render the pie chart correctly after calculation', async () => {
    // Simulate input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Wait for chart to appear
    await waitFor(() => {
      const pieChart = screen.getByRole('img');
      expect(pieChart).toBeInTheDocument();
    });
  });

  it('should render the line chart correctly after calculation', async () => {
    // Simulate input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Wait for line chart to appear
    await waitFor(() => {
      const lineChart = screen.getByRole('chart');
      expect(lineChart).toBeInTheDocument();
    });
  });

  it('should render the table correctly after calculation', async () => {
    // Simulate input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '10000' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '10' } });

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Wait for table to appear
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  it('should show error when invalid input is provided', async () => {
    // Simulate invalid input
    fireEvent.change(screen.getByPlaceholderText('Initial Investment ($)'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Annual Rate of Return (%)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Monthly Contribution ($, optional)'), { target: { value: '200' } });
    fireEvent.change(screen.getByPlaceholderText('Number of Years'), { target: { value: '' } });

    // Click calculate button
    fireEvent.click(screen.getByText('Calculate'));

    // Check if error message appears (based on your implementation)
    await waitFor(() => {
      expect(screen.getByText('Please enter valid values')).toBeInTheDocument();
    });
  });

  it('should not update values if no input is provided', () => {
    // Click calculate button without any input
    fireEvent.click(screen.getByText('Calculate'));

    // Assert that the results are not displayed
    expect(screen.queryByText('Total Value: $')).not.toBeInTheDocument();
    expect(screen.queryByText('Total Invested: $')).not.toBeInTheDocument();
    expect(screen.queryByText('Net Profit: $')).not.toBeInTheDocument();
  });
});
