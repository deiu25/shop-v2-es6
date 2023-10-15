import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: () => "/admin/orders",
    }),

    getProducts: builder.query({
      query: () => "/products",
    }),
    getAdminProducts: builder.query({
      query: () => "/admin/products",
    }),
    newProduct: builder.mutation({
        query: (productData) => ({
            url: '/admin/product/new',
            method: 'POST',
            body: productData,
        }),
        invalidatesTags: [{ type: 'Product' }],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/admin/product/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" }],
    }),

    allUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/admin/users/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
  }),
});

export const {
    useAllOrdersQuery,
    useGetProductsQuery,
    useAllUsersQuery,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetAdminProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useNewProductMutation,
} = adminApi;
