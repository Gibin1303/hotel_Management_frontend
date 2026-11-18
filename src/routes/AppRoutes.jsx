import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import AuthLayout from "@/layouts/AuthLayot.jsx";
import Navbar from "@/components/common/Navbar";

import api from "@/lib/axios";
import { tokenRefreshed, authChecked, logout } from "@/fetures/auth/authSlice";
import { useAuth } from "@/fetures/auth/hooks/useAuth";
import { useDispatch } from "react-redux";
import HotelDetails from "@/fetures/HotelsDetail/pages/HotelDetails";
import Booking from "@/fetures/booking/page/Booking";
import HotelsList from "@/fetures/HotelsDetail/components/HotelsList";
import OwnerPage from "@/pages/Owner/OwnerPage";
import AllhotelsOwners from "@/pages/Owner/AllhotelsOwners";
import OwnerHotelDeatail from "@/pages/Owner/OwnerHotelDeatail";
import OwnerLayouts from "@/layouts/OwnerLayouts";
import OwnerAddRooms from "@/pages/Owner/OwnerAddRooms";
import AdminHome from "@/pages/AdminHome";
import AdminLaout from "@/layouts/AdminLaout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminOwnerManage from "@/pages/AdminOwnerManage";
import BookingConfirm from "@/fetures/booking/page/BookingConfirm";

// Lazy loaded pages
const Home = lazy(() => import("@/pages/Home"));

const Login = lazy(() => import("@/fetures/auth/pages/Login"));

const Register = lazy(() => import("@/fetures/auth/pages/Register"));

function AppRoutes() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const restore = async () => {
      try {
        const { data } = await api.post("/auth/refresh-token");

        dispatch(tokenRefreshed(data.data.token));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(authChecked());
      }
    };

    restore();
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          {/* <Routes>
          <Route
            path="/"
            element={
              user?.role === "OWNER" ? (
                <Navigate to="/owner" replace />
              ) : user?.role === "CUSTOMER" ? (
                <Home />
              ) :  <Navigate to="/admin/dashboard" replace />
            }
          /> */}

          <Route
            path="/"
            element={
              user?.role === "OWNER" ? (
                <Navigate to="/owner" replace />
              ) : user?.role === "ADMIN" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />

          <Route element={<AuthLayout />}>
            {/* <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} /> */}

            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />

            <Route
              path="/register"
              element={user ? <Register /> : <Register />}
            />
          </Route>

          {user?.role === "CUSTOMER" && (
            <>
              <Route path="/hoteldetail/:id" element={<HotelDetails />} />
              <Route path="/checkout/:roomId/:hotelId" element={<Booking />} />
              <Route path="/hotels" element={<HotelsList />} />
            </>
          )}

          {/* {user?.role === "OWNER" && (
            <>
              <Route path="/allhotels" element={<AllhotelsOwners />} />
              <Route path="/owner-detail/:id" element={<OwnerHotelDeatail />} />
            </>
          )}
          </Routes>
          </Suspense> */}

          {user?.role === "OWNER" && (
            <Route path="/" element={<OwnerLayouts />}>
              <Route index element={<OwnerPage />} />
              <Route path="allhotels" element={<AllhotelsOwners />} />
              <Route path="detail/:id" element={<OwnerHotelDeatail />} />
              <Route path="/rooms/add/:id" element={<OwnerAddRooms />} />
            </Route>
          )}

          {user?.role === "ADMIN" && (
            <Route path="/admin" element={<AdminLaout />}>
              <Route path="users" element={<AdminHome />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage/owners" element={<AdminOwnerManage />} />
            </Route>
          )}

          <Route
            path="/booking/confirmation/:id"
            element={<BookingConfirm />}
          />
        </Routes>
      </Suspense>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default AppRoutes;
