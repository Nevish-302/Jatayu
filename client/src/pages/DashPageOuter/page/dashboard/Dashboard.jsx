import React from "react";
import {Sessions} from './data'
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useState , useEffect} from "react";
import AddIcon from '@mui/icons-material/Add';
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import baseurl from '../../../../components/baseurl.jsx'
import Cookies from 'universal-cookie';

const DashboardO = () => {
  const [session, setSession] = useState([{
    "id":1,
    "_id": "611f8a853e65520031b438e0",
    "initiatiorOrganisationId": "611f8a853e65520031b438e1",
    "organisations": ["611f8a853e65520031b438e2", "611f8a853e65520031b438e3"],
    "teams": ["611f8a853e65520031b438e4", "611f8a853e65520031b438e5"],
    "estimatedAffectees": 100,
    "location": {
      "long": "40.7128",
      "lat": "-74.0060",
      "radius": 50
    },
    "affectees": [
      {
        "survivors": 30,
        "casualties": 20,
        "injured": 10,
        "teamId": "611f8a853e65520031b438e6",
        "location": {
          "long": "40.7128",
          "lat": "-74.0060"
        }
      },
      {
        "survivors": 15,
        "casualties": 25,
        "injured": 5,
        "teamId": "611f8a853e65520031b438e7",
        "location": {
          "long": "40.7128",
          "lat": "-74.0060"
        }
      }
    ],
    "requests": ["611f8a853e65520031b438e8", "611f8a853e65520031b438e9"],
    "resources": [
      {
        "name": "Water",
        "quantity": "1000 liters",
        "organisationId": "611f8a853e65520031b438e2",
        "free": 500,
        "allocated": {
          "teamId": "611f8a853e65520031b438e4",
          "quantity": 250
        }
      },
      {
        "name": "Food",
        "quantity": "500 kg",
        "organisationId": "611f8a853e65520031b438e3",
        "free": 250,
        "allocated": {
          "teamId": "611f8a853e65520031b438e5",
          "quantity": 125
        }
      }
    ],
    "redZones": [
      {
        "long": "40.7128",
        "lat": "-74.0060",
        "severity": 5,
        "radius": 10
      },
      {
        "long": "40.730610",
        "lat": "-73.935242",
        "severity": 4,
        "radius": 15
      }
    ],
    "notifications": [
      {
        "senderId": "611f8a853e65520031b438ea",
        "message": "Emergency alert!",
        "at": "2023-09-17T00:00:00.000Z"
      },
      {
        "senderId": "611f8a853e65520031b438eb",
        "message": "Evacuation notice!",
        "at": "2023-09-17T00:00:00.000Z"
      }
    ],
    "status": true
  },]);
  const [cookieName, setCookieName] = useState();
  const [cookieValue, setCookieValue] = useState();
  const cookies = new Cookies();
console.log(baseurl)
console.log(session, "Hll")
  const handleSetCookie = () => {
    // Set a new cookie
    console.log("Hello")
    cookies.set(cookieName, cookieValue, { path: '/' });
  };
  //useEffect(()=> {
  //  cookies.set(cookieName, cookieValue, { path: '/' });
  //  }, [cookieName])
  const handleRemoveCookie = (name) => {
    // Remove a cookie
    cookies.remove(name, { path: '/' });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  
  const getsessions = async (values) =>{
    //e.preventDefault()
    console.log("Lemme Make Some sessions")
    const res = await fetch(`${baseurl}/organisation/sessions/byOrganisation/${cookies.get('_id')}`,{
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
    setSession(jack.data.sessions.map((session)=>{hmm += 1;return {...session, id : hmm}}))
    console.log(session)
    //res.status == 200 ? console.log("Success") : console.log("Failure")
  }
  const chooseSession = async(hell)=>{
    setCookieName('SessionId')
    setCookieValue(hell)
    cookies.set(cookieName, cookieValue, { path: '/' });
      console.log(hell)

  }
  
  useEffect(()=>{getsessions();console.log(session, "oh Baby")}, [0])
  //getsessions();



  console.log(cookies.get('token'))
  //console.log(Sessions)
  const theme = useTheme();
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
      headerName: "SessionID",
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

              backgroundColor: "fff",
            }}
          >
            
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />

            <Typography sx={{ fontSize: "13px", color: "#000  " }} >
              <div onClick={() => {chooseSession(_id)}}>
              {_id}
              </div>
            </Typography>
          </Box>
        );
      }
    },
    {
      field: "initiatiorOrganisationId",
      headerName: "First Responder",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { initiatiorOrganisationId } }) => {
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
            
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />

            <Typography sx={{ fontSize: "13px", color: "#000" }}>
              {initiatiorOrganisationId}
            </Typography>
          </Box> 
        );
      }
    },
    {
      field: "estimatedAffectees",
      headerName: "Affectees",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { estimatedAffectees } }) => {
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
              {estimatedAffectees}
            </Typography>
          </Box>
        );
      },

    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { estimatedAffectees } }) => {
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
            <ShareLocationIcon fontSize = "medium"/>
          </Box>
        );
      },

    },{
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
              View Logs
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
                status === true
                  ? "green"
                  : "red",
            }}
          >

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              Active
              {console.log(status)}
            </Typography>
          </Box>
        );
      },
    
    },
  ];
  return (
    <div>
<Stack direction={"column"} justifyContent={"space-between"} alignItems={"center"}>
<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} className="w-full">
        
        <Header
          isDashboard={true}
          title={"Sessions"}
          subTitle={"View History"}
        />
        <Box sx={{ textAlign: "right", mb: 1.3 }}>
          <Button
            sx={{ padding: "6px 8px", textTransform: "capitalize" }}
            variant="contained"
            color="primary"
          >
        <AddIcon />
          Add new Session
          </Button>
        </Box>
        </Stack>
        <Box className="w-full" sx={{ height: 700, mx: "auto" }}>
        <DataGrid
          rows={session}
          // @ts-ignore
          columns={columns}
        />
      </Box>
</Stack>
    </div>
  );
};

export default DashboardO;
