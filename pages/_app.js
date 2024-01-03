import Layout from "../components/Layout";
import Head from "next/head";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

import "../src/app/globals.css";

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const [protectedRoute, setProtectedRoute] = useState(false);

  useEffect(() => {
    const authrole = parseInt(localStorage.getItem("mod_auth_role"));
    const isLogined = localStorage.getItem("mod_auth_login");
    const authPermission = JSON.parse(
      localStorage.getItem("mod_auth_permission")
    );
    if (isLogined !== "isLogined") {
      router.push("/login");
      setProtectedRoute(true);
    } else if (pathname === "/login") {
      setProtectedRoute(true);
    } else if (isLogined === "isLogined") {
      if (
        authPermission.includes(pathname.split("/").pop()) ||
        (authPermission.includes("purchase") && pathname === "/")
      ) {
        setProtectedRoute(true);
      } else {
        setProtectedRoute(false);
      }
    }

    console.log(authPermission, authrole, isLogined);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        html,
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Magic Box</title>
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
      </Head>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
