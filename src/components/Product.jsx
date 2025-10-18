import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import AboutUs from "./AboutUs";

const products = [
  {
    id: 1,
    name: "Automatic Cat Feeder Water Dispenser",
    price: "£18.50 GBP",
    image: "https://i.ibb.co/qMTR7F0/cat-feeder.jpg",
    sale: false,
    oldPrice: null,
  },
  {
    id: 2,
    name: "dog leash",
    price: "£22.00 GBP",
    oldPrice: "£50.00 GBP",
    image: "https://i.ibb.co/DwGqBFD/dog-leash.jpg",
    sale: true,
  },
  {
    id: 3,
    name: "feeder toy",
    price: "£12.00 GBP",
    image: "https://i.ibb.co/kyTYJw2/feeder-toy.jpg",
    sale: false,
    oldPrice: null,
  },
  {
    id: 4,
    name: "Gps pets tracker",
    price: "From £16.50 GBP",
    image: "https://i.ibb.co/tY0b0X2/gps-tracker.jpg",
    sale: false,
    oldPrice: null,
  },
  {
    id: 5,
    name: "Portable Dog Water Bottle",
    price: "From £12.00 GBP",
    oldPrice: "£20.00 GBP",
    image: "https://i.ibb.co/2k6yhz5/dog-bottle.jpg",
    sale: true,
  },
];

export default function Product() {
  return (
    <>
    <Box
      sx={{
        backgroundColor: "rgb(60,60,60)",
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
        margin:"-10px"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: 500,
          mb: 4,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Featured products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
            <Card
              sx={{
                backgroundColor: "transparent",
                color: "white",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
                {product.sale && (
                  <Chip
                    label="Sale"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      backgroundColor: "white",
                      color: "#2c2c2c",
                      fontWeight: 500,
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    mb: 1,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {product.name}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {product.oldPrice && (
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "rgba(255,255,255,0.5)",
                        mr: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      {product.oldPrice}
                    </Typography>
                  )}
                  <Typography
                    component="span"
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {product.price}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "white",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white",
                    },
                  }}
                >
                  Choose options
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    <AboutUs/>
    </>
  );
}
