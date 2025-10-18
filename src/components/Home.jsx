import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Product from "./Product";
import AboutUs from "./AboutUs";
import { useNavigate } from "react-router-dom";
import tt from "../assets/ee.jpg";

import Footer from "./Footer";
export default function Home() {
  const navegt = useNavigate();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(60,60,60)",
          minHeight: "calc(100vh - 65px)", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, sm: 5, md: 6 },
        }}
    
      >
        <Grid
          container
          spacing={{ xs: 4, md: 4 }}
          alignItems="center"
          justifyContent="center"
          flex={"1 1 auto"}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
                marginTop={"50px"}
          >
            <Box
              component="img"
              src={tt}
              alt="A bottle of premium olive oil"
              sx={{
                width: { xs: "85%", sm: "70%", md: "1000px" },
                maxWidth: 700,
                height: "auto",
                objectFit: "contain",
            
                mt: { xs: 2, sm: 4, md: 6 }, 
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
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
                fontFamily={"Helvetica Neue,Sans Serif"}
                width={{ lg: 500, md: 500, xs: "100%" }}
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
                Virgin Olive Oil 
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: { xs: "100%", md: 500 },
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  mx: { xs: "auto", md: 0 }, 
                }}
              >
                Extra Virgin Olive Oil – Cold Pressed 100% natural olive oil,
                extracted from the finest fresh olives using a cold-press method
                to preserve all vitamins and antioxidants. It features a
                golden-green color and a rich, balanced flavor with a smooth
                finish.
              </Typography>

              <Box  >
                <Button
                 
                  variant="outlined"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.5)",
                    textTransform: "none",
                    px: 4,
                    display: "flex",
                    py: 1,
                    fontSize: "1rem",
                    fontWeight: 500,
                    width: { xs: "auto", md: "170px" }, 
                     marginLeft:{xs:"75px",md:"0px"},
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                  onClick={() => navegt("/produtdetails/:id")}
                >
                  Details
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AboutUs />
    </>
  );
}
