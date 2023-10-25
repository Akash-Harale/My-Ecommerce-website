import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "state/slices/authSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Cart = () => {
  const theme = useTheme();
  const cartItems = useSelector((store) => store.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    console.log(index)
    dispatch(deleteCartItem(index));
    toast.success("Item removed from cart");
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.light}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          fontWeight="bold"
          fontSize="20px"
          color="primary"
        >
          {cartItems.length === 0 ? (
            <span style={{ color: "red" }}>Cart is Empty</span>
          ) : (
            "This is your Cart"
          )}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, margin: "0px 30px" }}>
        <Grid container spacing={2}>
          {cartItems.map((el, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Item>
                  <Card sx={{ maxWidth: 1 }}>
                    <CardMedia
                      sx={{ height: 200, width: "100%" }}
                      image={el.image}
                    />
                    <CardContent sx={{ height: "50px" }}>
                      <Typography
                        textAlign={"left"}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {el.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Toaster />
                      <Button
                        onClick={() => handleRemove(index)}
                        color="error"
                        size="small"
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
