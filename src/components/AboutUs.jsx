import React from "react";
import { Box, Grid, Typography, Button, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useInView } from "react-intersection-observer";
import aa from "../assets/aa.jpg";

export default function AboutUs() {
  const naget = useNavigate();
  // const { ref, inView } = useInView({
  //   triggerOnce: true, 
  //   threshold: 0.2,
  // });
  return (
    <>
      <Box
        // ref={ref} 
        sx={{
        backgroundColor: "rgb(60, 60, 60)",
          minHeight: "calc(100vh - 65px)", 
           display: "flex",
        alignItems: "center", 
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
      }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            {/* <Slide direction="right" in={inView} timeout={1000}> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: { xs: "center", sm: "left" },
              px: { xs: 1, sm: 2, md: 4 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: "#f1f1f1",
                fontWeight: 600,
                mb: 2,
                fontSize: {
                  xs: "1.6rem",
                  sm: "2rem",
                  md: "2.6rem",
                  lg: "3rem",
                },
                lineHeight: 1.3,
              }}
            >
              About us
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.7)",
                maxWidth: { xs: "100%", md: 500 },
                mb: 3,
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              We pride ourselves on delivering the finest olive oil, sourced from
              our family-run groves where tradition meets innovation.
            </Typography>

            <Box>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
                onClick={() => naget("/shop")}
              >
                Product
              </Button>
            </Box>
          </Box>
            {/* </Slide> */}
          </Grid>

          {/* الصورة */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* <Slide direction="left" in={inView} timeout={1000}> */}
              <Box
                component="img"
                src={aa}
                alt="Hero"
                sx={{
                  width: { xs: "85%", sm: "100%" },
                  maxWidth: 700,
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  mt: { xs: 2, sm: 4, md: 0 },
                  mb: 0,
                }}
              />
            {/* </Slide> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
