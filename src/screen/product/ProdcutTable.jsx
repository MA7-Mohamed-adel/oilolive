import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../Redux/services/product/apiProdcut';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

const ProductTable = () => {
  const navget = useNavigate();
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'image',
        header: 'Image',
        Cell: ({ cell }) => (
          <Box
            component="img"
            src={cell.getValue()}
            alt="Product Image"
            sx={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 1 }}
          />
        ),
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 250,
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
      },
    ],
    [],
  );

  const handleDelete = (row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${row.original.name}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct({ id: row.original.id, image: row.original.image }).unwrap();
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        } catch (err) {
          console.log(err)
          Swal.fire('Error!', 'There was a problem deleting the product.', 'error');
        }
      }
    });
  };

  if (isError) {
    return <Typography color="error">Error fetching products: {error?.data?.message || 'An unknown error occurred'}</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button onClick={() => navget("/dashboard/addproduct")} variant="contained">
          Add Product
        </Button>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={products}
        enableRowActions
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => navget(`/dashboard/editproduct/${row.original.id}`)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDelete(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        state={{
          isLoading,
          showProgressBars: isDeleting,
        }}
      />
    </Box>
  );
};

export default ProductTable;
