import { USER_MAIN_DATA_MOCK, USER_ACTIVITY_MOCK, USER_AVERAGE_SESSIONS_MOCK, USER_PERFORMANCE_MOCK } from "./mockData";

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
  constructor(useMock = false) {
    this.useMock = useMock;
    this.apiBaseUrl = "http://localhost:5000";
  }

  async getData(dataType, userId) {
    if (!userId) {
      throw new Error("User ID is required to fetch data.");
    }

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
  
    const data = dataArray.find((item) => item.userId === Number(userId) || item.id === Number(userId));
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
        switch (response.status) {
          case 404:
            throw new Error("L'utilisateur avec cet identifiant est introuvable.");
          case 500:
            throw new Error("Erreur interne du serveur. Veuillez réessayer plus tard.");
          default:
            throw new Error(`Erreur inattendue : ${response.status}`);
        }
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      if (error.message === "Failed to fetch" || error.message.includes("ERR_CONNECTION_REFUSED")) {
        throw new Error("L'API n'est actuellement pas disponible. Veuillez réessayer plus tard.");
      }
      throw error;
    }
  }
  
  async getUserMainData(userId) {
    return this.getData("mainData", userId);
  }

  async getUserActivity(userId) {
    return this.getData("activity", userId);
  }

  async getUserAverageSessions(userId) {
    return this.getData("averageSessions", userId);
  }

  async getUserPerformance(userId) {
    return this.getData("performance", userId);
  }
}

export default DataSource;
