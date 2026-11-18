import AllHotels from "@/components/ownerManage/ownerfeatures/AllHotels";
import { getOwnersHotels } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

const AllhotelsOwners = () => {
  //   const [owners, setOwners] = useState([]);
  //   useEffect(() => {
  //     const fetchHotels = async () => {
  //       try {
  //         const data = await getOwnersHotels();
  //         setOwners(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchHotels();
  //   }, []);

  // const {data,loading} = useQuery()

  const [open, setOpen] = useState(false);

  //    function handleChange(){
  //     setOpen(!open)
  //    }

  function handleChange() {
    setOpen((prev) => !prev);
  }

  const {
    data: owners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["owner-hotels"],
    queryFn: () => getOwnersHotels(),
  });
  return (
    <div className="">
      <AllHotels
        owners={owners}
        isLoading={isLoading}
        handleChange={handleChange}
        open={open}
      />
    </div>
  );
};

export default AllhotelsOwners;
