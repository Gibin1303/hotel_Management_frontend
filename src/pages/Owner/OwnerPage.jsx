import AllOwners from "@/components/ownerManage/AllOwners";
import { getDashboardData } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const OwnerPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardData(),
  });

  return (
    <div>
      <AllOwners
        totalHotels={data?.overview}
        recentBookings={data?.recentBookings}
      />
    </div>
  );
};

export default OwnerPage;
