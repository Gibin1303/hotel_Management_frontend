import OwnerHotelInfo from "./OwnerHotelInfo";

const OwnerHotelHeader = ({ hotel }) => {

  return (
    <div className="space-y-3">

      {/* Hotel Name */}
      <h1 className="text-3xl font-bold text-gray-900">
        {hotel?.name}
      </h1>


      {/* Rating and Reviews */}
      <div className="flex items-center gap-3 text-sm">

        <div className="flex items-center gap-1">
          <span className="text-yellow-500">
            ⭐
          </span>

          <span className="font-medium">
            {hotel?.rating || 0}
          </span>
        </div>


        <span className="text-gray-500">
          {hotel?.totalReviews || 0} Reviews
        </span>


      </div>


      {/* Location */}
      <p className="text-gray-600">
        📍 {hotel?.location?.city},{" "}
        {hotel?.location?.state}
      </p>

    </div>
  );
};

export default OwnerHotelHeader;