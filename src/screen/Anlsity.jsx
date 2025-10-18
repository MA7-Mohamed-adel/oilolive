import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useGetUsersQuery } from "../Redux/services/auth/authApiServices";
import { useGetOrdersQuery } from "../Redux/services/orders/ApiOrdersServices";
import useVisitorsData from "../Redux/services/useVisitorsData";
import ChartO from "./chart/ChartO";
import ChartD from "./chart/ChartD";

// مكون قابل لإعادة الاستخدام لكل بطاقة إحصائية
const StatCard = ({ icon, title, value, color }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 3,
      height: "100%",
    }}
  >
    <Box>
      <Typography
        color="text.secondary"
        gutterBottom
        sx={{ fontSize: "0.9rem" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        {value}
      </Typography>
    </Box>
    <Avatar sx={{ bgcolor: color, color: "white", width: 56, height: 56 }}>
      {icon}
    </Avatar>
  </Paper>
);

const Anlsity = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const { data: orders = [], isLoading: isLoadingOrders } = useGetOrdersQuery();
  const { online, total } = useVisitorsData();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const stats = [
    {
      title: "Total Revenue",
      value: isLoadingOrders ? (
        <CircularProgress size={24} />
      ) : (
        `${totalRevenue.toFixed(2)}EGP`
      ),
      icon: <AttachMoneyIcon />,
      color: "success.dark",
    },
    {
      title: "Orders",
      value: isLoadingOrders ? <CircularProgress size={24} /> : orders.length,
      icon: <ShoppingCartIcon />,
      color: "info.dark",
    },
    {
      title: "Users",
      value: isLoading ? <CircularProgress size={24} /> : users.length,
      icon: <PeopleIcon />,
      color: "warning.dark",
    },
    {
      title: "Online Now",
      value: online ?? 0,
      icon: <VisibilityIcon />,
      color: "primary.dark",
    },
    {
      title: "Online ",
      value: total ?? 0,
      icon: <VisibilityIcon />,
      color: "error.dark",
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid width={"210px"} item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <StatCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <ChartD orders={orders} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <ChartO orders={orders} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Anlsity;
