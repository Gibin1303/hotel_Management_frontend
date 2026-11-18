import BookingChart from "@/components/ownerManage/ownerfeatures/BookingChart";
import { getAdminusersAll } from "@/fetures/admin/AdminService/Adminservice";
import UsersTable from "@/fetures/admin/components/UsersTable";
import { getDashboardData } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardData(),
  });

  console.log(data);

  const dashboardData = data;

  const chartData = [
    {
      name: "Hotels",
      value: dashboardData?.hotels || 0,
    },
    {
      name: "Users",
      value: dashboardData?.users || 0,
    },
  ];

  console.log(chartData, "Admindata");

  return (
    <div className="grid grid-cols-2 gap-4">
      <BookingChart title="Admin Details" data={chartData} />
      <BookingChart title="Admin Details" data={chartData} />
    </div>
  );
};

export default AdminDashboard;
