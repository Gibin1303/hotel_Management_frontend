// import axios from "axios";

// const api = axios.create({

//     baseURL:"http://localhost:5000/api/v1",

//     withCredentials:true,

//     headers:{
//         "Content-Type":"application/json"
//     }

// });

// export default api;

import axios from "axios";
import { useEffect } from "react";



const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Gives this file access to the Redux store without a circular import
let store;
export const injectStore = (s) => {
  store = s;
};

// 1. Attach the access token to every request
api.interceptors.request.use((config) => {
  const token = store?.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. On 401, refresh the token once and retry the request
let refreshPromise = null; // makes simultaneous 401s share one refresh call

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthRoute = original?.url?.includes("/auth/");
     console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    if (error.response?.status === 401 && !original._retry && !isAuthRoute) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = api
            .post("/auth/refresh-token")
            .finally(() => (refreshPromise = null));
        }
        const { data } = await refreshPromise;
        const newToken = data.data.token; // match what refreshAccessToken returns
        store.dispatch({ type: "auth/tokenRefreshed", payload: newToken });
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (err) {
        store.dispatch({ type: "auth/logout" });
      }
    }
    return Promise.reject(error);
  },
);

export default api;
