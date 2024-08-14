interface JobBodyProps {
  description: string;
}

const JobBody: React.FC<JobBodyProps> = ({ description }) => {
  return (
    <div>
      <p>{description}</p>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
