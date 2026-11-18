import { ImageOff } from "lucide-react";

const OwnerHotelGallery = ({ images }) => {

  if (!images || images.length === 0) {
    return (
      <div className="h-80 rounded-xl bg-gray-100 flex flex-col items-center justify-center">
        <ImageOff className="w-10 h-10 text-gray-400" />
        <p className="text-gray-500 mt-2">
          No images available
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[0]?.url}
          alt="hotel"
          className="w-full h-96 object-cover"
        />
      </div>


      {/* Other Images */}
      {
        images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">

            {
              images.slice(1).map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt="hotel"
                  className="
                    h-24
                    w-full
                    object-cover
                    rounded-lg
                    cursor-pointer
                    hover:opacity-80
                  "
                />
              ))
            }

          </div>
        )
      }

    </div>
  );
};


export default OwnerHotelGallery;