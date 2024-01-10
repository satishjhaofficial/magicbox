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
      &.Mui-focused {
        transform: translate(14px, -9px) scale(0.75);
      }
    }
  }
`;

const GradingAssistant = () => {
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
          <Grid container>
            <Grid item xs={12}>
              <Box borderBottom="1px solid #BEBEBE" px={2} py={1}>
                <Typography>
                  Question : What is personalised Learning ?
                </Typography>
              </Box>
              <Formik
                initialValues={{
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
                      <TextField
                        id="outlined-basic"
                        className="no-border textarea-box"
                        fullWidth
                        variant="outlined"
                        placeholder={`Enter or paste your Answer`}
                        value={values.question}
                        required
                        name="question"
                        onChange={handleChange}
                        multiline
                        rows={20}
                        inputProps={{ maxLength: 3000 }}
                        sx={{ border: 0, outline: "none" }}
                      />
                    </Box>
                    <Box p={2} borderBottom="1px solid #8f8f8f">
                      <Box display="flex" justifyContent="space-between">
                        {values?.question?.length > 0 ? (
                          <Typography fontSize={12}>
                            {" "}
                            {values?.question?.length}/3000 Characters
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

export default GradingAssistant;
