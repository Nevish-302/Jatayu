import React, {useState, useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import Cookies from 'universal-cookie';
import baseurl from '../../../../components/baseurl.jsx'
const Organisations = () => {
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
  const [organisations, setOrganisations] = useState([])
  
  const getOrganisations = async (values) =>{
    //e.preventDefault()
    let _id=cookies.get('SessionId')
    
    console.log("Lemme Make Some sessions")
    const res = await fetch(`${baseurl}/organisation/getAllOrganisationsBySession`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        _id
      })
      //credentials: 'include', //for jwt 
    });
    const jack = await res.json()
    //setCook(jack);
    console.log(jack, "jack")
    let hmm = 0
    setOrganisations(jack.data.organisations.map((session)=>{hmm += 1;return {_id : session,  id : hmm}}))
    //console.log()
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  }
  useEffect(()=>{getOrganisations();console.log( "oh Baby", organisations)}, [0])
  console.log( "oh Baby", organisations)

  const theme = useTheme();
  console.log("I don't like my Organisatio")
  // field ==> Reqird
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { _id } }) => {
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
            {_id}{console.log(_id)}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: "type",
      headerName: "Type",
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
                status === 0
                  ? "green"
                  : "red",
            }}
          > 

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              Fire
            </Typography>
          </Box> 
        );
      }
    },{
      field: "resources",
      headerName: "Teams",
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

              backgroundColor: "blue",
            }}
          > 

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              View
            </Typography>
          </Box> 
        );
      }
    },
    {
      field: "requests",
      headerName: "Notifications",
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
              View Log
            </Typography>
          </Box>
        );
      },

    },
    {
      field: "status",
      headerName: "Contact",
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
              Messge
            </Typography>
          </Box>
        );
      },
    
    },
  ];

  return (
    <Box>
<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} className="w-full">
      <Header title={"Organisations"} subTitle={"Managing Organisations"} />
      <Button
            sx={{ padding: "6px 8px", textTransform: "capitalize" }}
            variant="contained"
            color="primary"
          >
        <AddIcon />
          Add new Organisation
          </Button>      
</Stack>
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={organisations}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Organisations;
