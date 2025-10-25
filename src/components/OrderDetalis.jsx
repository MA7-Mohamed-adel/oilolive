import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../Redux/services/orders/ApiOrdersServices';
import { Box, Typography, Paper, Grid, CircularProgress, Divider, Card, CardMedia, List, ListItem, ListItemText, Stack, Avatar } from '@mui/material';
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const OrderDetalis = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, error } = useGetOrderByIdQuery(id);
//   console.log(order)
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error" sx={{ p: 3 }}>Error: {error?.data?.message || 'Failed to load order details.'}</Typography>;
  }

  if (!order) {
    return <Typography sx={{ p: 3 }}>Order not found.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - 64px)' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Order Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order ID: #{id}
        </Typography>
      </Stack>
      <Grid  container spacing={3}>
        {/* Left Column: Order Items */}
        <Grid  item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Items in Order</Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(0, 0, 0, 0.08)' }} />
            <List>
              {order.items?.map((item) => (
                <ListItem key={item.id} divider sx={{ alignItems: 'center', py: 2 }}>
                  <Box sx={{ position: 'relative', mr: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, borderRadius: 1 }}
                      src={item.images[0]}
                      alt={item.name}
                    />
                    <Box sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'rgba(90,90,90,0.8)', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {item.qty}
                    </Box>
                  </Box>
                  <ListItemText
                    sx={{ flexGrow: 1, }}
                    primaryTypographyProps={{ fontWeight: 'bold', variant: 'body1' }}
                    primary={item.name}
                    secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary', mt: 0.5 }}
                    secondary={
                      <>
                        <Box component="span">Quantity: {item.qty}</Box>
                        {item.weight && (
                          <Box component="span" sx={{ display: 'block' }}>Weight: {item.weight}</Box>
                        )}
                      </>
                    }
                  />
                  <Typography variant="h6" fontWeight="bold" sx={{ minWidth: '100px', textAlign: 'right' }}>£{(item.price * item.qty).toFixed(2)}</Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 2, borderColor: 'rgba(0, 0, 0, 0.08)' }} />
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography>Subtotal: £{order.subtotal?.toFixed(2)}</Typography>
              <Typography>Shipping: £{order.shippingCost?.toFixed(2)}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                Total: £{order.totalAmount?.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid width={"500px"} item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(0, 0, 0, 0.08)' }} />
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'primary.light', mt: 0.5 }}><PersonIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Customer</Typography>
                  <Typography><strong>Name:</strong> {order.fullname}</Typography>
                  <Typography><strong>Email:</strong> {order.email}</Typography>
                  <Typography><strong>Phone:</strong> {order.phone}</Typography>
                </Box>
              </Stack>
              <Divider variant="inset" />
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'info.light', mt: 0.5 }}><LocalShippingIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Shipping Address</Typography>
                  <Typography><strong>Address:</strong> {order.address}</Typography>
                  {order.apartment && <Typography><strong>Apartment:</strong> {order.apartment}</Typography>}
                  <Typography><strong>City:</strong> {order.city}</Typography>
                  <Typography><strong>State:</strong> {order.state}</Typography>
                  <Typography><strong>ZIP Code:</strong> {order.zip}</Typography>
                </Box>
              </Stack>
              <Divider variant="inset" />
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'success.light', mt: 0.5 }}><PaymentIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Payment</Typography>
                  <Typography><strong>Method:</strong> {order.paymentMethod}</Typography>
                </Box>
              </Stack>
              <Divider variant="inset" />
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'warning.light', mt: 0.5 }}><CalendarTodayIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Date</Typography>
                  <Typography><strong>Ordered On:</strong> {moment(order.createdAt?.toDate()).format('LLL')}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetalis;
