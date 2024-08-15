"use client";

import Link from "next/link";
import jobs from "./../../public/assets/jobs.json";
import JobCard from "./JobCard";
import { useGetAllJobsQuery } from "../redux/service/jobsApi";

const JobListBody: React.FC = () => {
  const res = useGetAllJobsQuery();

  const data = jobs.job_postings;
  console.log(res);

  const jobs_arr = data;
  return (
    <div>
      {jobs_arr?.map((item, index) => {
        return (
          <Link
            key={index}
            href={{
              pathname: "/components/description",
              query: { index: index },
            }}
          >
            <JobCard
              key={index}
              title={item.title}
              company={item.company}
              location={item.about.location}
              img={item.image}
              description={item.description}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default JobListBody;
