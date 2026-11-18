import api from "@/lib/axios";

export const getHotelsDetail = async (id) => {
  const response = await api.get(`/customer/${id}`);
  return response.data.data;
};

export const getAllRooms = async (id) => {
  const response = await api.get(`/customer/hotels/${id}/rooms`);
  return response.data.data;
};

export const getRoomDetail = async (id) => {
  const response = await api.get(`/customer/rooms/${id}`);
  return response.data.data;
};

export const getOwnersHotels = async () => {
  const response = await api.get("/owner/hotels");
  return response.data.data;
};

export const addHotels = async (formData) => {
  const response = await api.post("/owner/hotels", formData);
  return response.data.data;
};

export const getOwnerHotelsDetail = async (id) => {
  const response = await api.get(`/owner/hotels/${id}`);
  return response.data.data;
};

// export const updateHotel = async (id,data) => {
//   const response = await api.patch(`/owner/hotels/${id}`,data);
//   return response.data.data;
// };

export const updateHotel = async (id, data) => {
  const response = await api.patch(`/owner/hotels/${id}`, data);

  return response.data.data;
};

export const getDashboardData = async () => {
  const response = await api.get("/owner/dashboard");
  return response.data.data;
};

export const addRooms = async ({hotelId, data}) => {
  const response = await api.post(`/owner/hotels/${hotelId}/rooms`, data);
  return response.data.data
};


export const DeleteHotel = async(id)=>{
  const response = await api.delete(`/owner/hotels/${id}`)
}
