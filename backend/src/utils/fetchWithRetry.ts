import axios, { AxiosError } from "axios";

const fetchWithRetry = async (
  url: string,
  retries: number = 3,
  initialDelay: number = 1000,
  maxDelay: number = 10000
): Promise<any> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { timeout: 30000 });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status === 429 ||
          axiosError.response?.status === 503
        ) {
          const retryAfter = axiosError.response.headers["retry-after"];
          const waitTime = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : Math.min(initialDelay * Math.pow(2, i), maxDelay); // Exponential backoff with max delay
          console.log(
            `Rate limited. Retrying request in ${waitTime / 1000} seconds...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        } else {
          console.error("Error fetching data:", axiosError.message);
          throw error;
        }
      } else {
        console.error("Unexpected error:", error);
        throw error;
      }
    }
  }
  throw new Error("Max retries reached");
};

export default fetchWithRetry;
