import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/Close"; // مؤقتًا استخدمت Close بدل X (ممكن تحط أيقونة SVG)
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // بدل TikTok (أيقونة مخصصة)

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#1F2020", color: "#fff", py: 4,}}>
      <Container>
        <Typography variant="h6" gutterBottom>
          Subscribe to our newsletter
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: 400,
            
          }}
        >
          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            sx={{
              bgcolor: "transparent",
              input: { color: "#fff" },
              "& fieldset": { borderColor: "#555" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{ color: "#fff" }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <IconButton sx={{ color: "#fff" }}>
            <InstagramIcon />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <MusicNoteIcon />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <XIcon />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <PinterestIcon />
          </IconButton>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              Country/region
            </Typography>
      
          </Grid>

       
        </Grid>

        <Box
          sx={{
            mt: 4,
            fontSize: 12,
            color: "#aaa",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="body2">
            © 2025, Oil 
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit" underline="hover">
              Privacy policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Refund policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms of service
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact information
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Shipping policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
