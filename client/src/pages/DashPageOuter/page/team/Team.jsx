import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { useState,useEffect } from "react";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import baseurl from '../../../../components/baseurl.jsx'
import Cookies from 'universal-cookie';

const TeamO = () => {
  const [team,setTeam]=useState([])
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const theme = useTheme();
  console.log("I don't like my team")
  // field ==> Reqird
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 33,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: "ID",
      width: 410,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "access",
      headerName: "Member(s)",
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
            
            

            <Typography sx={{ fontSize: "13px", color: "black" }}>
              {teamMembers.length}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: "resources",
      headerName: "resources",
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

              backgroundColor: "blue",
            }}
          > 
            
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {resources.length}
            </Typography>
          </Box> 
        );
      }
    },
    {
      field: "requests",
      headerName: "requests",
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

              backgroundColor: "blue",
            }}
          >
            

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {requests.length}
            </Typography>
          </Box>
        );
      },

    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { status } }) => {
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
                status === 0
                  ? "green"
                  : "red",
            }}
          >

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              Active
            </Typography>
          </Box>
        );
      },
    
    },
  ];

  const getteams = async (values) =>{
    //e.preventDefault()
    console.log("Lemme Make Some teams")
    const res = await fetch(`${baseurl}/organisation/teams/byOrganisation/${cookies.get('_id')}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      //credentials: 'include', //for jwt 
    });
    const jack = await res.json()
    //setCook(jack);
    console.log(jack)
    let hmm = 0
    setTeam(jack.map((team)=>{hmm += 1;return {...team, id : hmm}}))
    console.log(team)
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  }

  useEffect(()=>{getteams();console.log(team, "oh Baby")}, [0])
  //getsessions();


  return (
    <Box>
      <Header title={"TEAM"} subTitle={"Managing the Teams"} />
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={team}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default TeamO;
