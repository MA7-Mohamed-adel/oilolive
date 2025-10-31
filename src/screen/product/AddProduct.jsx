import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { useCreateProductMutation } from "../../Redux/services/product/apiProdcut";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      weight: "",
      image: "",
      sale: false,
      oldPrice: "",
      description: "",
    },
  });

  const isSale = watch("sale");

  const onSubmit = async (data) => {
    const { image, ...productDetails } = data;

    const productData = {
      ...productDetails,
      price: `EGP ${parseFloat(data.price).toFixed(2)}`,
      oldPrice: data.oldPrice ? `EGP ${parseFloat(data.oldPrice).toFixed(2)}` : null,
    };

    try {
      await createProduct({ productData, imageFile: image }).unwrap();
      // On success
      alert("Product added successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {

      alert(error);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: "An image is required" }}
                  // eslint-disable-next-line no-unused-vars
                  render={({ field: { value, onChange, ...fieldProps }, fieldState: { error } }) => (
                    <>
                      <Button variant="contained" component="label">
                        Upload Image
                        <input
                          {...fieldProps}
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              onChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </Button>
                      {error && <Typography color="error" sx={{ display: 'block', mt: 1 }}>{error.message}</Typography>}
                    </>
                  )}
                />
              </Grid>
              {imagePreview && (
                <Grid item>
                  <Box component="img" src={imagePreview} alt="Preview" sx={{ height: 100, width: 100, objectFit: 'cover', borderRadius: 1 }} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="weight"
              control={control}
              rules={{ required: "Weight is required" }}
              render={({ field }) => (
                <TextField {...field} label="Weight (e.g., 1L, 500ml)" fullWidth error={!!errors.weight} helperText={errors.weight?.message} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required", pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid price format" } }}
              render={({ field }) => (
                <TextField {...field} label="Price (EGP)" type="number" fullWidth error={!!errors.price} helperText={errors.price?.message} InputProps={{ inputProps: { step: "0.01" } }} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller name="sale" control={control} render={({ field }) => <FormControlLabel control={<Switch {...field} checked={field.value} />} label="On Sale" />} />
          </Grid>
          <Grid item xs={12} sm={8} />
          <Grid item xs={12} sm={4}>
            {isSale && (
              <Controller
                name="oldPrice"
                control={control}
                rules={{ required: "Old price is required for sale items", pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid price format" } }}
                render={({ field }) => <TextField {...field} label="Old Price (EGP)" type="number" fullWidth error={!!errors.oldPrice} helperText={errors.oldPrice?.message} InputProps={{ inputProps: { step: "0.01" } }} />}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;
