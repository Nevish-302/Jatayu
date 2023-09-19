import React, { useState, useEffect } from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
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
  const getsessions = async (values) => {
    //e.preventDefault()
    console.log("Lemme Make Some sessions");
    const res = await fetch(
      `${baseurl}/organisation//sessions/${cookies.get("SessionId")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: 'include', //for jwt
      }
    );

    const jack = await res.json();
    //setCook(jack);
    //console.log(jack)
    //let hmm = 0
    //setSession(jack.data.sessions.map((session)=>{hmm += 1;return {...session, id : hmm}}))
    console.log(jack, "jack");
  };

  const getRequests = async (values) => {
    //e.preventDefault()
    let sessionId = cookies.get("SessionId");

    console.log("Lemme Make Some sessions");
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
        //credentials: 'include', //for jwt
      }
    );
    const jack = await res.json();
    //setCook(jack);
    console.log(jack, "jack", jack.data.data);
    let hmm = 0;
    //  setRequests(jack.data.data.map((session)=>{hmm += 1;return {...session, id : hmm}}))
    // console.log(requests)
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  };
  useEffect(() => {
    getsessions();
    getRequests();
    console.log(Session, "oh Baby");
  }, [0]);
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          isDashboard={true}
          title={"DASHBOARD"}
          subTitle={"Welcome to your dashboard"}
        />

        <Box sx={{ textAlign: "right", mb: 1.3 }}>
          <Button
            sx={{
              padding: "6px 8px",
              textTransform: "capitalize",
              backgroundColor: "#7C83FD", // Replace with your desired color code
              "&:hover": {
                backgroundColor: "#00BFFF", // Replace with the hover color code
              },
            }}
            variant="contained"
            color="primary"
            component={Link} // Use the Link component
            to="/meta" // Specify the target route
          >
            MetaMask Payment
          </Button>
        </Box>
      </Stack>

      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
};

export default Dashboard;
