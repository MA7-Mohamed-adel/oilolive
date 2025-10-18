import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SginSuccsefuly = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        backgroundColor: "rgb(60,60,60)",
        color: "white",
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Login Successful
      </Typography>
      {/* <Typography variant="body1" color="grey.300">
        You will be redirected to the homepage now...
      </Typography> */}
    </Box>
  );
};

export default SginSuccsefuly;
