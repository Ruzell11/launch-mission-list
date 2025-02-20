export const fetchLaunchesMission = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v3/launches");
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching SpaceX data:", error);
      throw error;
    }
  };
  