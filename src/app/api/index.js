const axios = require("axios");

const headers = {
  "JSESSION-ID": `${sessionStorage.getItem("JSESSIONID")}`,
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
