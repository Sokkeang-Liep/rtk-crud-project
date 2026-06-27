"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/services/ecommerce";
import { productSchema, ProductFormData } from "@/lib/productSchema";
import { Upload } from "lucide-react";
import { FileUploadFillProgressDemo } from "./UploadFile";

export default function ProductForm() {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      computerSpec: {
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        os: "",
        screenSize: "",
        battery: "",
      },
      stockQuantity: 0,
      priceIn: 0,
      priceOut: 0,
      discount: 0,
      thumbnail: "",
      warranty: "",
      availability: true,
      categoryUuid: "",
      supplierUuid: "",
      brandUuid: "",
      color: [],
      images: [],
    },
  });

  // COLORS
  const {
    fields: colorFields,
    append: addColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "color",
  });

  // IMAGES
  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = async (data: ProductFormData) => {
    console.log("SUBMIT DATA:", data);

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h1 className="text-xl font-bold">Create Product</h1>

      {/* BASIC INFO */}
      <input {...register("name")} placeholder="Name" className="input" />
      <p className="text-red-500">{errors.name?.message}</p>

      <textarea
        {...register("description")}
        placeholder="Description"
        className="input"
      />

      {/* COMPUTER SPEC */}
      <h2 className="font-semibold">Computer Spec</h2>

      <div className="grid grid-cols-2 gap-2">
        <input
          {...register("computerSpec.processor")}
          placeholder="CPU"
          className="input"
        />
        <input
          {...register("computerSpec.ram")}
          placeholder="RAM"
          className="input"
        />
        <input
          {...register("computerSpec.storage")}
          placeholder="Storage"
          className="input"
        />
        <input
          {...register("computerSpec.gpu")}
          placeholder="GPU"
          className="input"
        />
        <input
          {...register("computerSpec.os")}
          placeholder="OS"
          className="input"
        />
        <input
          {...register("computerSpec.screenSize")}
          placeholder="Screen"
          className="input"
        />
        <input
          {...register("computerSpec.battery")}
          placeholder="Battery"
          className="input"
        />
      </div>

      {/* NUMBERS */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          {...register("stockQuantity", { valueAsNumber: true })}
          placeholder="Stock"
          className="input"
        />
        <input
          type="number"
          {...register("priceIn", { valueAsNumber: true })}
          placeholder="Price In"
          className="input"
        />
        <input
          type="number"
          {...register("priceOut", { valueAsNumber: true })}
          placeholder="Price Out"
          className="input"
        />
        <input
          type="number"
          {...register("discount", { valueAsNumber: true })}
          placeholder="Discount"
          className="input"
        />
      </div>

      {/* THUMBNAIL */}
      {/* <input
        {...register("thumbnail")}
        placeholder="Thumbnail URL"
        className="input"
      /> */}
      <FileUploadFillProgressDemo
        onUploaded={(url) => {
          setValue("thumbnail", url, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />

      {errors.thumbnail && (
        <p className="text-red-500">{errors.thumbnail.message}</p>
      )}
      <input
        {...register("warranty")}
        placeholder="Warranty"
        className="input"
      />

      {/* IDS */}
      <input
        {...register("categoryUuid")}
        placeholder="Category UUID"
        className="input"
      />
      <input
        {...register("supplierUuid")}
        placeholder="Supplier UUID"
        className="input"
      />
      <input
        {...register("brandUuid")}
        placeholder="Brand UUID"
        className="input"
      />

      {/* COLORS */}
      <div>
        <h2 className="font-semibold">Colors</h2>

        {colorFields.map((field, index) => (
          <div key={field.id} className="border p-2 mb-2 rounded">
            <input
              {...register(`color.${index}.color` as const)}
              placeholder="Color name"
              className="input"
            />

            <input
              {...register(`color.${index}.images.0` as const)}
              placeholder="Image URL"
              className="input"
            />

            <button type="button" onClick={() => removeColor(index)}>
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addColor({
              color: "",
              images: [""],
            })
          }
          className="bg-gray-200 px-3 py-1 rounded"
        >
          + Add Color
        </button>
      </div>

      {/* IMAGES */}
      <div>
        <h2 className="font-semibold">Images</h2>

        {imageFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`images.${index}` as const)}
              placeholder="Image URL"
              className="input"
            />
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addImage("")}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          + Add Image
        </button>
      </div>

      {/* SUBMIT */}
      <button
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {isLoading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}