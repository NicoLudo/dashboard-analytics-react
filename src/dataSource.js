import { USER_MAIN_DATA_MOCK, USER_ACTIVITY_MOCK, USER_AVERAGE_SESSIONS_MOCK, USER_PERFORMANCE_MOCK } from './mockData';

const mockDataMap = {
  mainData: USER_MAIN_DATA_MOCK,
  activity: USER_ACTIVITY_MOCK,
  averageSessions: USER_AVERAGE_SESSIONS_MOCK,
  performance: USER_PERFORMANCE_MOCK,
};

const apiEndpoints = {
  mainData: (userId) => `/user/${userId}`,
  activity: (userId) => `/user/${userId}/activity`,
  averageSessions: (userId) => `/user/${userId}/average-sessions`,
  performance: (userId) => `/user/${userId}/performance`,
};

class DataSource {
  constructor(useMock = true) {
    this.useMock = useMock;
    this.apiBaseUrl = 'http://localhost:5000';
  }

  async getData(dataType) {
    const userId = 12;
    if (this.useMock) {
      return this.getMockData(dataType, userId);
    } else {
      return this.getApiData(dataType, userId);
    }
  }

  getMockData(dataType, userId) {
    const dataArray = mockDataMap[dataType];
    if (!dataArray) {
      throw new Error(`Invalid data type: ${dataType}`);
    }

    const data = dataArray.find((item) => item.userId === userId || item.id === userId);
    if (!data) {
      throw new Error(`No data found for the user with ID ${userId}`);
    }
    return data;
  }

  async getApiData(dataType, userId) {
    const endpointFn = apiEndpoints[dataType];
    if (!endpointFn) {
      throw new Error(`Invalid data type: ${dataType}`);
    }

    const endpoint = endpointFn(userId);
    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();      
      return data.data;
    } catch (error) {
      console.error(`Error while fetching '${dataType}' user data from the API:`, error);
      throw error;
    }
  }

  async getUserMainData() {
    return this.getData('mainData');
  }

  async getUserActivity() {
    return this.getData('activity');
  }

  async getUserAverageSessions() {
    return this.getData('averageSessions');
  }

  async getUserPerformance() {
    return this.getData('performance');
  }
}

export default DataSource;