import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RoomAmenities = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenities",
  });

  return (
    <div className="space-y-3">
      <Button type="button" onClick={() => append("")}>
        Add Amenity
      </Button>

      {fields.map((field, index) => (        
        <div key={field.id} className="flex gap-2">
          <Input
            placeholder="WiFi"
            {...control.register(`amenities.${index}`)}
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}

    

    </div>
  );
};

export default RoomAmenities;
