import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {  useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from "@emotion/react";
import { addToCart } from "state/slices/authSlice";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const HomePage = () => {
  const theme= useTheme()
  const products = useSelector((store) => store.products);
  const user= useSelector((store) => store.user);
const dispatch= useDispatch(); 
  const hadleAddToCart = (payload) => {
     dispatch(addToCart(payload))
  };

  const handleDetailsBtn=()=>{
    toast('This functionality is under development and \n will be completed at the end of 25 October 2023',{
      duration:5000, icon:"⚒️"
    })
  }
  return (
    <Box>
      <Box sx={{ flexGrow: 1, margin: "0px 30px" }}>
        <Grid container spacing={2}>
          {products.map((el, index) => {
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
                      <Button onClick={handleDetailsBtn} size="small">Details</Button>
                      <Button sx={{color:theme.palette.neutral.main}} size="large">₹ {el.price}</Button>

                      <Toaster />
                      <Button
                        onClick={() => {
                          if(user){
                            hadleAddToCart(el)
                            toast.success('successfull added to cart')
                          } else{
                            toast("Please Login to add to cart", {icon:'⚠️'})
                          }
                          
                        }}
                         
                          size="small"
                      >
                        Add to Cart
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

export default HomePage;
