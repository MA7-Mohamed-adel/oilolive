import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useGetOrdersQuery } from '../Redux/services/orders/ApiOrdersServices';
import { Box, Typography, CircularProgress, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const navget = useNavigate()
    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                header: 'Full Name',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
       
            {
                accessorKey: 'city',
                header: 'City',
            },
      
            {
                accessorKey: 'paymentMethod',
                header: 'Payment',
            },
        ],
        [],
    );

    if (isError) return <Typography color="error">Error: {error.message || 'Something went wrong'}</Typography>;
    
    return (
        <Box sx={{ p: 2 }}>
            <MaterialReactTable
                columns={columns}
                data={orders}
                state={{ isLoading }}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => (
                    <IconButton onClick={(event) => handleMenuClick(event, row)}>
                        <MoreVert />
                    </IconButton>
                )}
                renderEmptyRowsFallback={() => (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Typography>No orders found.</Typography>
                        )}
                    </Box>
                )}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem  onClick={() => {
                    navget(`/dashboard/ordersdetalis/${selectedRow.original.id}`);
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Order</ListItemText>
                </MenuItem>
                {/* You can add more actions here in the future */}
            </Menu>
        </Box>
    );
};

export default Orders;