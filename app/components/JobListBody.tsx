"use client";

import Link from "next/link";
import JobCard from "./JobCard";
import { useGetAllJobsQuery } from "../redux/service/jobsApi";
import { useGetBookmarksQuery } from "../redux/service/jobsApi";
import { useSession } from "next-auth/react";
import { Job } from "../redux/service/jobsApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorComponent from "./Error";

export interface EventDetails {
  dateBookmarked: string; // ISO 8601 date string
  datePosted: string; // ISO 8601 date string
  eventID: string; // Unique identifier for the event
  location: string; // Location of the event
  logoUrl: string; // URL to the logo image
  opType: "inPerson" | "online" | "hybrid"; // Operation type, limited to specific strings
  orgName: string; // Name of the organization
  title: string; // Title of the event or position
}

const JobListBody: React.FC = () => {
  const { data, isLoading, isError } = useGetAllJobsQuery();
  const { data: session, status } = useSession();
  const {
    data: dataBookMark,
    isLoading: isBookDataLoading,
    error,
  } = useGetBookmarksQuery({
    token: session?.user.accessToken || " ",
  });

  let bookmarks: string[] = [];

  if (!isBookDataLoading && Array.isArray(dataBookMark.data)) {
    dataBookMark.data.forEach((element: EventDetails) => {
      if (element && element.eventID) {
        bookmarks.push(element.eventID);
      }
    });
  }

  if (!isBookDataLoading) console.log(bookmarks, "look at the bookmarks raw");

  return (
    <div>
      {isLoading || isBookDataLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : isError ? (
        <ErrorComponent />
      ) : (
        data.data?.map((item: Job, index: number) => (
          <Link
            key={index}
            href={{
              pathname: "/components/description",
              query: { index: index, job: JSON.stringify(item) },
            }}
          >
            <JobCard
              booked={bookmarks.includes(item.id)}
              eventId={item.id}
              title={item.title}
              company={item.orgName}
              location={item.location.join(" ")}
              img={item.logoUrl}
              description={item.description}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default JobListBody;
