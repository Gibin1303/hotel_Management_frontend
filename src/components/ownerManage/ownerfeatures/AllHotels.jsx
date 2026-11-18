import React, { useEffect, useState } from "react";
import { MapPin, Star, Calendar, Loader2Icon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addImage } from "@/fetures/HotelsDetail/hotelslice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { DeleteHotel } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { queryClient } from "@/lib/utils";

const AllHotels = ({ owners = [], isLoading, open, handleChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

const { mutate: removeHotel, isPending } = useMutation({
  mutationFn: (hotelId) =>
    new Promise((resolve) => {
      setTimeout(async () => {
        const response = await DeleteHotel(hotelId);
        resolve(response);
      }, 1000);
    }),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["owner-hotels"],
    });
  },

  onError: (error) => {
    console.log(error);
  },
});
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[60vh]">
        <Loader2Icon className="w-30 h-30 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 p-6">
      {owners?.map((hotel) => (
        <Card
          key={hotel?._id}
          className="overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg"
        >
          {/* Image */}
          <div
            className="relative h-56"
            onClick={() => navigate(`/detail/${hotel?._id}`)}
          >
            <img
              loading="lazy"
              fetchPriority="high"
              src={
                `${hotel.images[0].url}?w=600&q=80` ||
                "https://placehold.co/600x400?text=Hotel"
              }
              alt={hotel?.name}
              className="h-full w-full object-cover"
            />

            <Badge
              className={`absolute right-3 top-3 ${
                hotel?.status === "APPROVED"
                  ? "bg-green-600"
                  : hotel?.status === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-red-600"
              }`}
            >
              {hotel?.status}
            </Badge>
          </div>

          <CardContent className="space-y-4 p-5">
            <div>
              <h2 className="text-xl font-semibold">{hotel?.name}</h2>

              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {hotel?.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>
                {hotel?.location.address}, {hotel?.location.city},{" "}
                {hotel?.location.state}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{hotel?.rating}</span>
                <span className="text-muted-foreground">
                  ({hotel?.totalReviews} Reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {hotel?.amenities?.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              <span>
                Created {new Date(hotel?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button
              className="flex-1 cursor-pointer"
              onClick={() => navigate(`/detail/${hotel?._id}`)}
            >
              View
            </Button>
            {/* <Button
              onClick={() => {
                setDeletingId(hotel._id);
                removeHotel(hotel?._id);
              }}
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              {isPending ? "Deleting" : "Delete"}
            </Button> */}

            <Button
              onClick={() => {
                setDeletingId(hotel._id);
                removeHotel(hotel._id);
              }}
              disabled={isPending && deletingId === hotel._id}
              variant="outline"
              className="flex-1 cursor-pointer"
            >
              {isPending && deletingId === hotel._id ? "Deleting..." : "Delete"}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* <div className="flex justify-center items-center w-full min-h-[300px]">
  {isLoading && (
    <div className="flex justify-center items-center">
      <Loader2Icon className="w-12 h-12 animate-spin text-gray-500" />
    </div>
  )}
</div> */}
    </div>
  );
};

export default AllHotels;
