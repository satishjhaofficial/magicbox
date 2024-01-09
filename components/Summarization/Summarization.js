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
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

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

const Summarization = () => {
  const [fileUrl, setFileUrl] = useState(null);

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
          Summarize any text with ease.
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
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
                    <Box minHeight="30vh">
                      {!fileUrl && (
                        <TextField
                          id="outlined-basic"
                          className="no-border textarea-box"
                          fullWidth
                          variant="outlined"
                          placeholder={`Enter or paste your text and press “Submit”`}
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
                              maxWidth={150}
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
                            Submit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid item xs={12}>
              <Box minHeight="30vh" p={2}>
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

export default Summarization;
