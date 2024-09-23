import React from 'react';
import useFetchData from '../hooks/useFetchData';
import AverageSessionsChart from '../components/AverageSessionsChart';
import PerformanceRadarChart from '../components/PerformanceRadarChart';
import ScoreChart from '../components/ScoreChart';

const Dashboard = () => {
  const user = useFetchData((dataSource) => dataSource.getUserMainData());

  if (!user) {
    return <div>Chargement...</div>;
  }
  
  const { firstName } = user.userInfos;

  return (
    <>
      <section id="dashboard__top-section">
        <h1 id="dashboard__title">Bonjour <span>{firstName}</span></h1>
        <p id="dashboard__subtitle">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
      <section id="dashboard__bottom-section">
        <div className="dashboard__chart-daily-activity"></div>
        <div>
          <div className="dashboard__chart-calories"></div>
          <div className="dashboard__chart-protein"></div>
          <div className="dashboard__chart-carbs"></div>
          <div className="dashboard__chart-fat"></div>
        </div>
        <div>
          <div className="chart dashboard__chart-average-sessions"><AverageSessionsChart /></div>
          <div className="chart dashboard__chart-radar"><PerformanceRadarChart /></div>
          <div className="chart dashboard__chart-score"><ScoreChart /></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
