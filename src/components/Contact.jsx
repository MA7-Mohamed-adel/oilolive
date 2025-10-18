import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Contact() {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(60,60,60)", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Box width={{xs:"300px",md:"700px",}} >
        <Typography
          variant="h4"
          sx={{ mb: 4, }}
          fontFamily={"Helvetica Neue,Sans Serif"}
        >
          Contact
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} width={"300px"} md={6}>
            <TextField
              label="Name"
               
              fullWidth
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff", borderColor: "#666" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                },
              }}
            />
          </Grid>

          <Grid  width={"380px"} item xs={12} md={6}>
            <TextField
              label="Email *"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                },
              }}
            />
          </Grid>

             <Grid width={"100%"} item xs={12}>
            <TextField
              label="Phone number"
              variant="outlined"
              fullWidth
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                },
              }}
            />
          </Grid>

          <Grid width={"100%"} item xs={12}>
            <TextField
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#999" },
                },
              }}
            />
          </Grid>

       

          <Grid item xs={12}>
            <Button
            variant="text"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                px: 4,
                py: 1.2,
                borderRadius:0,
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
