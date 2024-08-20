"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      void,
      {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: string;
      }
    >({
      query: (body) => ({
        url: "signup",
        method: "post",
        body,
      }),
    }),
    verifyEmail: builder.mutation<void, { email: string; OTP: string }>({
      query: (body) => ({
        url: "verify-email",
        method: "post",
        body,
      }),
    }),
    signIn: builder.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: "login",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useVerifyEmailMutation, useSignInMutation } =
  authApi;
