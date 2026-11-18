import OwnerHotelsSingle from "@/components/ownerManage/ownerfeatures/OwnerHotelsSingle";
import { getOwnerHotelsDetail } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const OwnerHotelDeatail = () => {

  const {id} = useParams()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["owner-hotel", id],
    queryFn: () => getOwnerHotelsDetail(id),
    enabled: !!id,
  });

  console.log(data, "owner deatail page");
  
  return <div>
    <OwnerHotelsSingle hotel={data}/>
  </div>;
};

export default OwnerHotelDeatail;
