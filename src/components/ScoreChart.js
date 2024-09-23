// ScoreChart.js

import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import useFetchData from '../hooks/useFetchData';

const ScoreChart = () => {
  const userData = useFetchData((dataSource) => dataSource.getUserMainData());

  if (!userData) {
    return <div>Chargement du score...</div>;
  }

  const score = userData.todayScore || userData.score;

  const data = [
    {
      name: 'Score',
      value: score * 100,
      fill: 'red',
    }
  ];

  return (
    <div className="score-chart">
      <h2 className="score-chart__title">Score</h2>
      <ResponsiveContainer>
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          barSize={15}
          data={data}
          startAngle={90}
          endAngle={450}
          >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            />
          <RadialBar
            background
            dataKey="value"
            />
          <text x="50%" y="50%" textAnchor="middle" className="score-chart__progress-label">{`${(score * 100).toFixed(0)}%`}</text>
          <text x="50%" y="65%" textAnchor="middle" className="score-chart__progress-subtext">de votre objectif</text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
