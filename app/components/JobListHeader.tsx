import jobs from "./../../public/assets/jobs.json";
import { useGetAllJobsQuery } from "../redux/service/jobsApi";

const JobListHeader: React.FC = () => {
  const { data, isLoading, isError } = useGetAllJobsQuery();
  const results: number = isLoading || isError ? 0 : data.data.length;

  return (
    <div className="flex flex-wrap justify-between items-center w-4/5 pt-16 pl-24">
      <div>
        <p className="font-extrabold text-3xl">Opportunities</p>
        <span className="font-extralight">Showing {results} results</span>
      </div>
      <div className="">
        <label htmlFor="sort" className="p-0 m-0 font-extralight">
          Sort by:
        </label>
        <select id="sort" className="font-bold">
          <option value="imp">Most Relevant</option>
          <option value="ord">Letter</option>
        </select>
      </div>
    </div>
  );
};

export default JobListHeader;
