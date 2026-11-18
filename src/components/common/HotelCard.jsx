import { Card, CardContent } from "@/components/ui/Card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { MapPin, Star, Heart } from "lucide-react";

export default function HotelCard({ hotel }) {
  return (
    <Card
      className="
group
overflow-hidden
rounded-2xl
border
bg-white
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"
    >
      {/* Image */}

      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
"
        />

        <button
          className="
absolute
right-4
top-4
rounded-full
bg-white/90
p-2
shadow
"
        >
          <Heart size={18} />
        </button>

        <Badge
          className="
absolute
bottom-4
left-4
bg-white
text-black
"
        >
          <Star size={14} fill="currentColor" />

          {hotel.rating}
        </Badge>
      </div>

      <CardContent
        className="
p-5
"
      >
        <h3
          className="
text-xl
font-semibold
text-ink-800
"
        >
          {hotel.name}
        </h3>

        <div
          className="
mt-2
flex
items-center
gap-2
text-sm
text-pearl-600
"
        >
          <MapPin size={16} />

          {hotel.location}
        </div>

        <div
          className="
mt-4
flex
items-center
justify-between
"
        >
          <div>
            <p
              className="
text-sm
text-pearl-600
"
            >
              Starting from
            </p>

            <p
              className="
text-2xl
font-semibold
text-ink-800
"
            >
              ₹{hotel.price}
              <span
                className="
text-sm
font-normal
"
              >
                /night
              </span>
            </p>
          </div>

          <Button
            className="
bg-brass-500
text-ink-900
hover:bg-brass-600
"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
