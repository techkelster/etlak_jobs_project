interface JobHeaderProps {
  title: string;
  company: string;
  location: string;
  img: string;
}

const JobHeader: React.FC<JobHeaderProps> = ({
  title,
  company,
  location,
  img,
}) => {
  return (
    <div className="flex items-center">
      <img src={img} alt="company logo" className="mr-4 w-16" />

      <div>
        <p className="text-xl font-bold">{title}</p>
        <div className="flex font-extralight items-center">
          <span>{company}</span>
          <span className="ml-1 mr-1">.</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
