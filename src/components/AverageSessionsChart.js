import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";

const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

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
  const { userId } = useParams();
  const sessionsData = useFetchData((dataSource) => dataSource.getUserAverageSessions(userId), userId);

  if (!sessionsData) {
    return <div>Chargement des sessions...</div>;
  }

  const data = sessionsData.sessions;

  return (
    <div className="chart average-session-chart">
      <h2 className="average-session-chart__title">Durée moyenne des sessions</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis className="average-session-chart__xaxis" dataKey="day" tickFormatter={(index) => daysOfWeek[index - 1]} tick={{ fill: "white" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line type="monotone" dataKey="sessionLength" stroke="white" strokeWidth={2} dot={false} activeDot={{ strokeWidth: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsChart;
