import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(data) {
  const { name, image, buttons,  } = data;
  return (
    <Card sx={{ maxWidth: 1 }}>
      <CardMedia sx={{ height: 200, width: "100%" }} image={image} />
      <CardContent sx={{ height: "50px" }}>
        <Typography
          textAlign={"left"}
          gutterBottom
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        {buttons.map((el, index) => {
     
          return (
            <Button   sx={{ color: el.color }} key={index} size="small">
              {el.name}
            </Button>
          );
        })}
      </CardActions>
    </Card>
  );
}
