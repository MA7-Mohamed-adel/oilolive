import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addTocart } from "../Redux/futers/cartSlice";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../Redux/services/product/apiProdcut";
import Swal from "sweetalert2";

const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
  },
});

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const [quantity, setQuantity] = useState(1); 
  const [isImageLoading, setIsImageLoading] = useState(true);
  const dispatch = useDispatch();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    const item = {
      ...product,
      price: parseFloat(product.price.replace("EGP ", "")),
      qty: quantity,
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

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', backgroundColor: "rgb(60,60,60)" }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', backgroundColor: "rgb(60,60,60)" }}>
        <Typography color="error">Failed to load product details.</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "rgb(60,60,60)", minHeight: "calc(100vh - 200px)" }}>
        <Container sx={{ py: { xs: 4, md: 6 }, pt: { xs: "80px", md: "100px" } }}>
          <Grid container spacing={{ xs: 2, md: 15 }} sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box sx={{ 
                position: 'relative', 
                width: "100%", 
                maxWidth: "360px",
                aspectRatio: '1 / 1', // To prevent layout shift and maintain aspect ratio
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: { xs: 2, md: 0 },
                marginTop: { xs: 0, md: -10 }
              }}>
                {isImageLoading && <CircularProgress color="inherit" sx={{ position: 'absolute' }} />}
                <Box
                  component="img"
                  src={product.image}
                  alt="Product"
                  onLoad={() => setIsImageLoading(false)}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    visibility: isImageLoading ? 'hidden' : 'visible',
                    marginTop: { xs: 0, md: 10 }
                  }}
                />
              </Box>
            </Grid>

            <Grid marginTop={{ xs: 0, md: 10 }} item xs={12} md={6}>
              <Typography
              
                variant="overline"
                sx={{
                  letterSpacing: 2,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  color: "grey.400",
                }}
              >
                OLIVE-AURA
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  mb: 2,
                  color: "white",
                  fontSize: { xs: "1.5rem", md: "2.125rem" },
                }}
              >
                {product.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "500",
                    color: "white",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {product.price}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    color: "grey.500",
                    textDecoration: "line-through",
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  {product.oldPrice}
                </Typography>
              </Box>

              {product.weight && (
                <Box mb={3}>
                  <Typography sx={{ color: "white" }} fontWeight="500" mb={1}>
                    Weight
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid grey",
                      borderRadius: "8px",
                      p: 1.5,
                      display: 'inline-block',
                      textAlign: "center",
                      color: "white",
                      minWidth: "100px",
                    }}
                  >
                    <Typography>{product.weight} Kilo</Typography>
                  </Box>
                </Box>
              )}

              <Typography sx={{ color: "white" }} fontWeight="500" mb={1}>
                Quantity
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                border="1px solid white"
                borderRadius="8px"
                color="white"
                width={{ xs: "110px", md: "130px" }}
                mb={3}
              >
                <IconButton onClick={handleDecrement} size="small">
                  <RemoveIcon sx={{ color: "white" }} />
                </IconButton>
                <Typography fontWeight="500">{quantity}</Typography>
                <IconButton onClick={handleIncrement} size="small">
                  <AddIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.3,
                  mb: 3,
                  color: "white",
                  borderColor: "white",
                  fontWeight: "500",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "grey.300" },
                }}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

              <Box>
                <Typography sx={{ color: "white" }} variant="subtitle1" fontWeight="600">
                  Description
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    width: { xs: "300px", md: "500px" },
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
