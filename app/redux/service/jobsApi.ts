"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: "inPerson" | "remote";
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: "open" | "closed";
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  averageRating: number;
  totalReviews: number;
}

export const jobsApi = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  tagTypes: ["BookMark", "Jobs", "Ajob"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => ({ url: "opportunities/search", method: "get" }),
      providesTags: ["Jobs"],
    }),

    getajob: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `opportunities/${id}`,
        method: "get",
      }),

      providesTags: ["Ajob"],
    }),

    getBookmarks: builder.query<any, { token: string }>({
      query: ({ token }) => ({
        url: "bookmarks",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["BookMark"],
    }),

    createBookmark: builder.mutation<any, { eventID: string; token: string }>({
      query: ({ eventID, token }) => ({
        url: `bookmarks/${eventID}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {},
      }),
      invalidatesTags: ["BookMark", "Jobs"],
    }),
    unbookmark: builder.mutation<any, { eventID: string; token: string }>({
      query: ({ eventID, token }) => ({
        url: `bookmarks/${eventID}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["BookMark", "Jobs"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetajobQuery,
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useUnbookmarkMutation,
} = jobsApi;
