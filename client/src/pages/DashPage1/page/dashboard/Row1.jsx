import React from "react";
import { Stack, useTheme } from "@mui/material";
import Card from "./Card"; // Make sure to use the correct filename

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
    >
      <Card
        title={"Total Casualties :"}
        subtitle={"54"}
      />
      <Card title={"Total Casualties :"} subtitle={"54"} />

      <Card
        title={"Total injured : "}
        subtitle={"128"}
      />

      <Card
        title={"Total Survivors :"}
        subtitle={"540"}
      />
      <Card
        title={"Estimated Affectees :"}
        subtitle={"1500+"}
      />
      <Card title={"Total injured : "} subtitle={"128"} />

      <Card title={"Total Survivors :"} subtitle={"540"} />
      <Card title={"Estimated Affectees :"} subtitle={"1500+"} />
    </Stack>
  );
};

export default Row1;
