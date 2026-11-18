import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RoomImagesUpload = ({ setValue }) => {
  const [preview, setPreview] = useState([]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    // store files in react-hook-form
    setValue("images", files);

    // preview images
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreview(urls);
  };

  return (
    <div className="space-y-4">
      <Label>Room Images</Label>

      <Input type="file" multiple accept="image/*" onChange={handleImages} />

      {/* Preview */}

      <div className="grid grid-cols-3 gap-4">
        {preview.map((image, index) => (
          <img
            key={index}
            src={image}
            className="
              h-32
              w-full
              object-cover
              rounded-lg
              "
          />
        ))}
      </div>
    </div>
  );
};

export default RoomImagesUpload;
