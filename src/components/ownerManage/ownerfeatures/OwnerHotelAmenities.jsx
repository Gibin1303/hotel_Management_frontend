import { Check } from "lucide-react";
import OwnerHotelStatus from "./OwnerHotelStatus";

const OwnerHotelAmenities = ({ amenities }) => {

  if (!amenities || amenities.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold">
          Amenities
        </h2>

        <p className="text-gray-500">
          No amenities added
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">
        Amenities
      </h2>


      <div className="flex flex-wrap gap-3">

        {
          amenities.map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-gray-100
                text-gray-700
              "
            >

              <Check className="w-4 h-4 text-green-600" />

              <span>
                {item}
              </span>

            </div>
          ))
        }

      </div>


      <div>

      </div>

    </div>
  );
};


export default OwnerHotelAmenities;