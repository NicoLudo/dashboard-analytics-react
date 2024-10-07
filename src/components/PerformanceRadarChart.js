import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";

const PerformanceRadarChart = () => {
  const { userId } = useParams();
  const performanceData = useFetchData((dataSource) => dataSource.getUserPerformance(userId), userId);

  if (!performanceData) {
    return <div>Chargement des performances...</div>;
  }

  const customKindLabels = {
    1: "Cardio",
    2: "Énergie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité"
  };

  const data = performanceData.data.map((item) => ({
    ...item,
    kind: customKindLabels[item.kind],
  }));

  return (
    <div className="chart performance-radar-chart">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" tick={{ fill: "white" }} />
          <Radar dataKey="value" stroke="red" fill="red" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceRadarChart;
