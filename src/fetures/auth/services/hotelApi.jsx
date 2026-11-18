import api from "@/lib/axios";

export const getAllHotels = async (params = {}) => {
      console.log(params,"params");

  const res = await api.get("/customer", { params });
  
  return res.data.data;
};

