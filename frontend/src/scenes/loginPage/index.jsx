import {
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "schema";
import { setLogin } from "state/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const registeredUsers = useSelector((store) => store.registeredUsers);
  const initialValue = {
    email: "",
    password: "",
  };

  const {
    values,
    touched,
    handleBlur,
    errors,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: initialValue,
    onSubmit: (values, action) => {
      console.log(registeredUsers);
      console.log(values);
      if (registeredUsers.length === 0) {
        toast.error("User not found");
      } else {
        for (let i = 0; i < registeredUsers.length; i++) {
          if (values.email === registeredUsers[i].email) {
            if (values.password === registeredUsers[i].password) {
              dispatch(
                setLogin({
                  firstName: registeredUsers[i].firstName,
                  lastName: registeredUsers[i].lastName,
                })
              );
              action.resetForm();
              setTimeout(() => {
                navigate("/");
              }, 1500);
              return toast.success("login success");
            } else{
              return toast.error("wrong password");
            }
          } else if (i === registeredUsers.length - 1) {
            toast.error("Invalid email");
          }
        }
      }

      action.resetForm();
    },
    validationSchema: loginSchema,
  });

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
          fontSize="32px"
          color="primary"
        >
          LOGIN
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          LOGIN TO THINSIL !
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              onClick={() => {
                navigate("/register");
                resetForm();
              }}
              sx={{
                textDecoration: "none",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              "Don't have an account? Sign Up here."
            </Typography>
          </Box>
        </form>
      </Box>
      <Toaster />
    </Box>
  );
};

export default LoginPage;
