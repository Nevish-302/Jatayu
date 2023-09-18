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
        <br />
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
        <br />
      </CardContent>
    </StyledCard>
  );
}

export default Card;
