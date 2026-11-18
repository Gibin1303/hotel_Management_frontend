import React from "react";
import TotalHotelsCard from "./ownerfeatures/HotelsCards";
import BookingChart from "./ownerfeatures/BookingChart";

const AllOwners = ({ totalHotels, recentBookings = [] }) => {
  // >>>>>>>>>>>>>>>>>>>>>>new <<<<<<<<<<<<

  const chartData = Object.entries(totalHotels || {}).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const convertedData = chartData.map((item) => ({
    name: {
      totalHotels: "Hotels",
      totalRooms: "Rooms",
      totalBookings: "Bookings",
      cancelledBookings: "Cancelled",
      revenue: "Revenue",
    }[item.name],
    value: item.value,
  }));

  //   const recentData = (recentBookings || []).map((item) => {
  //   let data = [];
  //   const checkIn = item.checkIn;
  //   const checkOut = item.checkOut;
  //   const BookingNumber = item.bookingNumber;
  //   for (const guest in item.guests) {
  //     console.log(guest);
  //     data.push(guest); // adults, children
  //   }

  //   return {
  //     checkIn: checkIn,
  //     checkOut,
  //     BookingNumber,
  //     guests: data,
  //   };
  // });

  const recentData = recentBookings.map((item) => ({
    name: new Date(item.checkIn).toLocaleDateString(),
    value: item.priceDetails?.totalAmount,
  }));


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TotalHotelsCard totalHotels={totalHotels} />
        <BookingChart title="Booking Data" data={convertedData} />
        <BookingChart title="Recent Bookings" data={recentData} />
      </div>
    </>
  );
};

export default AllOwners;
