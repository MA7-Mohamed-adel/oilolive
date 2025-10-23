import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  MenuItem,
  Card,
  CardMedia,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selactCart, selactTotal } from "../Redux/futers/cartSlice";
import { useSaveOrdersMutation } from "../Redux/services/orders/ApiOrdersServices";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";  

export default function Chechout() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: { country: "Egypt", paymentMethod: "cash" },
  });

  const address = watch("address");
  const city = watch("city");
  const state = watch("state");
  const zip = watch("zip");
  const paymentMethod = watch("paymentMethod");

  const [saveOrders] = useSaveOrdersMutation();
  const navigate = useNavigate();
  const cart = useSelector(selactCart);
  const subtotal = useSelector(selactTotal);
  const shippingCost = address && city && state && zip ? 10 : 0;
  const totalAmount = subtotal + shippingCost;
  const dispa = useDispatch();

  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      items: cart.cart,
      subtotal,
      shippingCost,
      totalAmount,
      fullname: `${data.firstName} ${data.lastName}`,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveOrders(orderData).unwrap();

const itemsText = orderData.items.map(
  (item) => `
${item.name}  
الكمية: ${item.qty}  
الوزن: ${item.weight ? item.weight + " g" : "-"}  
السعر: £${item.price.toFixed(2)}  
الإجمالي: £${(item.qty * item.price).toFixed(2)}
------------------------------`
).join("\n");



      await emailjs.send(
        "service_fdam3ne", 
        "template_zh0e92y",
        {
          name: orderData.fullname,
          email: orderData.email,
          time: new Date().toLocaleString(),
          subtotal: orderData.subtotal.toFixed(2),
          shipping: orderData.shippingCost.toFixed(2),
          total: orderData.totalAmount.toFixed(2),
          items_text: itemsText,
        },
        "9mK1pYpBpPvy-cKz2" 
      );

      dispa(clearCart());
      navigate("/checkoutsucsse");
    } catch (err) {
      console.error("Error submitting order:", err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Grid container spacing={4} sx={{ mt: { xs: 8, md: 8 } }}>
        <Grid item xs={12} md={7}>
          <Paper component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiFormControlLabel-label': { color: 'black' },
          }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Contact</Typography>
            <TextField
              fullWidth placeholder="Email" variant="outlined" sx={{ mb: 1.5 }}
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              error={!!errors.email} helperText={errors.email?.message}
            />
            <TextField
              fullWidth label="Phone" variant="outlined" sx={{ mb: 1.5 }}
              {...register("phone", { required: "Phone number is required", minLength: 11, maxLength: 11 })}
              error={!!errors.phone} helperText={errors.phone?.message}
            />

            <Typography marginY={2} variant="h6" fontWeight="bold">Delivery</Typography>
            <TextField select fullWidth label="Country/Region" sx={{ mb: 2 }}
              {...register("country", { required: "Country is required" })}
              defaultValue="Egypt">
              <MenuItem value="Egypt">Egypt</MenuItem>
            </TextField>

            <Grid container spacing={2}>
              <Grid width={{xs:"400px",md:"310px"}} item xs={12} md={6}>
                <TextField fullWidth label="First name"
                  {...register("firstName", { required: "First name is required" })}
                  error={!!errors.firstName} helperText={errors.firstName?.message} />
              </Grid>
              <Grid width={{xs:"400px",md:"310px"}} item xs={12} md={6}>
                <TextField fullWidth label="Last name"
                  {...register("lastName", { required: "Last name is required" })}
                  error={!!errors.lastName} helperText={errors.lastName?.message} />
              </Grid>
            </Grid>

            <TextField fullWidth label="Address" sx={{ mt: 2 }}
              {...register("address", { required: "Address is required" })}
              error={!!errors.address} helperText={errors.address?.message} />
            <TextField fullWidth label="Apartment (optional)" sx={{ mt: 2 }} {...register("apartment")} />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid  width={{xs:"400px",md:"200px"}} item xs={12} md={4}>
                <TextField fullWidth label="City" {...register("city", { required: "City is required" })}
                 error={!!errors.city} helperText={errors.city?.message} 
                />
                
              </Grid>
              <Grid width={{xs:"400px",md:"200px"}} item xs={12} md={4}>
                <TextField fullWidth label="State" {...register("state", { required: "State is required" })}
                 error={!!errors.state} helperText={errors.state?.message} 
                />
              </Grid>
              <Grid width={{xs:"400px",md:"200px"}} item xs={12} md={4}>
                <TextField fullWidth label="ZIP" {...register("zip", { required: "ZIP is required" })}
                    error={!!errors.zip} helperText={errors.zip?.message} 
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>Payment</Typography>

            <FormControl component="fieldset">
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                    <FormControlLabel value="instapay" control={<Radio />} label="InstaPay" />
                  </RadioGroup>
                )}
              />
              <Collapse in={paymentMethod === 'instapay'}>
                <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#fafafa' }}>
                  <Typography variant="body2">Send payment to: <b>@abdoadeell</b></Typography>
                </Box>
              </Collapse>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth sx={{
              mt: 3, py: 1.5, color: "white", backgroundColor: "rgb(60,60,60)",
              '&:hover': { backgroundColor: 'rgb(80,80,80)' },
            }}>
              Complete Order
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
            {cart.cart?.map((item) => (
              <Grid key={item.id} container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <Card sx={{ borderRadius: 2, maxWidth: 80 }}>
                    <CardMedia component="img" height="80" image={item.images[0]} alt={item.name} />
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography color="text.secondary">Qty: {item.qty}</Typography>
                </Grid>
                <Grid item xs={3} textAlign="right">
                  <Typography fontWeight="bold">{(item.price * item.qty).toFixed(2)}EGP</Typography>
                </Grid>
              </Grid>
            ))}

            <Box width={{xs: "300px",md:"500px"}} sx={{ mt: 3 }}>
              <Grid container justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>{subtotal.toFixed(2)}EGP</Typography>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography>Shipping</Typography>
                {address && city && state && zip ? (
                  <Typography>90.00EGP</Typography>
                ) : (
                  <Typography color="text.secondary">Enter address</Typography>
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">{totalAmount.toFixed(2)}EGP</Typography>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
