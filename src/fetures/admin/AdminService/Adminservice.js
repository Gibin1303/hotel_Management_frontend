import api from "@/lib/axios";
import { data } from "react-router-dom";

export const getAdminusersAll = async () => {
  const response = await api.get("/admin/users");
  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data.data;
};

export const getAdminOwners = async () => {
  const response = await api.get("/admin/owner");
  return response.data.data;
};

export const getAdminAllHotel = async (page) => {
  const response = await api.get("/admin/hotels", {
    params: {
      page,
    },
  });
  return response.data.data;
};

export const approveHotels = async (id) => {
  const response = await api.patch(`/admin/hotel/${id}/approve`);
  return response.data;
};

export const rejectHotels = async (id) => {
  const response = await api.patch(`/admin/hotel/${id}/reject`);
  return response.data;
};

export const getAdminBooking = async (id) => {
  const response = await api.get(`/admin/bookings/${id}`);
  return response.data;
};
