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
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => ({ url: "opportunities/search", method: "get" }),
    }),
  }),
});

export const { useGetAllJobsQuery } = jobsApi;
