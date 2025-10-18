import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

const CheckoutSucsse = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: '400px' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
        <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 2 }}>
          Order Placed Successfully!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Thank you for your purchase. We've received your order and will process it shortly.
        </Typography>
        <Button component={Link} to="/" variant="contained">Continue Shopping</Button>
      </Paper>
    </Box>
  );
};

export default CheckoutSucsse;
