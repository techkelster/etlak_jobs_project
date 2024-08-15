"use client";
import MainDescription from "./MainDescription";
import SideBarDescription from "./SideBarDescription";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const search = useSearchParams();
  const index = search.get("index");
  const job = JSON.parse(search.get("job") || "");
  return (
    <>
      <div className="flex gap-20">
        <MainDescription
          description={job.description}
          responsiblities={job.responsibilities}
          traits={job.idealCandidate}
          age={"any"}
          gender={"any"}
          whenAndWhere={job.whenAndWhere}
        />
        <SideBarDescription
          posted_on={job.datePosted}
          deadline={job.deadline}
          location={job.location.join("")}
          start_date={job.startDate}
          end_date={job.endDate}
          catagories={job.categories}
          required_skills={job.requiredSkills}
        />
      </div>
    </>
  );
}
