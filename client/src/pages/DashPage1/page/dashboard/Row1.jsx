import React from "react";
import { Stack, useTheme } from "@mui/material";
import Card from "./card"; // Make sure to use the correct filename

const Row1 = () => {
  const theme = useTheme();
  const cardStyle = {
    flex: "1 1 10%", // Reduce each card's width to 10% of the row's width
    minWidth: "100px", // Maintain a minimum width of 100 pixels for readability
  };

  return (
    <Stack
      direction={"row"}
      flexWrap={"nowrap"}
      gap={2} // Increase the gap between cards to 2 units
      justifyContent={"space-between"}
    >
      <Card
        title={"Total Casualties :"}
        subtitle={{ left: "54", right: "100%" }}
        sx={cardStyle}
      />
      <Card
        title={"Total injured : "}
        subtitle={{ left: "128", right: "2%" }}
        sx={cardStyle}
      />
      <Card
        title={"Total Survivors :"}
        subtitle={{ left: "540", right: "23.5%" }}
        sx={cardStyle}
      />
      <Card
        title={"Estimated Affectees :"}
        subtitle={{ left: "1500+", right: "23%" }}
        sx={cardStyle}
      />
    </Stack>
  );
};

export default Row1;
