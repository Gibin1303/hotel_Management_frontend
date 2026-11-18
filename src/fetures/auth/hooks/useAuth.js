import { useSelector } from "react-redux";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  return auth;
};

export const useBooking = () => {
  const booking = useSelector((state) => state.booking);

  return booking;
};
