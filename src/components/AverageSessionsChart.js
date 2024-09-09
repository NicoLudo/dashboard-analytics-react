import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { USER_AVERAGE_SESSIONS_MOCK } from '../mockData';

const userAverageSessions = USER_AVERAGE_SESSIONS_MOCK.find(session => session.userId === 12);
const data = userAverageSessions.sessions;

const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="average-session-chart__tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const AverageSessionsChart = () => {
  return (
    <div className="average-session-chart">
      <h2 className="average-session-chart__title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            className="average-session-chart__xaxis"
            dataKey="day"
            tickFormatter={(index) => daysOfWeek[index - 1]}
            tick={{ fill: '#FFF' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#FFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ strokeWidth: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsChart;
