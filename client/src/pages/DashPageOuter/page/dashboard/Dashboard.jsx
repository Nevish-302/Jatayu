import React from "react";
import {Sessions} from './data'
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

const DashboardO = () => {
  console.log(Sessions)
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
      field: "access",
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

            <Typography sx={{ fontSize: "13px", color: "#000  " }}>
              {_id}
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
          rows={Sessions}
          // @ts-ignore
          columns={columns}
        />
      </Box>
</Stack>
    </div>
  );
};

export default DashboardO;
