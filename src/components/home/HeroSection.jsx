import { Search, Calendar, Users, MapPin } from "lucide-react";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HeroSection({
  setDestination,
  homeSearch,
  destination,
}) {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/homeImage.jpeg)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55  pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
        <p className="mb-4 rounded-full bg-white/20 px-5 py-2 backdrop-blur">
          ✨ Over 50,000 Hotels Worldwide
        </p>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl text-white">
          Find Your Perfect Stay
          <br />
          Anywhere in the World
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-200">
          Book hotels, resorts, apartments, villas, and unique stays at the best
          prices with instant confirmation.
        </p>

        {/* Search Card */}
        <div className="mt-14 w-full max-w-6xl rounded-3xl bg-white p-5 shadow-2xl">
          <div className="grid gap-4 md:grid-cols-5">
            {/* Destination */}
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <MapPin className="text-teal-600" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Destination</p>
                <input
                  value={destination}
                  placeholder="Where are you going?"
                  className="w-full border-none text-black outline-none"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Check In */}
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <Calendar className="text-teal-600" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Check In</p>
                <input
                  type="date"
                  className="border-none text-black outline-none"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <Calendar className="text-teal-600" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Check Out</p>
                <input
                  type="date"
                  className="border-none text-black outline-none"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 rounded-xl border p-4">
              <Users className="text-teal-600" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Guests</p>
                <input
                  placeholder="2 Guests"
                  className="border-none text-black outline-none"
                />
              </div>
            </div>

            {/* Search */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 text-lg font-semibold text-white transition hover:bg-teal-700"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {["Dubai", "Kerala", "Goa", "Maldives", "Bali", "Thailand"].map(
            (city) => (
              <button
                key={city}
                className="rounded-full border border-white/30 bg-white/10 px-5 py-2 backdrop-blur transition hover:bg-white hover:text-black"
              >
                {city}
              </button>
            ),
          )}
        </div>
      </div>
      <section>
        {" "}
        <HotelSearchResults homeSearch={homeSearch} />{" "}
      </section>
    </section>
  );
}

const HotelSearchResults = ({ homeSearch = [] }) => {
  const navigate = useNavigate();

  console.log(homeSearch);

  return (
    <div className="grid gap-4  bg-white">
      {homeSearch?.map((hotel) => (
        <div
          key={hotel._id}
          className="flex cursor-pointer items-center  gap-4 justify-evenly rounded-xl border p-4"
          onClick={() => navigate(`/hoteldetail/${hotel._id}`)}
        >
          {/* Hotel Image */}
          <img
            loading="lazy"
            src={hotel.images?.[0]?.url || "/placeholder.jpg"}
            alt={hotel.name}
            className="h-20 w-20 rounded-lg object-cover"
          />

          {/* Hotel Name */}
          <div>
            <h2 className="text-lg font-semibold">{hotel.name}</h2>

            <p className="text-sm text-grey-500">
              {hotel.location?.city}, {hotel.location?.state}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
