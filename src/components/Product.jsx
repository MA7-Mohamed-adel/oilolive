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
  CircularProgress,
  Slide,
} from "@mui/material";
import { useGetProductsQuery } from "../Redux/services/product/apiProdcut";
import { useDispatch } from "react-redux";
import { addTocart } from "../Redux/futers/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Product() {
 

  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevents navigating to the product details page
    const item = {
      ...product,
      price: parseFloat(product.price.replace("EGP ", "")),
      qty: 1, // Add one item
    };
    dispatch(addTocart(item));
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Added ${item.name} to cart`,
        html: `
          <div style="display: flex; align-items: center; text-align: left; direction: ltr;">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; margin-right: 15px; border-radius: 8px; object-fit: cover;" />
            <div>
              <div><strong>Price:</strong> ${item.price.toFixed(2)} EGP</div>
              <div><strong>Quantity:</strong> ${item.qty}</div>
            </div>
          </div>
          <div style="margin-top: 15px; display: flex; justify-content: space-around; width: 100%;">
            <a href="/cart" style="background-color: #f0f0f0; color: #333; border: none; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; cursor: pointer;">
              View Cart
            </a>
          </div>
        `,
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
      });
  };

  return (
    <>
    <Box
      
      sx={{
        backgroundColor: "rgb(60, 60, 60)",
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: 500,
          mb: 4,
          fontSize:"2rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Featured products
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress color="inherit" />
        </Box>
      )}

      {isError && (
        <Typography color="error" textAlign="center">
          Failed to load products. Please try again later.
        </Typography>
      )}

      {!isLoading && !isError && (
        
      <Grid   container spacing={4}>
        {/* We only show the first 5 products as featured */}
        {products.map((product) => (
        
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={product.id} sx={{ mx: { xs: "0px", sm: 0 }, ml: { sm: 2 } }}>
            <Card
              onClick={() => navigate(`/produtdetails/${product.id}`)}

              sx={{
                width: "163px",
                backgroundColor: "transparent",
                height:"100%",
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
                    height: 300,
                    width: '100%',
                    objectFit: 'cover',
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
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to cart 
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
    </Box>
    </>
  );
}
