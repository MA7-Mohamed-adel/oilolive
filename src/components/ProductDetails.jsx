import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ii from "../assets/ii.jpg"
import { useDispatch } from "react-redux";
import { addTocart } from "../Redux/futers/cartSlice";
import qq from "../assets/qq.png"
const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
  },
});

const productData = {
  id: 1,
  brand: "olive-aura",
  name: "OLIVE OIL",
  prices: { // السعر بعد الخصم
    "1kg": 390,
    "0.5kg": 195,
  },
  originalPrices: { // السعر الأصلي
    "1kg": 780,
    "0.5kg": 390,
  },
  defaultWeight: "1kg",
  description:
    "Perfect for:  •	Salad dressings and appetizers •	Light cooking and baking. •	Natural skincare and hair care Free from additives or preservatives, and rich in Vitamin E and healthy fatty acids that support heart health.Pure, authentic taste with premium quality that captures the essence of the Mediterranean. 🌿" ,
  imagesByWeight: {
    "1kg": [ii], 
    "0.5kg": [ii], 
    "2.25Kg": [qq]
  },
};

export default function ProductDetails({ product = productData }) {
  const [selectedImg, setSelectedImg] = useState(product.imagesByWeight[product.defaultWeight][0]);
  const [quantity, setQuantity] = useState(1); 
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight); 
  const dispatch = useDispatch();

  const currentPrice = product.prices[selectedWeight];
  const originalPrice = product.originalPrices[selectedWeight];

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const item = {
      ...product,
      id: `${product.id}-${selectedWeight}`, 
      price: currentPrice, 
      qty: quantity,
      weight: selectedWeight,
      images: product.imagesByWeight[selectedWeight], 
    };
    dispatch(addTocart(item));
  };

  const handleOfferAddToCart = () => {
    const offerPrice = product.prices["25Kg"] * 2;
    const offerItem = {
      ...product,
      // id: `${product.id} + 250G `, // ID فريد للعرض
      name: `${product.name} ( 2Kg +  250G Free)`,
      price: offerPrice,
      qty: 1, // العرض عبارة عن حزمة واحدة دائماً
      weight: "2.25kg",
      images: product.imagesByWeight["1kg"], // استخدام صور الكيلو للعرض
    };
    dispatch(addTocart(offerItem));
  };

  useEffect(() => {
    setSelectedImg(product.imagesByWeight[selectedWeight][0]);
  }, [selectedWeight, product.imagesByWeight]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "rgb(60,60,60)", minHeight: "calc(100vh - 200px)" }}>
        <Container sx={{ py: { xs: 4, md: 6 }, pt: { xs: "80px", md: "100px" } }}>
          <Grid container spacing={{ xs: 2, md: 15 }}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={selectedImg}
                alt="Product"
                sx={{
                  width: "100%",
                  maxWidth: "420px",
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "block",
                  margin: "0 auto",
                }}
              />

              <Box
                display="flex"
                gap={2}
                mt={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                {product.imagesByWeight[selectedWeight].map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt={`thumb-${i}`}
                    onClick={() => setSelectedImg(img)}
                    sx={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: 1,
                      border:
                        selectedImg === img
                          ? "2px solid white"
                          : "2px solid transparent",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { border: "2px solid grey" },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 2,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  color: "grey.400",
                }}
              >
                {product.brand}
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
                  {currentPrice.toFixed(2)} EGP
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
                  {originalPrice.toFixed(2)} EGP
                </Typography>
              </Box>

              <Typography sx={{ color: "white" }} fontWeight="500" mb={1}>
                Weight
              </Typography>
              <Box display="flex" gap={2} mb={3}>
                <Box
                  onClick={() => setSelectedWeight("1kg")}
                  sx={{
                    border:
                      selectedWeight === "1kg"
                        ? "2px solid white"
                        : "1px solid grey",
                    borderRadius: "8px",
                    p: 1.5,
                    cursor: "pointer",
                    textAlign: "center",
                    color: "white",
                    minWidth: "100px",
                    transition: "border-color 0.3s",
                  }}
                >
                  <Typography>1 Kilo</Typography>
                </Box>
                <Box
                  onClick={() => setSelectedWeight("0.5kg")}
                  sx={{
                    border:
                      selectedWeight === "0.5kg"
                        ? "2px solid white"
                        : "1px solid grey",
                    borderRadius: "8px",
                    p: 1.5,
                    cursor: "pointer",
                    textAlign: "center",
                    color: "white",
                    minWidth: "100px",
                    transition: "border-color 0.3s",
                  }}
                >
                  <Typography> 500 Grame</Typography>
                </Box>
              </Box>

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
               <Button   variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  mb: 3,
                  color: "#fff",
                  backgroundColor: "#40bb46", // اللون الأخضر
                  fontWeight: "500",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#2b8b32" }, // لون أخضر أغمق عند المرور
                }}
                onClick={handleOfferAddToCart}
              >
              Buy 2kg, Get 250g FREE
               اضغط  لتحصل علي العرض
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
