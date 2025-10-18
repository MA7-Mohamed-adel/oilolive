import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, CssBaseline } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/dashboard/orders' },
    { text: 'Users', icon: <PeopleIcon />, path: '/dashboard/users' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            // Position drawer below the main navbar
            top: { xs: 56, sm: 64 },
            height: 'calc(100% - 64px)'
          },
        }}
      >
        <Box sx={{ overflow: 'auto', pt: 2 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 8, md: 8 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
