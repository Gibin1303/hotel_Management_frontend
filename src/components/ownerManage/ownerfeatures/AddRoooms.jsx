import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import RoomCapacity from "./RoomCapacity";
import RoomAmenities from "./RoomAmenities";
import RoomImagesUpload from "./RoomImagesUpload";
import { useMutation } from "@tanstack/react-query";
import { addRooms } from "@/fetures/HotelsDetail/services/getDetailHotel";
import { useParams } from "react-router-dom";

const RoomForm = () => {
  const { id } = useParams();

  const {
    mutate: addRoom,
    isPending,
    error,
  } = useMutation({
    mutationFn: addRooms,

    onSuccess: (response) => {
      console.log("Room added", response);
    },

    onError: (error) => {
      console.log(error);
    },
  });
  const form = useForm({
    defaultValues: {
      hotelId: id,
      roomType: "",
      description: "",
      price: "",
      quantity: "",

      capacity: {
        adults: 1,
        children: 0,
      },

      amenities: [],

      images: [],
    },
  });

  //   const onSubmit = (data) => {
  //     // console.log(data);
  //     addRoom({ id, data });
  //   };
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("roomType", data.roomType);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);

    formData.append("capacity", JSON.stringify(data.capacity));

    formData.append("amenities", JSON.stringify(data.amenities));

    data.images.forEach((file) => {
      formData.append("images", file);
    });

    addRoom({
      hotelId: id,
      data: formData,
    });
  };
  return (
    <Form {...form}>
        <div className="w-full">
      <div className="w-1/2 mr-auto ml-auto text-center mb-5 bg-gray-200 p-3 rounded-full">
        <h1 className="text-4xl font-extrabold">Add Rooms</h1>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-10 bg-black/30 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>

                <FormControl>
                  <Input placeholder="Deluxe Room" {...field} />
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
                  <Textarea placeholder="Room description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Per Night</FormLabel>

                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>

                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <RoomCapacity control={form.control} />

          <RoomAmenities control={form.control} />

          <RoomImagesUpload setValue={form.setValue} />
        </div>

        <Button>Create Room</Button>
      </form>
      </div>
    </Form>
  );
};

export default RoomForm;
