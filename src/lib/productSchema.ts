import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),

  computerSpec: z.object({
    processor: z.string(),
    ram: z.string(),
    storage: z.string(),
    gpu: z.string(),
    os: z.string(),
    screenSize: z.string(),
    battery: z.string(),
  }),

  stockQuantity: z.number(),
  priceIn: z.number(),
  priceOut: z.number(),
  discount: z.number(),

  color: z.array(
    z.object({
      color: z.string(),
      images: z.array(z.string().url()),
    }),
  ),

  thumbnail: z.string().url(),

  warranty: z.string(),

  availability: z.boolean(),

  images: z.array(z.string().url()),

  categoryUuid: z.string(),
  supplierUuid: z.string(),
  brandUuid: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;