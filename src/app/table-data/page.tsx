"use client";
import { useState } from "react";
import {
  columns,
} from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "@/services/ecommerce";
import { toast } from "sonner";
import { UpdateProductType } from "@/lib/products";

export default function DataTablePage() {
  const { data } = useGetAllProductQuery({
    page: 0,
    size: 10000,
  });

  const product: UpdateProductType = {
  name: "Logitech G Pro X Superlight 2",
  description:
    "Professional-grade wireless gaming mouse featuring an ultra-lightweight design, HERO 2 sensor, and long-lasting battery life.",
  stockQuantity: 25,
  priceIn: 85,
  priceOut: 129,
  discount: 10,
  color: [
    {
      color: "Black",
      images: [
        "https://i.pinimg.com/1200x/b6/41/03/b64103d02a9c9a66f6ed6b066d012c92.jpg",
      ],
    },
    {
      color: "White",
      images: [
        "https://i.pinimg.com/1200x/b6/41/03/b64103d02a9c9a66f6ed6b066d012c92.jpg",
      ],
    },
  ],
  thumbnail:
    "https://i.pinimg.com/1200x/b6/41/03/b64103d02a9c9a66f6ed6b066d012c92.jpg",
  warranty: "2 Years Manufacturer Warranty",
    availability: true,
    images: ["string"],
    categoryUuid: "462d9f60-8346-45ab-b8b3-a597d240965b",
    supplierUuid: "a34496d2-370e-4332-8c6d-b4a6bc069bf1",
    brandUuid: "8f2e3bcb-bb0b-45a1-b9bc-1d43f08f0ddb",
  };
  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const handleViewDetail = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const handleDelete = async (uuid: string) => {
    try {
      await deleteProduct(uuid).unwrap();
      toast.success("Product deleted successfully.", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error?.data?.description || "Failed to deleted product", {
        position: "top-center",
      });
    }
  };
  const handleUpdate = async (uuid: string, row: any) => {
    try {
      await updateProduct({ uuid, data: product }).unwrap();
      toast.success("Product updated successfully.", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error?.data?.description || "Failed to updated product", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          onViewDetail: handleViewDetail,
          onDelete: handleDelete,
          onUpdate: (uuid, row) => handleUpdate(uuid, row),
        })}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />
      )}
    </div>
  );
}
