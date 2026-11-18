import { MapPin } from "lucide-react";

const OwnerHotelLocation = ({ location }) => {



    console.log(location," data from location compo");
    

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">
        Location
      </h2>


      <div className="flex gap-3 items-start">

        <MapPin className="w-5 h-5 text-gray-600 mt-1" />


        <div className="text-red-600">

          <p>
            {location?.address}
          </p>


          <p>
            {location?.city},{" "}
            {location?.state}
          </p>


          <p>
            {location?.country}
          </p>

        </div>

      </div>

    </div>
  );
};


export default OwnerHotelLocation;