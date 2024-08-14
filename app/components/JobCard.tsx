import JobHeader from "./JobHeader";

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
    <div>
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
