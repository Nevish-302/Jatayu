import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Pie from "../../page/pieChart/pie";
import React from "react";
import Bar from "../../page/barChart/bar";
import Geo from "../../page/geography/geo";

const Row3 = () => {
  const theme = useTheme();
  const backgroundGradient =
    theme.palette.mode === "dark"
      ? "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)"
      : "none";
  return (
    <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>
      <Paper
        sx={{
          flexGrow: 1,
          minWidth: "400px",
          width: "28%",
          backgroundImage: backgroundGradient,
          padding: theme.spacing(2),
          borderRadius: theme.spacing(1), // Optional: Add border radius for rounded corners
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Optional: Add box shadow for depth
        }}
      >
        <Typography
          color="white"
          sx={{ padding: "30px 30px 0 30px" }}
          variant="h6"
          fontWeight="600"
        >
          Survivor Stats
        </Typography>

        <Pie isDashbord={true} />

        <Typography variant="h6" align="center" sx={{ mt: "15px" }}>
          48,352 survived
        </Typography>
        <Typography variant="body2" px={0.7} pb={3} align="center">
          243 casualties
        </Typography>
      </Paper>

      <Paper
        sx={{
          flexGrow: 1,
          minWidth: "400px",
          width: "33%",
          backgroundImage: backgroundGradient,
        }}
      >
        <Typography
          color="white"
          variant="h6"
          fontWeight="600"
          sx={{ padding: "30px 30px 0 30px" }}
        >
          Missing Reports onSite
        </Typography>

        <Bar isDashbord={true} />
      </Paper>
    </Stack>
  );
};

export default Row3;
