import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useLoginMutation, useGoogleAuthMutation } from "../Redux/services/auth/authApiServices";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Sginin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {register,handleSubmit,formState:{errors}} = useForm({
    mode:"all"
  })
  const navigate = useNavigate()
  const [login, { isLoading: isEmailLoading }] = useLoginMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      navigate("/"); // توجيه للصفحة الرئيسية
    } catch (err) {
      const errorMessage = err.data?.message || "Failed to sign in. Please check your credentials.";
      // تنظيف رسالة الخطأ من Firebase
      alert(errorMessage.replace("Firebase: ", "").replace(/ \(auth\/.*\)\./, "."));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleAuth().unwrap();
      navigate("/"); // توجيه للصفحة الرئيسية
    } catch (err) {
      const errorMessage = err.data?.message || "An error occurred with Google Sign-In.";
      alert(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(60,60,60)",
        minHeight: "calc(100vh - 128px)", // لملء الشاشة مع حساب ارتفاع الـ Navbar والـ Footer
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        py: { xs: 4, md: 6 },
        marginTop:"30px"
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#1F2020", // درجة أغمق قليلًا للتباين
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "600" }}>
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              label="Email Address"
              error={!!errors.email}
              helperText={errors.email?.message}
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff7979", // لون رسالة الخطأ
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: "#aaa" } }} // لون الليبل
              InputProps={{
                style: { color: "#fff" }, // لون النص المدخل
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
                "& .MuiFormHelperText-root": {
                  color: "#ff7979",
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              disabled={isEmailLoading || isGoogleLoading}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#fff",
                color: "#000",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#ddd" },
              }}
            >
              {isEmailLoading ? <CircularProgress size={24} sx={{ color: "#000" }} /> : "Sign In"}
            </Button>
            <Divider sx={{ my: 2, color: "#888", borderColor: "#444" }}>
              OR
            </Divider>
            <Button
              onClick={handleGoogleSignIn}
              disabled={isEmailLoading || isGoogleLoading}
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "white",
                borderColor: "#666",
                py: 1.5,
                mb: 2,
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              {isGoogleLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign in with Google"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/sginup" variant="body2" sx={{ color: "#bbb", "&:hover": { color: "white" } }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Sginin;
