const axios = require("axios");

if (typeof window !== "undefined") {
  var token = sessionStorage.getItem("JSESSIONID");
}
const headers = {
  "JSESSION-ID": `${token}`,
  "Tenant-URL": `${process.env.NEXT_PUBLIC_TENANT_URL}`,
};

//Post Form Data
export const postQuestionAnswer = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}GenerateQA`, data, {
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

export const postImageAltText = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}ImgDescription`, data, {
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

export const postSummarization = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}getSummariation`, data, {
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

export const postSuggestiveKeywords = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}getKeywords`, data, {
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

export const postGradingAssistant = async (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}getGrading`, data, {
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
