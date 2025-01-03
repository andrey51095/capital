import React, {useState} from 'react';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {Checkbox} from 'baseui/checkbox';
import {Block} from 'baseui/block';
import {PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import {Table} from 'baseui/table';

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [reinvest, setReinvest] = useState(true);
  const [result, setResult] = useState(null);
  const [totalInvested, setTotalInvested] = useState(null);
  const [netProfit, setNetProfit] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const calculateInvestment = () => {
    const principal = parseFloat(initialInvestment) || 0;
    const rate = parseFloat(annualRate) / 100;
    const months = parseInt(years) * 12 || 0;
    const monthly = parseFloat(monthlyContribution) || 0;

    let total = principal;
    let totalContributions = principal;
    let data = [];
    let yearlyData = [];

    for (let i = 1; i <= months; i++) {
      if (reinvest) {
        total += total * (rate / 12);
      }
      total += monthly;
      totalContributions += monthly;

      if (i % 12 === 0) {
        const year = i / 12;
        const profit = total - totalContributions;

        data.push({
          year,
          total: total.toFixed(2),
          profit: profit.toFixed(2),
          totalContributions: totalContributions.toFixed(2),
        });
        yearlyData.push([
          `Year ${year}`,
          `$${total.toFixed(2)}`,
          `$${totalContributions.toFixed(2)}`,
          `$${profit.toFixed(2)}`,
        ]);
      }
    }

    const profit = total - totalContributions;

    setResult(total.toFixed(2));
    setTotalInvested(totalContributions.toFixed(2));
    setNetProfit(profit.toFixed(2));
    setChartData(data);
    setPieData([
      {
        name: 'Initial Investment',
        value: principal,
      }, {
        name: 'Contributions',
        value: totalContributions - principal,
      }, {
        name: 'Profit',
        value: profit,
      },
    ]);
    setTableData(yearlyData);
  };

  return (
    <Block
      padding="scale600"
      display="flex"
      flexDirection="column"
      gridGap="scale600"
      height="100%"
      width="100%"
    >
      <h1>Investment Calculator</h1>

      <Block
        display="grid"
        gridRowGap="10px"
      >
        <Input
          value={initialInvestment}
          onChange={e => setInitialInvestment(e.target.value)}
          placeholder="Initial Investment ($)"
          type="number"
          clearable
        />

        <Input
          value={annualRate}
          onChange={e => setAnnualRate(e.target.value)}
          placeholder="Annual Rate of Return (%)"
          type="number"
          clearable
        />

        <Input
          value={monthlyContribution}
          onChange={e => setMonthlyContribution(e.target.value)}
          placeholder="Monthly Contribution ($, optional)"
          type="number"
          clearable
        />

        <Input
          value={years}
          onChange={e => setYears(e.target.value)}
          placeholder="Number of Years"
          type="number"
          clearable
        />

        <Checkbox
          checked={reinvest}
          onChange={e => setReinvest(e.target.checked)}
        >
          Reinvest Returns
        </Checkbox>
      </Block>
      <Button onClick={calculateInvestment}>Calculate</Button>

      {result && (
        <Block>
          <h3>
            Total Value: $
            {result}
          </h3>
          <h3>
            Total Invested: $
            {totalInvested}
          </h3>
          <h3>
            Net Profit: $
            {netProfit}
          </h3>
          <Block
            display="flex"
            justifyContent="space-around"
          >
            <PieChart
              width={300}
              height={300}
            >
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>

            <LineChart
              width={500}
              height={300}
              data={chartData}
            >
              <XAxis
                dataKey="year"
                label={{
                  value: 'Years',
                  position: 'insideBottom',
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: 'Total ($)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="totalContributions"
                stroke="#8884d8"
              />
            </LineChart>
          </Block>

          <Table
            columns={[
              'Year',
              'Total Value',
              'Total Contributions',
              'Profit',
            ]}
            data={tableData}
            overrides={{Root: {style: {marginTop: '20px'}}}}
          />
        </Block>
      )}
    </Block>
  );
};

export default InvestmentCalculator;
