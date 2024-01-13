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
      &.MuiInputLabel-shrink {
        transform: translate(14px, -9px) scale(0.75);
      }
    }
  }
`;

const QuestionAnswerGeneration = () => {
  const [userSelect, setUserSelect] = useState("");
  const [questionCount, setQuestionCount] = useState("02");
  const [fileUrl, setFileUrl] = useState(null);

  const handleChange = (event) => {
    setUserSelect(event.target.value);
  };

  const handleQuestionCount = (event) => {
    setQuestionCount(event.target.value);
  };

  useEffect(() => {
    document.body.classList.add("home");
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  console.log(fileUrl);

  return (
    <Div>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          AI technology that automatically generates questions and answers
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box px={2} py={1} borderBottom="1px solid #8f8f8f">
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Box display="flex" alignItems="center">
                <Typography whiteSpace="nowrap" mr={1}>
                  Type of Question:{" "}
                </Typography>
                <FormControl fullWidth className="sidebar-select">
                  <InputLabel id="demo-simple-select-label">
                    Select Choice
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSelect}
                    label="Select Choice"
                    size="small"
                    onChange={handleChange}
                  >
                    <MenuItem value="all_users">Single Choice</MenuItem>
                    <MenuItem value={20}>Multiple Choice</MenuItem>
                    <MenuItem value={30}>Fill in the blank</MenuItem>
                    <MenuItem value={30}>True/False</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box display="flex" alignItems="center">
                <Typography whiteSpace="nowrap" mr={1}>
                  Number of Question:{" "}
                </Typography>

                <TextField
                  id="outlined-basic"
                  size="small"
                  sx={{ maxWidth: "50px" }}
                  variant="outlined"
                  onChange={handleQuestionCount}
                  value={questionCount}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  upload_file: "",
                  question: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  handleChange,
                  resetForm,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box minHeight="25vh">
                      {!fileUrl && (
                        <TextField
                          id="outlined-basic"
                          className="no-border textarea-box"
                          fullWidth
                          variant="outlined"
                          placeholder={`Enter or paste your text and press "Generate Questions"`}
                          value={values.question}
                          required
                          name="question"
                          onChange={handleChange}
                          multiline
                          rows={20}
                          inputProps={{ maxLength: 3000 }}
                          sx={{ border: 0, outline: "none" }}
                        />
                      )}
                      {fileUrl && (
                        <Box p={1}>
                          <Box
                            mr={1}
                            display="inline-flex"
                            alignItems="center"
                            sx={{
                              borderRadius: "5px",
                              border: "1px solid #CCCACA",
                              background: "#fff",
                              padding: "5px",
                            }}
                          >
                            <img
                              src={fileUrl}
                              alt="image"
                              height="30px"
                              width="30px"
                            />
                            <Typography
                              maxWidth={200}
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              fontSize={12}
                              mx={1}
                            >
                              {values.upload_file.name}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                setFieldValue("upload_file", "");
                                setFileUrl(null);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box p={2} borderBottom="1px solid #8f8f8f">
                      <Box display="flex" justifyContent="space-between">
                        {values?.question?.length > 0 ? (
                          <Typography fontSize={12}>
                            {" "}
                            {values?.question?.length}/3000 Characters
                          </Typography>
                        ) : (
                          <Box>
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="upload-button-file"
                              name="upload_file"
                              type="file"
                              onChange={(e) => {
                                setFieldValue(
                                  "upload_file",
                                  e.currentTarget.files[0]
                                );
                                setFileUrl(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                            <label htmlFor="upload-button-file">
                              <Button
                                startIcon={<FileUploadOutlinedIcon />}
                                variant="outlined"
                                component="span"
                                sx={{
                                  color: "#565656",
                                  border: "1px solid #565656",
                                  borderRadius: "30px",
                                  textTransform: "capitalize",
                                  outline: "none",
                                }}
                              >
                                Upload File
                              </Button>
                            </label>
                          </Box>
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
                              setFieldValue("upload_file", "");
                              setFileUrl(null);
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
                            Generate Questions
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid item xs={12}>
              <Box minHeight="25vh" p={2}>
                <Typography color="#a1a1a1">
                  AI generated result will appear here
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Div>
  );
};

export default QuestionAnswerGeneration;
