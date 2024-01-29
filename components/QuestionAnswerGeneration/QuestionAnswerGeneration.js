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
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import Select from "@mui/material/Select";

const QuestionAnswerGeneration = () => {
  const headers = {
    "JSESSION-ID":
      "3B38CD831E51238A47A12268079536562350DAA78B052D481D9394042DA6FEFD",
    "Tenant-URL": "https://mbx-staging.getmagicbox.com",
  };

  const [userSelect, setUserSelect] = useState("single choice");
  const [questionCount, setQuestionCount] = useState(2);
  const [fileUrl, setFileUrl] = useState(null);
  const [radioValue, setRadioValue] = useState("with answer");
  const [result, setResult] = useState();

  const handleRadio = (event) => {
    setRadioValue(event.target.value);
  };

  const handleSelectChange = (event) => {
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
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          AI technology that automatically generates questions and answers
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  // upload_file: "",
                  text: "",
                  question_type: userSelect,
                  answer_type: radioValue,
                  num_questions: questionCount || 1,
                  tenant_id: 1,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  values.answer_type = radioValue;
                  values.num_questions = questionCount || 1;
                  values.question_type = userSelect;

                  console.log(values);
                  try {
                    const { data } = await axios.post(
                      "https://kea-ml-staging.getmagicbox.com/GenerateQA",
                      values,
                      { headers }
                    );
                    setResult(data?.response);
                    console.log(data);
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
                  setFieldValue,
                  handleChange,
                  resetForm,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box minHeight="20vh">
                      {!fileUrl && (
                        <Box className="textarea-box" p={2}>
                          <Typography variant="h3" className="textarea-heading">
                            Description box for question generation
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder={`Enter or paste your text and press "Generate Questions"`}
                            value={values.text}
                            required
                            name="text"
                            onChange={handleChange}
                            multiline
                            rows={15}
                            inputProps={{ maxLength: 3000 }}
                            sx={{ border: 0, outline: "none" }}
                          />
                        </Box>
                      )}
                      {fileUrl && (
                        <Box p={1}>
                          <Box className="upload-preview-box">
                            <img src={fileUrl} alt="image" />
                            <Typography>{values.upload_file.name}</Typography>
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
                    <Box px={2} py={1}>
                      <Grid container spacing={2}>
                        <Grid item md={5}>
                          <Typography className="textarea-heading">
                            Question generation settings
                          </Typography>
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={radioValue}
                              row
                              onChange={handleRadio}
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                value="with answer"
                                control={<Radio />}
                                label="With Answer"
                              />
                              <FormControlLabel
                                value="without answer"
                                control={<Radio />}
                                label="Without Answer"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item md={3}>
                          <Typography className="textarea-heading">
                            Number of Questions
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            className="count-btn-box"
                          >
                            <RemoveCircleRoundedIcon
                              onClick={() =>
                                setQuestionCount(questionCount - 1)
                              }
                            />
                            <Box mx={2}>
                              <TextField
                                id="outlined-basic"
                                size="small"
                                sx={{ maxWidth: "50px" }}
                                variant="outlined"
                                readOnly
                                onChange={handleQuestionCount}
                                value={questionCount}
                              />
                            </Box>
                            <AddCircleRoundedIcon
                              onClick={() =>
                                setQuestionCount(questionCount + 1)
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid item md={3} sm={4}>
                          <Typography className="textarea-heading" mb={1}>
                            Type of question to be generated
                          </Typography>
                          <FormControl fullWidth className="sidebar-select">
                            <InputLabel id="demo-simple-select-label">
                              Select Choice
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              value={userSelect}
                              label="Select Choice"
                              size="small"
                              onChange={handleSelectChange}
                            >
                              <MenuItem value="single choice">
                                Single Choice
                              </MenuItem>
                              <MenuItem value="multiple choice">
                                Multiple Choice
                              </MenuItem>
                              <MenuItem value="fill in the blank">
                                Fill in the blank
                              </MenuItem>
                              <MenuItem value="true/false">True/False</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box p={2} className="border-bottom">
                      <Box display="flex" justifyContent="space-between">
                        {values?.text?.length > 0 ? (
                          <Typography fontSize={12}>
                            {values?.text?.length}/3000 Characters
                          </Typography>
                        ) : (
                          <Box>
                            {/* <input
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
                                className="upload-btn"
                              >
                                Upload File
                              </Button>
                            </label> */}
                          </Box>
                        )}
                        <Box>
                          <Button
                            variant="outlined"
                            className="reset-btn"
                            onClick={() => {
                              resetForm();
                              setFieldValue("upload_file", "");
                              setFileUrl(null);
                              setResult(null);
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            variant="filled"
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
              <Box p={2}>
                <Box minHeight="25vh" className="result-box">
                  {result && result ? (
                    <>
                      <Typography mb={2} fontWeight={600}>
                        AI generated result
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: result.replaceAll("\n", "</br>"),
                        }}
                      />
                    </>
                  ) : (
                    <Typography className="placeholder-text">
                      AI generated result will appear here
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionAnswerGeneration;
