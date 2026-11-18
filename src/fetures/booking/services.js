import api from "@/lib/axios";

export const createBooking = async (data) => {
  const response = await api.post("/customer/booking", data);
  return response.data.data;
};

export const createPayment = async ({ bookingId, gateway }) => {
  const response = await api.post(`/customer/payment/${bookingId}`, {
    gateway,
  });

  return response.data.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post("/customer/verify", data);
  return response.data.data;
};
