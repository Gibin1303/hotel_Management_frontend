import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Dumbbell,
  Wind,
  Tv,
  Sparkles,
  CalendarDays,
  Users,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  X,
  BedDouble,
  Check,
} from "lucide-react";

import {
  getAllRooms,
  getHotelsDetail,
} from "@/fetures/HotelsDetail/services/getDetailHotel";
import { setBookingDetails } from "@/fetures/booking/bookingSlice";
import { useDispatch } from "react-redux";

// Returns the rooms array for a hotel id.

/* Map amenity names from the backend to icons. Falls back to a sparkle. */
const AMENITY_ICONS = {
  wifi: Wifi,
  "wi-fi": Wifi,
  parking: Car,
  breakfast: Coffee,
  restaurant: Utensils,
  pool: Waves,
  "swimming pool": Waves,
  gym: Dumbbell,
  ac: Wind,
  "air conditioning": Wind,
  tv: Tv,
};

const getAmenityIcon = (name = "") =>
  AMENITY_ICONS[name.toLowerCase().trim()] || Sparkles;

/* Shape one room from the API:
   { _id, roomType, description, price, capacity: { adults, children },
     quantity, images: [{ url }], amenities: [], status, isDeleted } */
const normalizeRoom = (r) => ({
  id: r._id,
  name: r.roomType || "Room",
  description: r.description || "",
  price: Number(r.price || 0),
  maxAdults: Number(r.capacity?.adults ?? 1),
  maxChildren: Number(r.capacity?.children ?? 0),
  quantity: Number(r.quantity ?? 0),
  amenities: r.amenities || [],
  image: r.images?.[0]?.url || "",
  available: r.status === "AVAILABLE" && !r.isDeleted && r.quantity > 0,
});

const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const HotelDetails = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // gallery / lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // rooms
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // booking form
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const res = await getHotelsDetail(id);
        setHotel(res?.data ?? res);
      } catch (err) {
        console.error(err);
        setError("Could not load this hotel. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        const res = await getAllRooms(id);
        const list = Array.isArray(res) ? res : res?.data || [];
        // setRooms(list.filter((r) => !r.isDeleted).map(normalizeRoom));
        setRooms(res.rooms.map(normalizeRoom));
      } catch (err) {
        console.error(err);
        setRooms([]);
      } finally {
        setRoomsLoading(false);
      }
    };

    fetchRooms();
  }, [id]);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) || null,
    [rooms, selectedRoomId],
  );

  // limits come from the selected room; before a room is chosen, allow up to 10
  const maxAdults = selectedRoom ? selectedRoom.maxAdults : 10;
  const maxChildren = selectedRoom ? selectedRoom.maxChildren : 10;

  // keep guest counts inside the chosen room's capacity
  useEffect(() => {
    setAdults((a) => Math.max(1, Math.min(a, maxAdults)));
    setChildren((c) => Math.min(c, maxChildren));
  }, [maxAdults, maxChildren]);

  const images = useMemo(
    () => (hotel?.images || []).map((img) => img?.url).filter(Boolean),
    [hotel],
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const today = new Date().toISOString().split("T")[0];

  /* Lightbox keyboard controls */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  /* ---------- States ---------- */

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-6 py-10">
        <div className="h-[420px] rounded-2xl bg-gray-200" />
        <div className="mt-8 h-9 w-1/2 rounded bg-gray-200" />
        <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />
        <div className="mt-6 h-24 rounded bg-gray-200" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-gray-700">{error || "Hotel not found"}</p>
        <Link
          to="/hotels"
          className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700"
        >
          Back to hotels
        </Link>
      </div>
    );
  }

  const locationText = [
    hotel.location?.address,
    hotel.location?.city,
    hotel.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const hasReviews = (hotel.totalReviews || 0) > 0;
  const canReserve = selectedRoom && checkIn && checkOut && nights > 0;

  // const handleReserve = (hotel, selectedRoomId) => {

  //   navigate(`/checkout/${selectedRoomId}`, {
  //     state: {
  //       hotelId: hotel._id,
  //       // roomId: selectedRoomId,
  //     },
  //   });
  // };

  // const handleReserve = () => {
  //   const params = new URLSearchParams({
  //     hotelId: hotel._id,
  //     checkIn,
  //     checkOut,
  //     adults: String(adults),
  //     children: String(children),
  //     rooms: "1",
  //   });
  //   navigate(`/checkout/${selectedRoomId}?${params.toString()}`);
  // };

  const handleReserve = () => {
    dispatch(
      setBookingDetails({
        hotelId: hotel._id,

        roomId: selectedRoomId,

        checkIn,

        checkOut,

        guests: {
          adults,
          children,
        },

        roomsBooked: 1,
      }),
    );

    navigate(`/checkout/${selectedRoomId}/${id}`);
  };

  /* ---------- UI ---------- */

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Title */}
      <header>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {hotel.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-600">
          <div className="flex items-center gap-1.5">
            <Star className="fill-yellow-400 text-yellow-400" size={18} />
            <span className="font-semibold text-gray-900">
              {hasReviews ? Number(hotel.rating).toFixed(1) : "New"}
            </span>
            <span className="text-gray-500">
              {hasReviews
                ? `(${hotel.totalReviews} review${hotel.totalReviews > 1 ? "s" : ""})`
                : "No reviews yet"}
            </span>
          </div>

          {locationText && (
            <div className="flex items-center gap-1.5">
              <MapPin size={18} />
              <span>{locationText}</span>
            </div>
          )}
        </div>
      </header>

      {/* Image gallery */}
      <section className="mt-6">
        {images.length === 0 ? (
          <div className="flex h-[360px] flex-col items-center justify-center gap-2 rounded-2xl bg-gray-100 text-gray-500">
            <ImageOff size={32} />
            <span>No photos added yet</span>
          </div>
        ) : (
          <div
            className={`grid gap-3 ${
              images.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <img
                src={images[0]}
                alt={`${hotel.name} main view`}
                className="h-[260px] w-full object-cover transition-transform duration-300 hover:scale-105 md:h-[420px]"
              />
            </button>

            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {images.slice(1, 5).map((url, i) => {
                  const index = i + 1;
                  const isLastTile = index === 4 && images.length > 5;

                  return (
                    <button
                      key={url + index}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      <img
                        src={url}
                        alt={`${hotel.name} photo ${index + 1}`}
                        className="h-32 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-[204px]"
                      />
                      {isLastTile && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                          +{images.length - 5} more
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Content */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              About this hotel
            </h2>
            <p className="mt-3 max-w-prose leading-7 text-gray-600">
              {hotel.description || "No description available."}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>

            {hotel.amenities?.length ? (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {hotel.amenities.map((item) => {
                  const Icon = getAmenityIcon(item);
                  return (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border px-4 py-3 text-gray-700"
                    >
                      <Icon size={18} className="shrink-0 text-teal-600" />
                      <span className="truncate">{item}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-gray-500">
                The hotel has not listed any amenities yet.
              </p>
            )}
          </section>

          {/* Rooms */}
          <section id="rooms" className="mt-10 scroll-mt-6">
            <h2 className="text-2xl font-bold text-gray-900">Choose a room</h2>

            {roomsLoading ? (
              <div className="mt-4 space-y-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-36 animate-pulse rounded-2xl bg-gray-200"
                  />
                ))}
              </div>
            ) : rooms.length === 0 ? (
              <p className="mt-3 rounded-xl border border-dashed p-6 text-gray-500">
                This hotel has no rooms listed yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {rooms.map((room) => {
                  const selected = room.id === selectedRoomId;

                  return (
                    <li
                      key={room.id}
                      className={`flex flex-col overflow-hidden rounded-2xl border transition sm:flex-row ${
                        selected
                          ? "border-teal-600 ring-2 ring-teal-600"
                          : "hover:border-gray-400"
                      } ${room.available ? "" : "opacity-60"}`}
                    >
                      {room.image ? (
                        <img
                          src={room.image}
                          alt={room.name}
                          className="h-44 w-full object-cover sm:h-auto sm:w-56"
                        />
                      ) : (
                        <div className="flex h-44 w-full items-center justify-center bg-gray-100 text-gray-400 sm:h-auto sm:w-56">
                          <BedDouble size={32} />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {room.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5">
                              <Users size={14} />
                              {room.maxAdults} adult
                              {room.maxAdults > 1 ? "s" : ""}
                              {room.maxChildren > 0 &&
                                `, ${room.maxChildren} child${
                                  room.maxChildren > 1 ? "ren" : ""
                                }`}
                            </span>
                          </div>

                          {room.description && (
                            <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                              {room.description}
                            </p>
                          )}

                          {room.amenities.length > 0 && (
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {room.amenities.map((a) => {
                                const Icon = getAmenityIcon(a);
                                return (
                                  <li
                                    key={a}
                                    className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                                  >
                                    <Icon size={12} /> {a}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>

                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              {formatPrice(room.price)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {" "}
                              / night
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={!room.available}
                            onClick={() => setSelectedRoomId(room.id)}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 ${
                              selected
                                ? "bg-teal-600 text-white"
                                : "border border-teal-600 text-teal-700 hover:bg-teal-50"
                            }`}
                          >
                            {!room.available ? (
                              "Sold out"
                            ) : selected ? (
                              <>
                                <Check size={16} /> Selected
                              </>
                            ) : (
                              "Select room"
                            )}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <div className="mt-3 rounded-xl border border-dashed p-6 text-gray-500">
              {hasReviews
                ? `${hotel.totalReviews} guests have reviewed this hotel.`
                : "No one has reviewed this hotel yet. Be the first after your stay."}
            </div>
          </section>
        </div>

        {/* Booking card */}
        <aside className="h-fit rounded-2xl border p-6 shadow-lg lg:sticky lg:top-6">
          <h2 className="text-2xl font-bold text-gray-900">Book your stay</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm">
              {selectedRoom ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-gray-900">
                    {selectedRoom.name}
                  </span>
                  <span className="text-gray-600">
                    {formatPrice(selectedRoom.price)} / night
                  </span>
                </div>
              ) : (
                <a href="#rooms" className="text-teal-700 hover:underline">
                  Select a room to continue
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 flex items-center gap-1.5 text-sm text-gray-600">
                  <CalendarDays size={14} /> Check-in
                </span>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value >= checkOut) setCheckOut("");
                  }}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </label>

              <label className="block">
                <span className="mb-1 flex items-center gap-1.5 text-sm text-gray-600">
                  <CalendarDays size={14} /> Check-out
                </span>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </label>
            </div>

            {/* Adults */}
            <Counter
              label="Adults"
              value={adults}
              min={1}
              max={maxAdults}
              onChange={setAdults}
            />

            {/* Children (hidden when the selected room does not allow them) */}
            {maxChildren > 0 && (
              <Counter
                label="Children"
                value={children}
                min={0}
                max={maxChildren}
                onChange={setChildren}
              />
            )}
          </div>

          {nights > 0 && (
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                {nights} night{nights > 1 ? "s" : ""} · {adults} adult
                {adults > 1 ? "s" : ""}
                {children > 0 &&
                  `, ${children} child${children > 1 ? "ren" : ""}`}
              </p>
              {selectedRoom && (
                <div className="flex items-center justify-between border-t pt-2 text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(selectedRoom.price * nights)}</span>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleReserve()}
            disabled={!canReserve}
            className="mt-6 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Reserve now
          </button>

          {!canReserve && (
            <p className="mt-2 text-center text-xs text-gray-500">
              {!selectedRoom
                ? "Select a room and your dates to continue"
                : "Choose your dates to continue"}
            </p>
          )}
        </aside>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous photo"
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (i) => (i - 1 + images.length) % images.length,
                );
              }}
            >
              <ChevronLeft size={26} />
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`${hotel.name} photo ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next photo"
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i + 1) % images.length);
              }}
            >
              <ChevronRight size={26} />
            </button>
          )}

          <span className="absolute bottom-5 text-sm text-white/80">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

/* Small +/- counter used for adults and children */
const Counter = ({ label, value, min, max, onChange }) => (
  <div className="flex items-center justify-between rounded-lg border px-3 py-2">
    <span className="flex items-center gap-2 text-gray-700">
      <Users size={18} /> {label}
    </span>

    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Remove one from ${label.toLowerCase()}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="rounded-full border p-1 hover:bg-gray-100 disabled:opacity-40"
      >
        <Minus size={14} />
      </button>
      <span className="w-5 text-center font-semibold">{value}</span>
      <button
        type="button"
        aria-label={`Add one to ${label.toLowerCase()}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="rounded-full border p-1 hover:bg-gray-100 disabled:opacity-40"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

export default HotelDetails;
