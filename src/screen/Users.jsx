import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Chip, Typography } from '@mui/material';
import { useGetUsersQuery } from '../Redux/services/auth/authApiServices';

const Users = () => {
  // 1. جلب البيانات من API باستخدام RTK Query
  const { data: users = [], error, isFetching, isLoading } = useGetUsersQuery();

  // 2. تعريف أعمدة الجدول
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 100,
        // تخصيص شكل الخلية لعرض الدور كـ Chip
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            color={cell.getValue() === 'admin' ? 'primary' : 'default'}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        ),
      },
    ],
    []
  );

  // 3. إعداد الجدول باستخدام hook المكتبة
  const table = useMaterialReactTable({
    columns,
    data: users, // يجب أن تكون البيانات مصفوفة
    state: {
      isLoading, // عرض مؤشر التحميل الرئيسي
      showProgressBars: isFetching, // عرض شريط التقدم عند إعادة الجلب
      showAlertBanner: error, // عرض بانر الخطأ
    },
    muiToolbarAlertBannerProps: error
      ? { color: 'error', children: 'Error loading data' }
      : undefined,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Users Management
      </Typography>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default Users;
