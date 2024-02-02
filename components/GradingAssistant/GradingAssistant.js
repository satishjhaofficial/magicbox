import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Formik } from "formik";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Div = styled.div`
  .conetnt-boxin {
    display: block;
    border-radius: 8px;
    background: #f8f8f8;
  }
  .sidebar-select {
    label {
      transform: translate(14px, 8px);
      &.Mui-focused {
        transform: translate(14px, -9px) scale(0.75);
      }
    }
  }
`;

const GradingAssistant = () => {
  const headers = {
    "JSESSION-ID": `${sessionStorage.getItem("JSESSIONID")}`,
    "Tenant-URL": "https://mbx-staging.getmagicbox.com",
  };
  const [result, setResult] = useState([]);

  console.log(result);
  return (
    <Div>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          Get student responses to questions auto-graded by the AI tool.
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box>
          <Formik
            initialValues={{
              question: "What is personalised Learning ?",
              answer: "",
              tenant_id: 1,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              try {
                const { data } = await axios.post(
                  "https://kea-ml-staging.getmagicbox.com/getGrading",
                  values,
                  { headers }
                );
                setResult(data?.response);
                console.log(data);
                console.log(result);
              } catch (error) {
                console.log(error);
                if (error?.response?.status === 401) {
                  window.location.href =
                    "https://mbx-staging.getmagicbox.com/login.htm?tenant=Magic";
                } else {
                  alert(error?.response?.data?.response);
                }
              }
              setSubmitting(false);
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              handleChange,
              resetForm,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box borderBottom="1px solid #BEBEBE" px={2} py={2}>
                      <TextField
                        name="question"
                        label="question"
                        value={values.question}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ backgroundColor: "#fff" }}
                      />
                    </Box>

                    <Box minHeight="30vh" px={2} pt={2}>
                      <TextField
                        id="outlined-basic"
                        className="no-border textarea-box"
                        fullWidth
                        variant="outlined"
                        placeholder={`Enter or paste your Answer`}
                        value={values.answer}
                        required
                        name="answer"
                        onChange={handleChange}
                        multiline
                        rows={20}
                        inputProps={{ maxLength: 3000 }}
                        sx={{ border: 0, outline: "none" }}
                      />
                    </Box>
                    <Box p={2} borderBottom="1px solid #8f8f8f">
                      <Box display="flex" justifyContent="space-between">
                        {values?.answer?.length > 0 ? (
                          <Typography fontSize={12}>
                            {" "}
                            {values?.answer?.length}/3000 Characters
                          </Typography>
                        ) : (
                          <Box></Box>
                        )}
                        <Box>
                          <Button
                            variant="outlined"
                            sx={{
                              color: "#5c15e7",
                              border: "0 !important",
                              textTransform: "capitalize",
                              outline: "none",
                            }}
                            onClick={() => {
                              resetForm();
                              setResult(null);
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="filled"
                            sx={{
                              color: "#fff",
                              border: "1px solid #5c15e7",
                              background: "#5c15e7",
                              borderRadius: "30px",
                              textTransform: "capitalize",
                              outline: "none",
                            }}
                            className="blue-btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={2}>
                      <Box minHeight="25vh" className="result-box">
                        {result && result.length > 0 ? (
                          <>
                            <Typography mb={2} fontWeight={500}>
                              AI Generated Result
                            </Typography>
                            <Typography mb={1} fontWeight={600}>
                              1. {values.question}
                            </Typography>
                            <Typography mb={1}>
                              <span style={{ fontWeight: 600 }}>
                                Submitted Answer :
                              </span>{" "}
                              {values.answer}
                            </Typography>
                            <Box
                              display="inline-block"
                              p={1}
                              bgcolor="#fff"
                              mr={2}
                            >
                              Contextual Similarity :
                              <span style={{ fontWeight: 600 }}>
                                {result[3].replace(
                                  "Contextual Similarity:",
                                  ""
                                )}
                              </span>
                            </Box>
                            <Box
                              display="inline-block"
                              p={1}
                              bgcolor="#fff"
                              mr={2}
                            >
                              Spelling :
                              <span style={{ fontWeight: 600 }}>
                                {result[2].replace(
                                  "Percentage of Spelling mistakes:",
                                  ""
                                )}
                              </span>
                            </Box>
                            <Box
                              display="inline-block"
                              p={1}
                              bgcolor="#fff"
                              mr={2}
                            >
                              Grammer sentence structure :
                              <span style={{ fontWeight: 600 }}>
                                {result[1].replace("Grammar Score:", "")}
                              </span>
                            </Box>
                            <Typography mt={1}>
                              <span style={{ fontWeight: 600 }}>
                                Ideal Answer :
                              </span>{" "}
                              {result[0].replace("Ideal Answer:", "")}
                            </Typography>
                          </>
                        ) : (
                          <Typography color="#a1a1a1">
                            AI generated result will appear here
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Div>
  );
};

export default GradingAssistant;
