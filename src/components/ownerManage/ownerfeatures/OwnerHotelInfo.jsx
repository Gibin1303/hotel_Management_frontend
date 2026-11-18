const OwnerHotelInfo = ({ description }) => {

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">
        About Hotel
      </h2>


      <p className="text-gray-600 leading-7">
        {description || "No description available"}
      </p>


    </div>
  );
};


export default OwnerHotelInfo;