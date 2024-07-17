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

const Team = () => {
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const theme = useTheme();
  const [teams, setTeams] = useState([])

  const getTeams = async (values) =>{
    //e.preventDefault()
    let Id=cookies.get('_id')
    let OS = 0
    console.log("Lemme Make Some sessions")
    const res = await fetch(`${baseurl}/organisation/getTeams`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        Id,OS
      })
      //credentials: 'include', //for jwt 
    });
    const jack = await res.json()
    //setCook(jack);
    console.log(jack, "jack")
    let hmm = 0
    setTeams(jack.data.team.map((session)=>{hmm += 1;return {...session, id : hmm}}))
    console.log(teams)
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  }
  useEffect(()=>{getTeams();console.log(teams, "oh Baby")}, [0])
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      align: "center",
      width:200,
      headerAlign: "center",
    },
    {
      field: "Organisation",
      headerName: "organisation",
      width:200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "teamMembers",
      headerName: "Member(s)",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { teamMembers } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",

              backgroundColor: "none",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "#000" }}>
            {teamMembers.length}{console.log(teamMembers.length)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "resources",
      headerName: "Resource(s)",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { resources } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",

              backgroundColor: "none",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "#000" }}>
            {resources.length}{console.log(resources.length)}
            </Typography>
          </Box>
        );
      },
    },
   
    {
      field: "requests",
      headerName: "Request(s)",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { requests } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",

              backgroundColor: "none",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "#000" }}>
            {requests.length}{console.log(requests.length)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",

              backgroundColor:
                   "#3da58a",
            }}
          >
          

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
active            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} className="w-full">
      <Header title={"TEAM"} subTitle={"Managing the Team Members"} />
      <Button
            sx={{ padding: "6px 8px", textTransform: "capitalize" }}
            variant="contained"
            color="primary"
          >
        <AddIcon />
          Add Team(s)
          </Button>      
</Stack>
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={teams}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;