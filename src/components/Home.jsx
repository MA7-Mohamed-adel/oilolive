import React from "react";
import { Box, Grid, Typography, Button, Divider, Slide } from "@mui/material";
import Product from "./Product";
import AboutUs from "./AboutUs";
import { useNavigate } from "react-router-dom";
import p from "../assets/22.png";

export default function Home() {
  const navegt = useNavigate();
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${p})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", sm: "center 65%" },
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 0px)",
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
              <Slide
                direction="down"
                in={true}
                mountOnEnter
                unmountOnExit
                timeout={1500}
              >
                <Typography
                  component="h1"
                  fontFamily={"Helvetica Neue,Sans Serif"}
                  width={{ lg: 500, md: 500, xs: "100%" }}
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                    mb: 2,
                    fontSize: {
                      xs: "1.6rem",
                      sm: "2rem",
                      md: "2.6rem",
                      lg: "4rem",
                    },
                    lineHeight: 1.3,
                    textAlign: "center",
                  }}
                >
                  Virgin Olive Oil
                </Typography>
              </Slide>
              <Slide
                direction="down"
                in={true}
                mountOnEnter
                unmountOnExit
                timeout={1500}
              >
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: { xs: "100%", md: "600px" },
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: { xs: "0.95rem", sm: "20px" },
                    textAlign: "center",
                    mx: { xs: "auto", md: 0 },
                    color: "white",
                  }}
                >
                  Extra Virgin Olive Oil – Cold Pressed 100% natural olive oil,
                  extracted from the finest fresh olives using a cold-press
                  method to preserve all vitamins and antioxidants. It features
                  a golden-green color and a rich, balanced flavor with a smooth
                  finish.
                </Typography>
              </Slide>

              <Box>
                <Slide
                  direction="down"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                timeout={1500}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.5)",
                      textTransform: "none",
                      px: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 1,
                      fontSize: "1rem",
                      fontWeight: 500,
                      width: { xs: "auto", md: "170px" },
                      margin: "auto",
                      "&:hover": {
                        borderColor: "#fff",
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    }}
                    onClick={() => navegt("/shop")}
                  >
                    Shop new
                  </Button>
                </Slide>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Product />
      <Divider />
      <AboutUs />
    </>
  );
}
