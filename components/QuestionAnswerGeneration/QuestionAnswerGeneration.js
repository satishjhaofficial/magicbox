import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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

const QuestionAnswerGeneration = () => {
  const [userSelect, setUserSelect] = useState("");
  const [questionCount, setQuestionCount] = useState("02");
  const [questionValue, setQuestionValue] = useState("");

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
  return (
    <Div>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          Question and answer generator is a type of artificial intelligence
          technology that can generate questions and answers automatically{" "}
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
            <Grid item md={6}>
              <Box borderRight="1px solid #8f8f8f">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                  placeholder={`Enter or paste your text and press "Generate Questions"`}
                  onChange={handleQuestionCount}
                  value={questionValue}
                  multiline
                  rows={20}
                  sx={{ border: 0, outline: "none" }}
                />
              </Box>
              <Box p={2}>
                <Button
                  startIcon={<FileUploadOutlinedIcon />}
                  variant="outlined"
                  sx={{
                    color: "#8f8f8f",
                    border: "1px solid #8f8f8f",
                    borderRadius: "30px",
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Div>
  );
};

export default QuestionAnswerGeneration;
