import { useSelector } from "react-redux";
import {  selectRole } from "./Redux/futers/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
  const role = useSelector(selectRole);



  if (role !== 'admin') {
    // إذا كان المستخدم مسجلاً دخوله ولكنه ليس "admin"، قم بإعادة توجيهه إلى الصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  // إذا كان المستخدم مسجلاً دخوله وهو "admin"، اسمح له بالوصول إلى المسار المطلوب
  return <Outlet />;
};

export default ProtectedRoute;