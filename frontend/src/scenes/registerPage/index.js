import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "schema";
import { setRegisteredUsers } from "state/slices/authSlice";

export const Register = () => {
  const registeredUsers = useSelector((store) => store.registeredUsers);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const initialValue = {
    firstName: "",
    lastName: "",
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
      if (registeredUsers.length === 0) {
        dispatch(
          setRegisteredUsers({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          })
        );

        toast.success("successful registration");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        for (let i = 0; i < registeredUsers.length; i++) {
          if (values.email === registeredUsers[i].email) {
            return toast.error("This user is already exist");
          } else if (i === registeredUsers.length - 1) {
            dispatch(
              setRegisteredUsers({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              })
            );

            toast.success("successful registration");
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          }
        }
      }

      action.resetForm();
    },
    validationSchema: registerSchema,
  });

  console.log(registeredUsers);

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
          REGISTER
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
          REGISTER TO THINSIL !
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
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
            <Toaster />
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
              REGISTER
            </Button>

            <Typography
              onClick={() => {
                navigate("/login");
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
              "Already have an account? Login here."
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
