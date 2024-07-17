import React, { useState, useEffect } from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme, Container } from "@mui/material";
import baseurl from "../../../../components/baseurl";
import Header from "../../components/Header";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const theme = useTheme();
  const [Session, setSession] = useState({});

  const getsessions = async () => {
    try {
      const res = await fetch(
        `${baseurl}/organisation/sessions/${cookies.get("SessionId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jack = await res.json();
      console.log(jack);
      setSession(jack);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const getRequests = async () => {
    try {
      const sessionId = cookies.get("SessionId");
      const res = await fetch(
        `${baseurl}/organisation/getAllRequestsBySession/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
          }),
        }
      );
      const jack = await res.json();
      console.log(jack);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    getsessions();
    getRequests();
  }, []);

  return (
    <Container maxWidth="lg">
      <Row1 />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        mt={5}
      >
        <h1 className="text-xl" style={{ fontWeight: "bold" }}>
          Dashboard
        </h1>
        <Box textAlign="right">
          <Button
            sx={{
              padding: "6px 43px",
              textTransform: "capitalize",
              color: "white",
              backgroundColor: "#4763E4",
              borderRadius: "10px", // Increase border radius
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            variant="contained"
            color="primary"
            component={Link}
            to="/meta"
          >
            Payment
          </Button>
        </Box>
      </Stack>

      <Row2 />
      <Row3 />
    </Container>
  );
};

export default Dashboard;
