import { Star, BadgeCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

export default function ReviewCard({ review }) {
  return (
    <Card
      className="
rounded-2xl
border-pearl-300
bg-white
p-2
transition
hover:-translate-y-1
hover:shadow-lift
"
    >
      <CardContent
        className="
p-6
"
      >
        {/* User */}

        <div
          className="
flex
items-center
justify-between
"
        >
          <div
            className="
flex
items-center
gap-4
"
          >
            <Avatar
              className="
h-12
w-12
"
            >
              <AvatarImage src={review.avatar} />

              <AvatarFallback>{review.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <h3
                className="
font-semibold
text-ink-800
"
              >
                {review.name}
              </h3>

              <p
                className="
text-sm
text-pearl-600
"
              >
                {review.location}
              </p>
            </div>
          </div>

          <Badge
            className="
flex
items-center
gap-1
bg-success/10
text-success
"
          >
            <BadgeCheck size={14} />
            Verified
          </Badge>
        </div>

        {/* Rating */}

        <div
          className="
mt-5
flex
items-center
gap-1
"
        >
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Star
              key={index}
              size={18}
              fill={index < review.rating ? "currentColor" : "none"}
              className={
                index < review.rating ? "text-brass-500" : "text-pearl-300"
              }
            />
          ))}
        </div>

        {/* Review */}

        <p
          className="
mt-4
leading-7
text-pearl-700
"
        >
          "{review.comment}"
        </p>

        {/* Hotel */}

        <p
          className="
mt-5
text-sm
font-medium
text-ink-700
"
        >
          Stayed at:
          <span
            className="
ml-1
text-brass-600
"
          >
            {review.hotel}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
