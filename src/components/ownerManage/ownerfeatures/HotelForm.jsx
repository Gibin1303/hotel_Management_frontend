import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import hotelSchema from "../schema/hotel.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  addHotels,
  updateHotel,
} from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const AMENITIES = [
  "AC",
  "WiFi",
  "Swimming Pool",
  "Restaurant",
  "Parking",
  "Gym",
  "Spa",
  "Room Service",
  "TV",
  "Laundry",
];

const HotelForm = ({ onSuccess, hotelId }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const queryClient = useQueryClient();

  const isEdit = Boolean(hotelId);

  const form = useForm({
    resolver: zodResolver(hotelSchema),

    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      amenities: [],
      images: null,
    },
  });

  const toggleAmenity = (item) => {
    const updated = selectedAmenities.includes(item)
      ? selectedAmenities.filter((a) => a !== item)
      : [...selectedAmenities, item];

    setSelectedAmenities(updated);

    form.setValue("amenities", updated);
  };

  const cachedHotels = queryClient.getQueryData(["owner-hotels"]);

  if (cachedHotels) {
    console.log("Cached hotels:", cachedHotels);
  }

  const { mutate: createHotel, isPending } = useMutation({
    // mutationFn: addHotels,
    mutationFn: (data) => {
      if (isEdit) {
        return updateHotel(hotelId, data);
      }
      return addHotels(data);
    },

    onSuccess: (data) => {
      console.log("Hotel created:", data);

      queryClient.invalidateQueries({
        queryKey: ["owner-hotels"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      form.reset();
      setSelectedAmenities([]);

      onSuccess?.();
    },

    onError: (error) => {
      console.log("Create failed:", error);
    },
  });

  const submit = (values) => {
    // try {
    const data = new FormData();

    data.append("name", values.name);
    data.append("description", values.description);

    data.append("location[address]", values.address);
    data.append("location[city]", values.city);
    data.append("location[state]", values.state);
    data.append("location[country]", values.country);

    values.amenities.forEach((item) => {
      data.append("amenities", item);
    });

    if (values.images && values.images.length > 0) {
      Array.from(values.images).forEach((file) => {
        data.append("images", file);
      });
    }
    createHotel(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6 bg-white">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <label className="mb-3 block font-medium">Amenities</label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AMENITIES.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />

                {item}
              </label>
            ))}
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Images</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Hotel Images</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;

                    console.log("Selected files:", files);

                    onChange(files);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          {isPending
            ? "Submitting..."
            : isEdit
              ? "Save Changes"
              : "Create Hotel"}
        </Button>
      </form>
    </Form>
  );
};

export default HotelForm;
