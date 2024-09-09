import React from 'react';
import { USER_MAIN_DATA_MOCK } from '../mockData';
import AverageSessionsChart from '../components/AverageSessionsChart';

const Dashboard = () => {
  const user = USER_MAIN_DATA_MOCK.find(user => user.id === 12);

  const { firstName } = user.userInfos;

  return (
    <>
      <h1 id="dashboard-title">Bonjour {firstName}</h1>
      <AverageSessionsChart />
    </>
  );
};

export default Dashboard;
