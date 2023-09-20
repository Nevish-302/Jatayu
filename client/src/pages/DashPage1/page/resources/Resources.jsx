import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material";
import { Box, Typography, Stack } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import Cookies from "universal-cookie";
import baseurl from "../../../../components/baseurl.jsx";
import socket from "../../../../socket";

const Resources = () => {
  const [inputValue, setInputValue] = useState("");

  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const theme = useTheme();
  const [resources, setResources] = useState([]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const inputStyle = {
    backgroundColor: "white",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "300px", // Adjust the width as needed
  };

  const getRequests = async (values) => {
    //e.preventDefault()
    let sessionId = cookies.get("SessionId");

    console.log("Lemme Make Some sessions");
    const res = await fetch(
      `${baseurl}/organisation/getOrganisation/${cookies.get("_id")}`,
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
    console.log(jack, "jack", jack.data);
    let hmm = 0;
    setResources(
      jack.data.doc.resources.map((session) => {
        hmm += 1;
        return { ...session, id: hmm };
      })
    );
    console.log(
      resources,
      "gghgj",
      jack.data.doc.resources.map((session) => {
        hmm += 1;
        return { ...session, id: hmm };
      })
    );
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  };
  console.log(resources);
  useEffect(() => {
    getRequests();
  }, [0]);
  useEffect(() => {
    getRequests();
    console.log(requests, "oh Baby");
  }, [0]);
  socket.on("receive-resource", (req) => {
    getRequests();
    console.log(req, "Hello");
  });

  const columns = [
    {
      field: "type",
      headerName: "Type",
      align: "center",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "number",
      headerName: "Number",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "senderId",
      headerName: "Sender ID",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: () => {
        return (
          <input
            type="text"
            style={inputStyle}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter something"
          />
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="w-full"
      >
        <Header title={"Notifications"} subTitle={"Real Time Updates"} />
        <Button
          sx={{ padding: "6px 8px", textTransform: "capitalize" }}
          variant="contained"
          color="primary"
        >
          <AddIcon />
          Send Notification
        </Button>
      </Stack>
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={resources}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Resources;
