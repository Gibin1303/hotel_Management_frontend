import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { BedDouble, Users } from "lucide-react";

import { getRoomDetail } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { createBooking } from "../services";
// import { useBooking } from "@/fetures/booking/bookingSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useBooking } from "@/fetures/auth/hooks/useAuth";
import { clearBooking } from "../bookingSlice";

const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const toLocalISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

// Parse YYYY-MM-DD as UTC on both sides so night count is DST-safe
const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const diff = new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`);
  return Math.max(0, Math.round(diff / 86400000));
};

const clamp = (value, min, max) => {
  const n = Number.isFinite(value) ? value : min;
  return Math.max(min, Math.min(max, n));
};

const Booking = () => {
  //   const { id: roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const booking = useBooking();
  const { roomId, hotelId } = useParams();

  

  console.log(roomId, hotelId, "Ids formm hotels");

  // prefilled from the URL: /checkout/:id?hotelId=..&checkIn=..&checkOut=..&adults=..&children=..&rooms=..
  //   const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") ?? "");
  //   const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 1);
  const [children, setChildren] = useState(
    Number(searchParams.get("children")) || 0,
  );
  //   const [roomsBooked, setRoomsBooked] = useState(
  //     Number(searchParams.get("rooms")) || 1,
  //   );

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const book = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  console.log("Redux booking", book);

  const { checkIn, checkOut, guests, roomsBooked } = booking;

  useEffect(() => {
    const expiry = 30 * 60 * 1000; // 30 minutes

    if (booking.createdAt && Date.now() - booking.createdAt > expiry) {
      dispatch(clearBooking());

      navigate("/");

      return; // stop API call
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setLoadError("");
        const res = await getRoomDetail(roomId);
        if (!cancelled) setRoom(res?.data ?? res);
      } catch (err) {
        console.error(err);
        if (!cancelled) setLoadError("Could not load this room.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [roomId, booking.createdAt, dispatch, navigate]);

  //   const hotelId = searchParams.get("hotelId") ?? room?.hotelId;
  const today = toLocalISO(new Date());
  const nights = useMemo(
    () => nightsBetween(checkIn, checkOut),
    [checkIn, checkOut],
  );

  const maxRooms = room?.quantity ?? 1;
  const maxAdults = (room?.capacity?.adults ?? 1) * roomsBooked;
  const maxChildren = (room?.capacity?.children ?? 0) * roomsBooked;

  // keep guest counts inside capacity once the room has loaded
  // or when the number of rooms changes
  useEffect(() => {
    if (!room) return;
    setAdults((a) => clamp(a, 1, maxAdults));
    setChildren((c) => clamp(c, 0, maxChildren));
  }, [room, maxAdults, maxChildren]);

  // display only; the server recalculates the real total
  const totalPrice = room ? room.price * nights * roomsBooked : 0;

  const canSubmit = !!room && nights > 0 && adults >= 1 && !submitting;

  const handleBooking = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      const booking = await createBooking({
        // hotelId,
        hotelId,
        roomId,
        checkIn,
        checkOut,
        guests,
        roomsBooked,
      });

      navigate(`/booking/confirmation/${booking?.data?._id ?? booking?._id}`, {
        replace: true,
      });
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Booking failed. Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse p-6">
        <div className="h-9 w-40 rounded bg-gray-200" />
        <div className="mt-8 h-72 rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (loadError || !room) {
    return (
      <div className="p-10 text-center text-gray-700">
        {loadError || "Room not found"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Booking Details</h2>

          <div className="mt-5 space-y-4">
            <label className="block text-sm text-gray-600">
              Check-in
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value >= checkOut) setCheckOut("");
                }}
                className="mt-1 w-full rounded border p-2"
              />
            </label>

            <label className="block text-sm text-gray-600">
              Check-out
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>

            <label className="block text-sm text-gray-600">
              Rooms
              <input
                type="number"
                min={1}
                max={maxRooms}
                value={roomsBooked}
                onChange={(e) =>
                  setRoomsBooked(clamp(e.target.valueAsNumber, 1, maxRooms))
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>

            <label className="block text-sm text-gray-600">
              Adults (max {maxAdults})
              <input
                type="number"
                min={1}
                max={maxAdults}
                value={adults}
                onChange={(e) =>
                  setAdults(clamp(e.target.valueAsNumber, 1, maxAdults))
                }
                className="mt-1 w-full rounded border p-2"
              />
            </label>

            {maxChildren > 0 && (
              <label className="block text-sm text-gray-600">
                Children (max {maxChildren})
                <input
                  type="number"
                  min={0}
                  max={maxChildren}
                  value={children}
                  onChange={(e) =>
                    setChildren(clamp(e.target.valueAsNumber, 0, maxChildren))
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </label>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-xl border p-6">
          {room.images?.[0]?.url && (
            <img
              src={room.images[0].url}
              alt={room.roomType}
              className="h-40 w-full rounded object-cover"
            />
          )}

          <h2 className="mt-4 text-xl font-bold">{room.roomType}</h2>

          <p className="mt-3 flex items-center gap-2">
            <BedDouble size={18} /> {formatPrice(room.price)} / night
          </p>

          <p className="mt-1 flex items-center gap-2">
            <Users size={18} /> Up to {room.capacity?.adults ?? 1} adult
            {(room.capacity?.adults ?? 1) > 1 ? "s" : ""} per room
          </p>

          {nights > 0 && (
            <p className="mt-3 text-sm text-gray-600">
              {nights} night{nights > 1 ? "s" : ""} × {roomsBooked} room
              {roomsBooked > 1 ? "s" : ""}
            </p>
          )}

          <h3 className="mt-3 text-xl font-bold" aria-live="polite">
            Total {formatPrice(totalPrice)}
          </h3>

          {submitError && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <button
            type="button"
            onClick={handleBooking}
            disabled={!canSubmit}
            className="mt-5 w-full rounded bg-teal-600 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {submitting ? "Confirming..." : "Confirm Booking"}
          </button>

          {nights === 0 && (
            <p className="mt-2 text-center text-xs text-gray-500">
              Choose your dates to continue
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Booking;
