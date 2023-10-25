import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MediaCard from "./MediaCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid(actualData) {
  const { data } = actualData;
  const { buttons } = actualData;
  return (
    <Box sx={{ flexGrow: 1, margin: "0px 30px" }}>
      <Grid container spacing={2}>
        {data.map((el, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Item>
                <MediaCard buttons={buttons} name={el.name} image={el.image} />
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
