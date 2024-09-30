import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useFetchData from "../hooks/useFetchData";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="daily-activity-chart__tooltip">
        <p>{`${payload[0].value} kg`}</p>
        <p>{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
};

const DailyActivityChart = () => {
  const activityData = useFetchData((dataSource) => dataSource.getUserActivity());

  if (!activityData) {
    return <div>Chargement des données d"activité...</div>;
  }

  const data = activityData.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories,
  }));

  return (
    <div className="daily-activity-chart">
      <h2 className="daily-activity-chart__title">Activité quotidienne</h2>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ bottom: 20 }} >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} tick={{ dy: 10 }} />
          <YAxis yAxisId="kg" orientation="right" axisLine={false} tickLine={false} domain={["dataMin - 1", "dataMax + 1"]} tick={{ dx: 10 }} />
          <YAxis yAxisId="calories" hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: "20px" }} />
          <Bar yAxisId="kg" dataKey="kilogram" name="Poids (kg)" barSize={7} radius={[3, 3, 0, 0]} />
          <Bar yAxisId="calories" dataKey="calories" fill="red" name="Calories brûlées (kCal)" barSize={7} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyActivityChart;
