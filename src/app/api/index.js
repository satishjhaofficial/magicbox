const axios = require("axios");
import useSessionStorage from "./SessionId";

const Token = () => {
  const id = useSessionStorage("JSESSIONID");
  return id;
};

const headers = {
  "JSESSION-ID": `${Token}`,
  "Tenant-URL": `${process.env.NEXT_PUBLIC_TENANT_URL}`,
};

//Post Form Data
export const postQuestionAnswer = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}GenerateQA`, data, {
      headers,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
