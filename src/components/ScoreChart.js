import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";

const ScoreChart = () => {
  const { userId } = useParams();
  const { data: userData, loading, error } = useFetchData(userId, "mainData");

  if (loading) return <p aria-live="polite">Chargement des données...</p>;
  if (error) return <p aria-live="assertive">{error}</p>;
  if (!userData) return <p>Les données utilisateur sont indisponibles.</p>;

  const score = userData.todayScore || userData.score;

  const data = [
    {
      name: "Score",
      value: score * 100,
      fill: "red",
    }
  ];

  return (
    <div className="score-chart">
      <h2 className="score-chart__title">Score</h2>
      <ResponsiveContainer>
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={15} data={data} startAngle={90} endAngle={450}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background dataKey="value" />
          <text x="50%" y="55%" textAnchor="middle" className="score-chart__progress-label">{`${(score * 100).toFixed(0)}%`}</text>
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="score-chart__progress-text">de votre objectif</p>
    </div>
  );
};

export default ScoreChart;
