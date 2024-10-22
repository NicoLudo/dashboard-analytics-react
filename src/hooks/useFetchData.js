import { useState, useEffect } from "react";
import DataSource from "../dataSource";

const useFetchData = (userId, dataType = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataSource = new DataSource();
      try {
        let result = null;
        switch (dataType) {
          case "mainData":
            result = await dataSource.getUserMainData(userId);
            break;
          case "activity":
            result = await dataSource.getUserActivity(userId);
            break;
          case "averageSessions":
            result = await dataSource.getUserAverageSessions(userId);
            break;
          case "performance":
            result = await dataSource.getUserPerformance(userId);
            break;
          default:
            throw new Error("Type de donnée invalide");
        }
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, dataType]);

  return { data, loading, error };
};

export default useFetchData;
