import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelId: null,
  roomId: null,

  checkIn: "",
  checkOut: "",

  guests: {
    adults: 1,
    children: 0,
  },

  roomsBooked: 1,
  createdAt: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setBookingDetails: (state, action) => {
      state.hotelId = action.payload.hotelId;
      state.roomId = action.payload.roomId;

      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;

      state.guests = action.payload.guests;

      state.roomsBooked = action.payload.roomsBooked;

      state.createdAt = Date.now();
    },

    clearBooking: (state) => {
      return initialState;
    },
  },
});

export const { setBookingDetails, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
