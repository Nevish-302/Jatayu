import React from "react";
import { Box, useTheme } from "@mui/material";

import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Death count",

    data: [
      {
        x: "12 Sep",
        y: 79,
      },
      {
        x: "13 Sep",
        y: 28,
      },
      {
        x: "14 Sep",
        y: 150,
      },
      {
        x: "15 Sep",
        y: 173,
      },
      {
        x: "16 Sep",
        y: 234,
      },
      {
        x: "17 Sep",
        y: 98,
      },
      {
        x: "18 Sep",
        y: 244,
      },
      {
        x: "19 Sep",
        y: 295,
      },
      {
        x: "20 Sep",
        y: 287,
      },
      {
        x: "21 Sep",
        y: 157,
      },
      {
        x: "22 Sep",
        y: 239,
      },
      {
        x: "23 Sep",
        y: 69,
      },
    ],
  },
  {
    id: "Survivors",

    data: [
      {
        x: "12 Sep",
        y: 278,
      },
      {
        x: "13 Sep",
        y: 222,
      },
      {
        x: "14 Sep",
        y: 65,
      },
      {
        x: "15 Sep",
        y: 213,
      },
      {
        x: "16 Sep",
        y: 89,
      },
      {
        x: "17 Sep",
        y: 278,
      },
      {
        x: "18 Sep",
        y: 231,
      },
      {
        x: "19 Sep",
        y: 47,
      },
      {
        x: "20 Sep",
        y: 126,
      },
      {
        x: "21 Sep",
        y: 191,
      },
      {
        x: "22 Sep",
        y: 95,
      },
      {
        x: "23 Sep",
        y: 26,
      },
    ],
  },
  {
    id: "Missing",

    data: [
      {
        x: "12 Sep",
        y: 3,
      },
      {
        x: "13 Sep",
        y: 187,
      },
      {
        x: "14 Sep",
        y: 259,
      },
      {
        x: "15 Sep",
        y: 294,
      },
      {
        x: "16 Sep",
        y: 158,
      },
      {
        x: "17 Sep",
        y: 146,
      },
      {
        x: "18 Sep",
        y: 125,
      },
      {
        x: "19 Sep",
        y: 253,
      },
      {
        x: "20 Sep",
        y: 230,
      },
      {
        x: "21 Sep",
        y: 287,
      },
      {
        x: "22 Sep",
        y: 193,
      },
      {
        x: "23 Sep",
        y: 12,
      },
    ],
  },
  {
    id: "Injured",

    data: [
      {
        x: "12 Sep",
        y: 213,
      },
      {
        x: "13 Sep",
        y: 271,
      },
      {
        x: "14 Sep",
        y: 22,
      },
      {
        x: "15 Sep",
        y: 270,
      },
      {
        x: "16 Sep",
        y: 97,
      },
      {
        x: "17 Sep",
        y: 146,
      },
      {
        x: "18 Sep",
        y: 116,
      },
      {
        x: "19 Sep",
        y: 159,
      },
      {
        x: "20 Sep",
        y: 165,
      },
      {
        x: "21 Sep",
        y: 210,
      },
      {
        x: "22 Sep",
        y: 76,
      },
      {
        x: "23 Sep",
        y: 126,
      },
    ],
  },
];

const Line = ({ isDahboard = false }) => {
  const colors = ["#8A2BE2", "#4763E4", "#7C83FD", "#1d40c7", "#00BFFF"];

  const theme = useTheme();
  return (
    <Box sx={{ height: isDahboard ? "280px" : "75vh" }}>
      <ResponsiveLine
        theme={{
          textColor: theme.palette.text.primary,
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: theme.palette.text.primary,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.divider,
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: theme.palette.text.secondary,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.palette.divider,
              strokeWidth: 0,
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: theme.palette.text.primary,
              },
            },
            text: {
              fontSize: 11,
              fill: theme.palette.text.primary,
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: theme.palette.text.primary,
              },
            },
          },
          annotations: {
            text: {
              fontSize: 13,
              fill: theme.palette.text.primary,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            link: {
              stroke: "#000000",
              strokeWidth: 1,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            outline: {
              stroke: "#000000",
              strokeWidth: 2,
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
            symbol: {
              fill: "#000000",
              outlineWidth: 2,
              outlineColor: "#ffffff",
              outlineOpacity: 1,
            },
          },
          tooltip: {
            container: {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              fontSize: 12,
            },
            basic: {},
            chip: {},
            table: {},
            tableCell: {},
            tableCellValue: {},
          },
        }}
        data={data}
        curve="catmullRom"
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDahboard ? null : "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDahboard ? null : "Count",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        colors={colors}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default Line;
