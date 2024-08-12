import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
