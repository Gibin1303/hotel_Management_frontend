import OwnerHotelActions from "./OwnerHotelActions";
import OwnerHotelAmenities from "./OwnerHotelAmenities";
import OwnerHotelGallery from "./OwnerHotelGallery ";
import OwnerHotelHeader from "./OwnerHotelHeader";
import OwnerHotelInfo from "./OwnerHotelInfo";
import OwnerHotelLocation from "./OwnerHotelLocation";
import OwnerHotelStatus from "./OwnerHotelStatus";

const OwnerHotelsSingle = ({ hotel }) => {
  if (!hotel) {
    return <p>Loading...</p>;
  }

  console.log(hotel?.location, "thddb");

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <OwnerHotelGallery images={hotel.images} />
      <OwnerHotelHeader hotel={hotel} />
      <OwnerHotelInfo description={hotel?.description} />
      <OwnerHotelLocation location={hotel?.location} />
      <OwnerHotelAmenities amenities={hotel.amenities} />
      <OwnerHotelStatus status={hotel.status} />
      <OwnerHotelActions hotelId={hotel._id} />
    </div>
  );
};

export default OwnerHotelsSingle;
