import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";

const TeamO = () => {
  
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
      field: "access",
      headerName: "Member(s)",
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
            
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {access}
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
            
              <AdminPanelSettingsOutlined
                sx={{ color: "#fff" }}
                fontSize="small"
              />

            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {access}
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
              {requests}
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
    <Box>
      <Header title={"TEAM"} subTitle={"Managing the Teams"} />
      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={rows}
          // @ts-ignore
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default TeamO;
