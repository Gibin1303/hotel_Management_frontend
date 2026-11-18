import { hotels } from "@/lib/constants";
import HotelCard from "../common/Hotelcard";

export default function FeaturedHotels() {
  return (
    <section
      className="
bg-pearl-50
py-20
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
"
      >
        <div
          className="
mb-12
text-center
"
        >
          <p
            className="
text-sm
uppercase
tracking-widest
text-brass-600
"
          >
            Premium Stays
          </p>

          <h2
            className="
mt-3
text-4xl
font-semibold
"
          >
            Featured Hotels
          </h2>

          <p
            className="
mx-auto
mt-4
max-w-xl
text-pearl-600
"
          >
            Explore our hand-picked collection of luxury hotels across India.
          </p>
        </div>

        <div
          className="
grid
gap-8
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}
