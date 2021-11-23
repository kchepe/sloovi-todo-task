import axios from "axios";

const useApi = () => {
  const url = process.env.REACT_APP_URL;
  const token = process.env.REACT_APP_TOKEN;
  const companyId = process.env.REACT_APP_COMPANY_ID;
  const lead = process.env.REACT_APP_COMPANY_LEAD;
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const getAllTask = async () => {
    const res = await axiosInstance.get(
      `/task/${lead}?company_id=${companyId}`
    );
    try {
      return { hasError: false, data: res.data.results };
    } catch (err) {
      return { hasError: true, data: [] };
    }
  };
  return [getAllTask];
};

export default useApi;
