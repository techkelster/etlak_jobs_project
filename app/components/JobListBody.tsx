"use client";

import Link from "next/link";
import JobCard from "./JobCard";
import { useGetAllJobsQuery } from "../redux/service/jobsApi";
import { Job } from "../redux/service/jobsApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorComponent from "./Error";

const JobListBody: React.FC = () => {
  const { data, isLoading, isError } = useGetAllJobsQuery();

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        data.data?.map((item: Job, index: number) => (
          <Link
            key={index}
            href={{
              pathname: "/components/description",
              query: { index: index, job: JSON.stringify(item) },
            }}
          >
            <JobCard
              title={item.title}
              company={item.orgName}
              location={item.location.join(" ")}
              img={item.logoUrl}
              description={item.description}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default JobListBody;
