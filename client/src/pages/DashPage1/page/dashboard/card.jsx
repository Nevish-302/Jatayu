import React from "react";
import { Card as MUICard, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(MUICard)(({ theme }) => ({
  width: 345,
  height: 120,
}));

function Card({ title, subtitle }) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h4" color="#1d40c7">
          {subtitle}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default Card;
