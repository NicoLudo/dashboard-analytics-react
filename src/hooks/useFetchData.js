import { useState, useEffect } from "react";
import DataSource from "../dataSource";

const useFetchData = (fetchFunction, userId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataSource = new DataSource();

    const fetchData = async () => {
      try {
        const result = await fetchFunction(dataSource, userId);
        setData(result);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [fetchFunction, userId]);

  return data;
};

export default useFetchData;
