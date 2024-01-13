import styled from "@emotion/styled";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

const Div = styled.section`
  padding: 100px 0;
  h1 {
    font-size: 70px;
    font-weight: 500;
    color: #000;
  }
  h2 {
    font-size: 40px;
    font-weight: 400;
    color: #000ff0;
    margin: 0 0 10px;
  }
  a {
    text-decoration: underline;
    font-weight: 400;
    font-size: 24px;
    color: #000;
  }
  img {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    padding: 50px 0;
     h2 {
      50px;
    }
    h2 {
      30px;
    }
  }
`;

export default function NotFound() {
  return (
    <>
      <Div className="404-page">
        <Container>
          <Box className="privacy-page-in" textAlign="center">
            <Typography variant="h1">404</Typography>
            <Typography variant="h2">404 - Page Not Found</Typography>
            <Link href="/">Go to Home Page</Link>
          </Box>
        </Container>
      </Div>
    </>
  );
}
