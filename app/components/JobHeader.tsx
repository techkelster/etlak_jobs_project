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
    <div>
      <img src={img} alt="company logo" />

      <div>
        <p>{title}</p>
        <div>
          <span>{company}</span>
          <span>{location}, Ethiopia</span>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
