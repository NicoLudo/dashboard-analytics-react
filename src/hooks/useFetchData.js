import { useState, useEffect } from 'react';
import DataSource from '../dataSource';

const useFetchData = (fetchFunction) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataSource = new DataSource();

    const fetchData = async () => {
      try {
        const result = await fetchFunction(dataSource);
        setData(result);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return data;
};

export default useFetchData;
