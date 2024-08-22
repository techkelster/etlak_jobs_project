import JobHeader from "./JobHeader";
import JobBody from "./JobBody";
import Link from "next/link";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  img: string;
  description: string;
  eventId: string;
  booked: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  img,
  description,
  eventId,
  booked,
}) => {
  return (
    <div className="border-2 w-[919px] ml-24 mt-16 p-4 rounded-xl">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        <JobHeader
          booked={booked}
          eventId={eventId}
          title={title}
          company={company}
          location={location}
          img={img}
        />
      </Link>
      <JobBody description={description} />
    </div>
  );
};

export default JobCard;
