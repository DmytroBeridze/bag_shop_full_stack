import axios from "axios";

const useHttp = () => {
  const adminRequest = async (
    url,
    method = "get",
    body = null,
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    }
  ) => {
    // console.log(body);

    try {
      const adminResponse = await axios({
        method,
        url,
        data: body,
        headers,
      });

      if (adminResponse.status > 200) {
        // if (!adminResponse.status > 200) {
        throw new Error(
          `Could not fetch ${url}, status: ${adminResponse.status}`
        );
      }
      return adminResponse;
    } catch (error) {
      throw error;
    }
  };
  return { adminRequest };
};
export default useHttp;
