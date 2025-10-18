import  { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selactCart,
  selactTotal,
  delate,
  onIncomaent,
  onDecsremat,
  Subtotal,
} from "../Redux/futers/cartSlice";


export default function CartPage() {

const cartItems = useSelector(selactCart)
const total = useSelector(selactTotal)
const dispatch = useDispatch();
  const navegt = useNavigate()
 
    useEffect(() => {
    dispatch(Subtotal());
  }, [cartItems, dispatch]);
  return (
    <>
    <Box
      sx={{
        bgcolor: "rgb(60,60,60)",
        color: "#fff",
        p: { xs: 2, md: 6 },
      minHeight: "calc(100vh - 300px)"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          mb: 6,
          mt: { xs: 2, sm: 6 },
        }}
      >
        <Typography variant="h4"  fontWeight={600} sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" },mt:{xs:5}, mb: { xs: 2, sm: 0 } }}>
          Your cart
        </Typography>
    
      </Box>

      {cartItems?.cart.length > 0 ? (
        <>
          {cartItems.cart.map((item) => (
            <Box key={item.id} sx={{ mb: 3 }}>
              <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">
                <Grid item xs={3} sm={2}>
                  <Paper
                    component="img"
                    src={item.images[0]}
                    alt={item.name}
                    sx={{ width: "100px", borderRadius: 1, objectFit: "contain" }}
                  />
                </Grid>
                <Grid item xs={9} sm={5} md={5}>
                  <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                  {item.weight && (
                    <Typography variant="body2" color="grey.400">Weight: {item.weight}</Typography>
                  )}
                  <Typography variant="body2">{item.price.toFixed(2)}E</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "flex-end" },
                    alignItems: "center",
                    gap: { sm: 2, md: 4 },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #888",
                      borderRadius: 0.5,
                      px: 1,
                      py: 0.5,
                      width: "100px",
                    }}
                  >
                    <Button size="small" sx={{ color: "#fff", minWidth: 0, p: 0.5 }} onClick={() => dispatch(onDecsremat(item))}>–</Button>
                    <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.qty}</Typography>
                    <Button size="small" sx={{ color: "#fff", minWidth: 0, p: 0.5 }} onClick={() => dispatch(onIncomaent(item))}>+</Button>
                  </Box>
                  <IconButton size="small" sx={{ color: "#fff" }} onClick={() => dispatch(delate(item))}>
                    <DeleteIcon />
                  </IconButton>
                  <Typography fontWeight={600}>{(item.price * item.qty).toFixed(2)}E</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Divider sx={{ borderColor: "#555", my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
            <Box sx={{ width: { xs: "100%", sm: "auto" }, textAlign: { xs: "right" } }}>
              Estimated total <b style={{ color: "#fff" }}>{total.toFixed(2)} EGP</b>
            </Box>
            <Typography variant="caption" color="grey.500">
              Taxes included. Discounts and <u>shipping</u> calculated at checkout.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#fff",
                color: "#000",
                mt: 2,
                borderRadius: 1,
                px: 4,
                "&:hover": { bgcolor: "#ddd" },
                width: { xs: "100%", sm: "20rem" },
              }}
              onClick={() => navegt("/chechout")}
            >
              Check out
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              mt: 2,
              borderRadius: 1,
              px: 4,
              "&:hover": { bgcolor: "#ddd" },
            }}
            onClick={() => navegt("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Box>
        </>
 
  );
}
