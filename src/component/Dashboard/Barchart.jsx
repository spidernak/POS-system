import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 4000,
    spend: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    spend: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    income: 2000,
    spend: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    income: 2780,
    spend: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    income: 1890,
    spend: 4800,
    amt: 2181,
  },
  

];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
    
        <BarChart
          width={905}
          height={305}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis orientation='right'/>
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="rgba(153, 87, 179, 1)" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="spend" fill="rgba(214, 120, 0, 1)" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          
        </BarChart>

    );
  }
}

export {};


