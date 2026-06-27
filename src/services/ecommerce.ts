

import { CreateProductType, ProductResponse, ProductType, UpdateProductType } from '@/lib/products';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ISHOP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

      console.log("TOKEN:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getAllProduct: builder.query<
      ProductResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => `/products?page=${page}&size=${size}`,
      providesTags: ["Product"],
    }),

    // GET PRODUCT BY UUID
    getProductByUuid: builder.query<ProductType, string>({
      query: (uuid) => `/products/${uuid}`,
      providesTags: ["Product"],
    }),

    // CREATE PRODUCT
    createProduct: builder.mutation<ProductType, CreateProductType>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation<
      ProductType,
      {
        uuid: string;
        updateProduct: UpdateProductType;
      }
    >({
      query: ({ uuid, updateProduct }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        body: updateProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    // DELETE PRODUCT
    deleteProductByUuid: builder.mutation<void, string>({
      query: (uuid) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByUuidQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByUuidMutation,
} = ecommerceApi;