import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Div = styled.section`
  padding: 15px;
  width: 100%;
  background: #393e46;
  img {
    height: 40px;
  }
  h1 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  svg {
    color: #fff;
  }
`;

function Header({ pageProps }) {
  return (
    <Div className="header">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <img src="/img/favicon.ico" alt="Logo" />
        <Typography variant="h1">{pageProps?.page_title}</Typography>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Div>
  );
}

export default Header;
