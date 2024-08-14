import JobHeader from "./JobHeader";
import JobBody from "./JobBody";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  img: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  img,
  description,
}) => {
  return (
    <div className="border-2 w-[919px] ml-24 mt-16 p-4 rounded-xl">
      <JobHeader
        title={title}
        company={company}
        location={location}
        img={img}
      />
      <JobBody description={description} />
    </div>
  );
};

export default JobCard;
