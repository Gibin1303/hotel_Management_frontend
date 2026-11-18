import { z } from "zod";

export const hotelSchema = z.object({
  name: z
    .string()
    .min(3, "Hotel name must be at least 3 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  address: z
    .string()
    .min(3, "Address is required"),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .default("India"),

  amenities: z.array(z.string()).default([]),

  images: z
    .any()
    .refine((files) => files?.length > 0, "Please upload at least one image"),
});

export default hotelSchema;