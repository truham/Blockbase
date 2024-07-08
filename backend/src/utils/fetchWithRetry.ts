import axios from "axios";

const fetchWithRetry = async (
  url: string,
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : delay * Math.pow(2, i); // Exponential backoff
        console.log(`Retrying request in ${waitTime / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime)); // Wait before retrying
      } else {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  }
  throw new Error("Max retries reached");
};

export default fetchWithRetry;
