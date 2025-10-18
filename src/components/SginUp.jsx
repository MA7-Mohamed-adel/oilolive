import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  CircularProgress,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSignupMutation, useGoogleAuthMutation } from "../Redux/services/auth/authApiServices";

const SginUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();

  const onSubmit = async (data) => {
    try {
      await signup(data).unwrap();
      alert("Account created successfully! Please sign in.");
      navigate("/sginin");
    } catch (err) {
      // Firebase often returns specific error messages
      const errorMessage = err.data?.message || "An error occurred during sign up.";
      if (errorMessage.includes("auth/email-already-in-use")) {
        alert("This email is already in use. Please use a different email or sign in.");
      } else {
        alert(errorMessage);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleAuth().unwrap();
      navigate("/"); // Navigate to home page on successful Google sign-in
    } catch (err) {
      const errorMessage = err.data?.message || "An error occurred with Google Sign-In.";
      alert(errorMessage);
    }
  };

  return (
    <>
    <Box
      sx={{
        backgroundColor: "rgb(60,60,60)",
        minHeight: "calc(100vh - 128px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        py: { xs: 4, md: 6 },
        marginTop:"50px"
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#1F2020",
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "600" }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiFormHelperText-root": { color: "#ff7979" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiFormHelperText-root": { color: "#ff7979" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#aaa", "&:hover": { color: "#fff" } }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiFormHelperText-root": { color: "#ff7979" },
              }}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isSigningUp || isGoogleLoading} sx={{ mt: 3, mb: 2, bgcolor: "#fff", color: "#000", fontWeight: "bold", py: 1.5, "&:hover": { bgcolor: "#ddd" } }}>
              {isSigningUp ? <CircularProgress size={24} sx={{color: "#000"}} /> : "Sign Up"}
            </Button>
            <Divider sx={{ my: 2, color: "#888", borderColor: "#444" }}>
              OR
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={isSigningUp || isGoogleLoading}
              sx={{
                color: "white",
                borderColor: "#666",
                py: 1.5,
                mb: 2,
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              {isGoogleLoading ? <CircularProgress size={24} sx={{color: "white"}} /> : "Sign up with Google"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/sginin" variant="body2" sx={{ color: "#bbb", "&:hover": { color: "white" } }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
    </>
   
  );
};

export default SginUp;
