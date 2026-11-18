import { Hotel } from "lucide-react";
import { data } from "react-router-dom";

const TotalHotelsCard = ({ totalHotels }) => {
  // const dataDashboard = totalHotels;

  // function getData() {
  //   for (const item in dataDashboard) {
  //   return  dataDashboard[item];

  //     // console.log(dataDashboard[item], "item");
  //   }
  // }

const converData = Object.entries(totalHotels || {}).map(([name, value]) => ({
  name: {
    totalHotels: "Hotels",
    totalRooms: "Rooms",
    totalBookings: "Bookings",
    cancelledBookings: "Cancelled",
    revenue: "Revenue",
  }[name],
  value,
}));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-100 opacity-50" />

      <div className="relative flex items-center justify-between">
        <div>
          {/* <p className="text-sm font-medium text-slate-500">Total Hotels</p> */}
          <p className="text-2xl text-orange-400 text-center  font-bold">
            {" "}
            Hotels Details
          </p>
          <div className="flex flex-wrap gap-3 justify-start items-center p-3  mt-8">
            {/* {Object?.entries(totalHotels || {})?.map(([key, value]) => (
              <div key={key} className="bg-gray-600 p-2  rounded-xl">
                <div className="text-white p-3">
                  <p className="text-md font-bold">
                    {" "}
                    <span className="uppercase">{key}</span>:{" "}
                    <span className="text-orange-400 font-extrabold">
                      {value}
                    </span>
                  </p>
                </div>
              </div>
            ))} */}

            {converData.map((item)=>(
              <div key={item.name} className="bg-gray-600 p-2  rounded-xl">
                <div className="text-white p-3">
                  <p className="text-md font-bold">
                    {" "}
                    <span className="">{item.name}</span>:{" "}
                    <span className="text-orange-400 font-extrabold">
                      {item.value}
                    </span>
                  </p>
                </div>
              </div>
            ))}


           {/* {converData.map((item) => (
    <div key={item.name}>
      <strong>{item.name}</strong>: {item.value}
    </div>
  ))} */}

           
          </div>

          <p className="mt-2 text-sm text-slate-400">Registered properties</p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 absolute top-0 right-0">
          <Hotel className="h-8 w-8 text-amber-600" />
        </div>
      </div>
    </div>
  );
};

export default TotalHotelsCard;
