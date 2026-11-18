import { Card, CardContent } from "@/components/ui/Card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { MapPin, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DestinationCard({ destination }) {
    const navigate = useNavigate()
  return (
    <Card
      className="
      group 
      relative 
      h-[420px]
      overflow-hidden
      border-0
      rounded-2xl
      cursor-pointer
      "
    >
      {/* Image */}

      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="
        h-full
        w-full
        object-cover
        transition-transform
        duration-500
        group-hover:scale-110
        "
      />

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/80
        via-black/20
        to-transparent
        "
      />

      {/* Content */}

      <CardContent
        className="
        absolute
        bottom-0
        left-0
        right-0
        p-6
        text-white
        "
      >
        <div
          className="
          flex
          items-start
          justify-between
          "
        >
          <div>
            <h3
              className="
              text-3xl
              font-semibold
              "
            >
              {destination.name}
            </h3>

            <div
              className="
              mt-2
              flex
              items-center
              gap-2
              text-sm
              text-white/80
              "
            >
              <MapPin size={16} />

              {destination.country}
            </div>
          </div>

          <Badge
            className="
            bg-white
            text-black
            flex
            items-center
            gap-1
            "
            onClick={()=>navigate("/hotels")}
          >
            <Star size={14} fill="currentColor" />

            {destination.rating}
          </Badge>
        </div>

        <div
          className="
          mt-5
          flex
          items-end
          justify-between
          "
        >
          <div>
            <p
              className="
              text-sm
              text-white/70
              "
            >
              {destination.hotels}
            </p>

            <p
              className="
              mt-1
              text-xl
              font-semibold
              "
            >
              {destination.price}

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
            opacity-0
            translate-y-3
            transition-all
            duration-300
            group-hover:
            opacity-100
            group-hover:
            translate-y-0
            "
            onClick={()=>navigate("/hotels")}
          >
            Explore
            <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
