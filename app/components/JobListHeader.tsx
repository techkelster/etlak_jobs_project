import jobs from "./../../public/assets/jobs.json";

const JobListHeader: React.FC = () => {
  const results: number = jobs.job_postings.length;

  return (
    <div>
      <div>
        <p>Opportunities</p>
        <span>Showing {results} results</span>
      </div>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort">
          <option value="imp">Most Relevant</option>
          <option value="ord">Alphabet</option>
        </select>
      </div>
    </div>
  );
};

export default JobListHeader;
