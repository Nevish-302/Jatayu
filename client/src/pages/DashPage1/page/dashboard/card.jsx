import React from "react";
import {
  Card as MUICard,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomIcon from "../../../../assets/image/up.png";

const StyledCard = styled(MUICard)(({ theme }) => ({
  width: 345,
  height: 120,
  color: theme.palette.mode === "light" ? "black" : "white", // Adjust text color based on theme mode
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)"
      : "none",
}));

const SubtitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.mode === "light" ? "green" : "#01B574", // Adjust text color based on theme mode
  display: "flex",
  alignItems: "center",
  background: theme.palette.mode === "light" ? "transparent" : "transparent", // Adjust background based on theme mode
}));

const Icon = styled("img")({
  width: "12px",
  height: "12px",
  marginLeft: "4px",
});

function Card({ title, subtitle }) {
  const theme = useTheme();

  return (
    <StyledCard>
      <CardContent>
        <Typography
          component="div"
          color={theme.palette.mode === "light" ? "black" : "white"}
          className="text-sm pb-2"
        >
          {title}
        </Typography>
        <SubtitleContainer>
          <Typography
            variant="h4"
            color={theme.palette.mode === "light" ? "black" : "white"}
          >
            {subtitle.left}
          </Typography>
          <SmallText>
            {subtitle.right} <Icon src={CustomIcon} alt="Custom Icon" />
          </SmallText>
        </SubtitleContainer>
      </CardContent>
    </StyledCard>
  );
}

export default Card;
