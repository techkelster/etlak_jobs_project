interface JobBodyProps {
  description: string;
}

const JobBody: React.FC<JobBodyProps> = ({ description }) => {
  return (
    <div className="ml-[80px] mt-[10px]">
      <p>{description}</p>
      <div className="flex gap-2 mt-5">
        <span className="one px-3 h-7 rounded-3xl">In Person</span>
        <span className="two px-3 h-7 rounded-3xl">Education</span>
        <span className="three px-6 h-7 rounded-3xl">IT</span>
      </div>
    </div>
  );
};

export default JobBody;
