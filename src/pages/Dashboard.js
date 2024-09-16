import React from 'react';
import useFetchData from '../hooks/useFetchData';
import AverageSessionsChart from '../components/AverageSessionsChart';

const Dashboard = () => {
  const user = useFetchData((dataSource) => dataSource.getUserMainData());

  if (!user) {
    return <div>Chargement...</div>;
  }
  
  const { firstName } = user.userInfos;

  return (
    <>
      <h1 id="dashboard-title">Bonjour {firstName}</h1>
      <AverageSessionsChart />
    </>
  );
};

export default Dashboard;
