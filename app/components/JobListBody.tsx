import Link from "next/link";
import jobs from "./../../public/assets/jobs.json";
import JobCard from "./JobCard";

const JobListBody: React.FC = () => {
  const jobs_arr = jobs.job_postings;
  return (
    <div>
      {jobs_arr.map((item, index) => {
        return (
          <Link
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
