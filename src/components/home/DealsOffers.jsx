import { Percent, CalendarDays, ArrowRight, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  {
    id: 1,
    title: "Weekend Getaway",
    description:
      "Enjoy a relaxing weekend stay at premium resorts across India.",
    discount: "30% OFF",
    coupon: "WEEKEND30",
    valid: "Valid till Dec 31",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },

  {
    id: 2,
    title: "Luxury Stay Offer",
    description: "Experience luxury hotels with exclusive member discounts.",
    discount: "25% OFF",
    coupon: "LUXURY25",
    valid: "Limited Time Offer",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
  },

  {
    id: 3,
    title: "Early Booking Deal",
    description: "Book your stay early and save more on your vacation.",
    discount: "40% OFF",
    coupon: "EARLY40",
    valid: "Book 30 days before",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  },
];

export default function DealsOffers() {
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
        {/* Header */}

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
            Exclusive Offers
          </p>

          <h2
            className="
mt-3
text-4xl
font-semibold
text-ink-800
"
          >
            Deals & Offers
          </h2>

          <p
            className="
mx-auto
mt-4
max-w-xl
text-pearl-600
"
          >
            Save more on your next stay with our exclusive hotel deals.
          </p>
        </div>

        {/* Offers Grid */}

        <div
          className="
grid
gap-8
lg:grid-cols-3
"
        >
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="
group
overflow-hidden
rounded-2xl
bg-white
shadow-soft
transition
hover:-translate-y-1
hover:shadow-lift
"
            >
              {/* Image */}

              <div
                className="
relative
h-52
overflow-hidden
"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
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

                <div
                  className="
absolute
inset-0
bg-gradient-to-t
from-black/60
to-transparent
"
                />

                <Badge
                  className="
absolute
left-5
top-5
bg-brass-500
text-ink-900
"
                >
                  <Percent size={14} />

                  {offer.discount}
                </Badge>
              </div>

              {/* Content */}

              <div
                className="
p-6
"
              >
                <h3
                  className="
text-2xl
font-semibold
text-ink-800
"
                >
                  {offer.title}
                </h3>

                <p
                  className="
mt-3
text-sm
leading-6
text-pearl-600
"
                >
                  {offer.description}
                </p>

                <div
                  className="
mt-5
flex
items-center
gap-2
text-sm
text-pearl-600
"
                >
                  <CalendarDays size={16} />

                  {offer.valid}
                </div>

                <div
                  className="
mt-5
flex
items-center
justify-between
rounded-xl
bg-pearl-100
p-3
"
                >
                  <div
                    className="
flex
items-center
gap-2
"
                  >
                    <Tag size={18} className="text-brass-600" />

                    <span
                      className="
font-semibold
text-ink-800
"
                    >
                      {offer.coupon}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    className="
bg-brass-500
text-ink-900
hover:bg-brass-600
"
                  >
                    Grab Deal
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
