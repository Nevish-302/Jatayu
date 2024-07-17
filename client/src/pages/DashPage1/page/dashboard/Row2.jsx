import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Line from "../../page/lineChart/Line";
import React from "react";
import { DownloadOutlined } from "@mui/icons-material";
import { Transactions } from "./data";

const Row2 = () => {
  const theme = useTheme();
  const backgroundGradient =
    theme.palette.mode === "dark"
      ? "linear-gradient(126.97deg, rgba(1, 6, 26, 0.77) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)"
      : "none";

  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1.2} mt={1.3}>
      <Paper
        sx={{
          maxWidth: 900,
          flexGrow: 1,
          minWidth: "400px",
          backgroundImage:
            theme.palette.mode === "dark" ? backgroundGradient : "none",
          padding: theme.spacing(2),
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography
              color="white"
              mb={1}
              mt={2}
              ml={4}
              variant="h6"
              fontWeight={"bold"}
            >
              Victims Count
            </Typography>
            {/* <Typography variant="body2" ml={4}>
              Variation Statistics
            </Typography> */}
          </Box>

          <Box>
            <IconButton sx={{ mr: 3 }}>
              <DownloadOutlined />
            </IconButton>
          </Box>
        </Stack>

        <Line isDahboard={true} />
      </Paper>

      <Box
        sx={{
          overflow: "auto",
          borderRadius: "4px",
          minWidth: "280px",
          maxHeight: 355,
          flexGrow: 1,
          backgroundImage:
            theme.palette.mode === "dark" ? backgroundGradient : "none",
        }}
      >
        <Paper>
          <Typography
            color="#4763E4"
            fontWeight={"bold"}
            p={1.2}
            text-size="small"
            sx={{
              backgroundImage:
                theme.palette.mode === "dark" ? backgroundGradient : "none",
            }}
          >
            Recent Transactions
          </Typography>
        </Paper>

        {Transactions.map((item, index) => (
          <Paper
            key={index}
            sx={{
              mt: 0.4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundImage:
                theme.palette.mode === "dark" ? backgroundGradient : "none",
              padding: theme.spacing(1.2),
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
                {item.txId}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {item.user}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              {item.date}
            </Typography>
            <Typography
              borderRadius={1.4}
              p={1}
              bgcolor="#4763E4"
              color={theme.palette.getContrastText(theme.palette.error.main)}
              variant="body2"
              sx={{ fontSize: "0.8rem" }}
            >
              ${item.cost}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
};

export default Row2;
