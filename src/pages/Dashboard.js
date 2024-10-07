import React from "react";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";

import AverageSessionsChart from "../components/AverageSessionsChart";
import DailyActivityChart from "../components/DailyActivityChart";
import PerformanceRadarChart from "../components/PerformanceRadarChart";
import ScoreChart from "../components/ScoreChart";
import NutritionCards from "../components/NutritionCards/NutritionCards";

const Dashboard = () => {
  const { userId } = useParams();
  const user = useFetchData((dataSource) => dataSource.getUserMainData(userId), userId);

  if (!user) {
    return <p>Aucun utilisateur trouvé avec cet identifiant.</p>;
  }

  const { firstName } = user.userInfos;

  return (
    <>
      <section id="dashboard__top-section">
        <h1 className="dashboard__title">Bonjour <span>{firstName}</span></h1>
        <p className="dashboard__subtitle">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
      <section id="dashboard__bottom-section">
        <div className="dashboard__chart-daily-activity"><DailyActivityChart userId={userId} /></div>
        <div className="dashboard__nutrition-cards"><NutritionCards userId={userId} /></div>
        <div>
          <div className="chart dashboard__chart-average-sessions"><AverageSessionsChart userId={userId} /></div>
          <div className="chart dashboard__chart-radar"><PerformanceRadarChart userId={userId} /></div>
          <div className="chart dashboard__chart-score"><ScoreChart userId={userId} /></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
