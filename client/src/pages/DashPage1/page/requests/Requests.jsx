import React, {useState, useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@mui/material";
import { Box, Typography, Stack } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import Cookies from 'universal-cookie';
import baseurl from '../../../../components/baseurl.jsx'
import socket from "../../../../socket"

const RequestsSession = () => {
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const theme = useTheme();
  const [requests, setRequests] = useState([])

  const getRequests = async (values) =>{
    //e.preventDefault()
    let sessionId=cookies.get('SessionId')

    console.log("Lemme Make Some sessions")
    const res = await fetch(`${baseurl}/organisation/getAllRequestsBySession/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        sessionId
      })
      //credentials: 'include', //for jwt 
    });
    const jack = await res.json()
    //setCook(jack);
    //console.log(jack, "jack", jack.data.data)
    let hmm = 0
    setRequests(jack.data.data.map((session)=>{hmm += 1;return {...session, id : hmm}}))
    //console.log(requests)
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  }
  useEffect(()=>{getRequests();console.log(requests, "oh Baby")}, [0])
  socket.on('receive-request', (req)=>{
      getRequests();
      console.log(req, "Hello")
  })
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      align: "center",
      width:300,
      headerAlign: "center",
    },
    {
      field: "message",
      headerName: "Message",
      width:200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "senderId",
      headerName: "Sender ID",
      width:300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "createdAt",
      headerName: "Date",
      width:300,
      align: "center",
      headerAlign: "center",
      renderCell: ({row: {createdAt}}) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor :"none"}}
          >
            
            <Typography sx={{ fontSize: "13px", color: "#000" }}>
              {createdAt.split('T')[0]}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "estimatedAffectees",
      headerName: "Estimated Casualities",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({row: {status}}) => {  
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor      : 
              status === "pending"? "red":"#3da58a",
            }}
          >
            
            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} className="w-full">
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
          rows={requests}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default RequestsSession;
