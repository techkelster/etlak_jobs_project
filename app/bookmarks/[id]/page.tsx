"use client";
import React from "react";
import MainDescription from "@/app/components/description/MainDescription";
import SideBarDescription from "@/app/components/description/SideBarDescription";
import { useGetajobQuery } from "@/app/redux/service/jobsApi";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { data, isLoading, isError } = useGetajobQuery({
    id: params.id || " ",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Handling error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load the job details. Please try again later.
        </p>
      </div>
    );
  }

  // Parsing and rendering the job data if successful
  const job = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <MainDescription
            description={job.description}
            responsiblities={job.responsibilities}
            traits={job.idealCandidate}
            age={"any"}
            gender={"any"}
            whenAndWhere={job.whenAndWhere}
          />
        </div>
        <div className="md:w-1/3">
          <SideBarDescription
            posted_on={job.datePosted}
            deadline={job.deadline}
            location={job.location.join(", ")}
            start_date={job.startDate}
            end_date={job.endDate}
            catagories={job.categories}
            required_skills={job.requiredSkills}
          />
        </div>
      </div>
    </div>
  );
}
