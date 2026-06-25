import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type UserLoginType ={ 
    email :string,
    password:string
}
export type UserRegisterType ={
  username: string,
  phoneNumber: string,
  address: {
    addressLine1: string,
    addressLine2: string,
    road: string,
    linkAddress: string
  },
  email: string,
  password: string,
  confirmPassword: string,
  profile: string
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ISHOP_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserLoginType, unknown>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    registerUser: builder.mutation<UserRegisterType, unknown>({
      query: (body) => ({
        url: "/users/user-signup",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {useLoginUserMutation,useRegisterUserMutation} = authApi;