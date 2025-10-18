import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selactCart } from "../Redux/futers/cartSlice";
import { selectIsAuth, selectRole } from "../Redux/futers/auth/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navget = useNavigate()
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleDrawerNavigation = (path) => {
    navget(path);
    setOpen(false);
  };

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 5,
    backgroundColor:"rgb(60,60,60)",
    color:"white",
    fontSize:"20px",
    padding: '0 4px',
  },
}));

const cart = useSelector(selactCart)
const totalQuantity = cart.cart?.reduce((sum, item) => sum + item.qty, 0) ?? 0;
 
 const role = useSelector(selectRole)
 const isAuth = useSelector(selectIsAuth)
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "rgb(60,60,60)", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, }}>
            <Link  onClick={() => navget("/")} underline="hover" sx={{ color: "#d9d8d1bf",cursor:"pointer" }}>
              Home
            </Link>
         
            <Link onClick={() => navget("/contact")} underline="none" sx={{ color: "#d9d8d1bf",cursor:"pointer" }}>
              Contact
            </Link>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", letterSpacing: 1, color:"white" ,cursor:"pointer"}}
            onClick={() => navget("/")}
          >
            OLIVE-AURA
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
         
         
            <IconButton onClick={() => navget(isAuth ? "/sginsuccsefuly" : "/sginin")} sx={{ color: "#d9d8d1bf" }}>
              <AccountCircleIcon />
            </IconButton>
            <StyledBadge  badgeContent={totalQuantity} onClick={() => navget("/cart")} sx={{ color: "#d9d8d1bf" }}>
              <ShoppingBagIcon />
            </StyledBadge>
            {role === "admin" ? <IconButton onClick={() => navget("/dashboard")} sx={{ color: "#d9d8d1bf" }}>
              <DashboardIcon />
            </IconButton> : null}
             

          </Box>
        </Toolbar>
      <Divider color="white" size="small" />

      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, backgroundColor: "#2c2c2c", height: "100%", p: 2 }}
        >
          <List>
            {["Home",  "Contact"].map((text) => (
              <ListItem button key={text} onClick={() =>
                handleDrawerNavigation(text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase()}`)
              }>
                <ListItemText
                  primary={text}
                  sx={{ color: "white", fontSize: "1.1rem" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
