import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useDropzone } from "react-dropzone";
import { objectToFormDate } from "object-to-formdata";

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

const ImageAltText = () => {
  const headers = {
    "JSESSION-ID":
      "3FCAE69246C4EF4C324AF55D171144DE32216E4301FA6AC2F3C4865EC3FA64F2",
    "Tenant-URL": "https://mbx-staging.getmagicbox.com",
  };
  const [files, setFiles] = useState();
  const [result, setResult] = useState();
  const [fileUrl, setFileUrl] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/webp": [],
      "image/gif": [],
      "image/png": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFileUrl(acceptedFiles);
      setFiles(
        acceptedFiles.map((files) =>
          Object.assign(files, {
            preview: URL.createObjectURL(files),
          })
        )
      );
    },
  });

  console.log(fileUrl);

  return (
    <Div>
      <Box display="flex" alignItems="center" mb={2}>
        <InfoOutlinedIcon fontSize="12px" />
        <Typography ml={1} fontSize={14}>
          Generate alt text for any images in a few clicks with this simple and
          effective tool!
        </Typography>
      </Box>
      <Box className="conetnt-boxin" mt={2}>
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  img_url: "",
                  tenant_id: 1,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log(fileUrl);
                  if (fileUrl) {
                    values.img_url = fileUrl;
                    setSubmitting(true);
                    console.log(values);
                    try {
                      const formData = objectToFormDate(values);
                      const { data } = await axios.post(
                        "https://kea-ml-staging.getmagicbox.com/ImgtoText",
                        formData,
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
                  } else {
                    alert("Please Upload Image");
                  }
                }}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  resetForm,
                  values,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box minHeight="30vh">
                      {!files && (
                        <Box
                          p={2}
                          minHeight="30vh"
                          sx={{ cursor: "pointer" }}
                          {...getRootProps()}
                          className={isDragActive ? "dropboxactive" : "dropbox"}
                        >
                          <input
                            name="img_url"
                            {...getInputProps()}
                            required
                            onChange={(e) => {
                              setFieldValue(
                                "img_url",
                                e.currentTarget.files[0]
                              );
                            }}
                          />
                          <Typography>
                            Drag or Upload your own images
                          </Typography>{" "}
                          <Box display="flex" justifyContent="center" mt={5}>
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
                          </Box>
                        </Box>
                      )}
                      {files && (
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
                              src={URL.createObjectURL(files[0])}
                              alt={files[0].name}
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
                              {files[0].name}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                setFiles(null);
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
                        <Box></Box>
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
                            Generate
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

export default ImageAltText;
