import {
  approveHotels,
  getAdminAllHotel,
  getAdminOwners,
  rejectHotels,
} from "@/fetures/admin/AdminService/Adminservice";
import OwnersTable from "@/fetures/admin/components/OwnersTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { toast } from "sonner";

const AdminOwnerManage = () => {
  const [page, setPage] = useState(1);

  console.log(page, "data page");

  const { data, isLoading, error } = useQuery({
    queryKey: ["allowners"],
    queryFn: getAdminOwners,
  });

  const {
    data: admindata,
    isLoading: pending,
    error: fault,
  } = useQuery({
    queryKey: ["adminallhotels", page],
    queryFn: ({ queryKey }) => {
      const [, page] = queryKey;
      return getAdminAllHotel(page);
    },
    placeholderData: (previousData) => previousData,
  });

  const approveMutation = useMutation({
    mutationFn: approveHotels,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleApprove = async (id) => {
    await approveMutation.mutateAsync(id);
  };

  const rejectMutataions = useMutation({
    mutationFn: rejectHotels,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handlerejectHotels = async (id) => {
    await rejectMutataions.mutateAsync(id);
  };
  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");

  const ownerColumns = [
    {
      header: "Owner",
      cell: (owner) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={owner.avatar} />
            <AvatarFallback>{initials(owner.name)}</AvatarFallback>
          </Avatar>

          <div>
            <p>{owner.name}</p>
            <p className="text-sm text-muted-foreground">{owner.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Phone",
      cell: (owner) => owner.phone || "—",
    },
    {
      header: "Status",
      cell: (owner) => <Badge>{owner.status}</Badge>,
    },
  ];

  const hotelColumns = [
    {
      header: "Hotel Name",
      cell: (hotel) => hotel.name,
    },
    {
      header: "Owner",
      cell: (hotel) => (
        <div>
          <p className="font-medium">{hotel.ownerId?.name}</p>
          <p className="text-sm text-muted-foreground">
            {hotel?.ownerId?.email}
          </p>
        </div>
      ),
    },
    {
      header: "Location",
      cell: (hotel) => (
        <div>
          <p>{hotel.location?.city}</p>
          <p className="text-sm text-muted-foreground">
            {hotel.location?.state}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (hotel) => <Badge>{hotel.status}</Badge>,
    },
    {
      header: "Rating",
      cell: (hotel) => `${hotel.rating ? hotel.rating : 5} ⭐`,
    },
    {
      header: "Reviews",
      cell: (hotel) => hotel.totalReviews,
    },
    {
      header: <div className="text-center">Action</div>,
      cell: (hotel) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(hotel._id)}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            APPROVE
          </button>
          <button
            onClick={() => handlerejectHotels(hotel.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            REJECT
          </button>
        </div>
      ),
    },
  ];

  const hotelsCount = admindata?.hotels?.length ?? 0;

  function onPageChange(newpage) {
    setPage(newpage);
  }
  return (
    <div className="grid grid-cols-2 gap-5">
      <OwnersTable
        data={data?.owners}
        paginations={data?.pagination}
        columns={ownerColumns}
      />
      <OwnersTable
        data={admindata?.hotels ?? []}
        columns={hotelColumns}
        paginations={admindata?.pagination}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AdminOwnerManage;
