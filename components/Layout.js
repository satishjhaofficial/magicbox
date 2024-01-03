import React from "react";
import Sidebar from "./common/Sidebar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import Header from "./common/Header";

const Div = styled.div`
  .mainWrapper {
    margin-top: 70px;
    .mainWrapperIn {
    width: calc(100% - 300px);
  }
`;

const Layout = ({ children, pageProps }) => {
  const pathname = usePathname();
  return (
    <Div>
      {!pathname.includes("/login") && <Header pageProps={pageProps} />}
      <Box display="flex" className="mainWrapper">
        {!pathname.includes("/login") && <Sidebar />}

        <Box
          display="flex"
          flexDirection="column"
          sx={{
            padding: pathname.includes("/login") ? 0 : "20px 30px",
          }}
          flexGrow={1}
          className="mainWrapperIn"
        >
          {children}
        </Box>
      </Box>
    </Div>
  );
};

export default Layout;
