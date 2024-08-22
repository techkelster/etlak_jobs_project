"use client";

import React from "react";
import Link from "next/link";
import { useGetBookmarksQuery } from "../redux/service/jobsApi";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { IoArrowBack } from "react-icons/io5"; // Importing a back arrow icon

interface BookMarkCardProps {
  dateBookmarked: string; // ISO 8601 date string
  datePosted: string; // ISO 8601 date string
  eventID: string; // Unique identifier for the event
  location: string; // Location of the event
  logoUrl: string; // URL to the logo image
  opType: "inPerson" | "online" | "hybrid"; // Operation type, limited to specific strings
  orgName: string; // Name of the organization
  title: string; // Title of the event or position
}

const BookMarkCard: React.FC = () => {
  const { data: session } = useSession();
  const {
    data: dataBookMark,
    isLoading: isBookDataLoading,
    error,
  } = useGetBookmarksQuery({
    token: session?.user.accessToken || "",
  });

  // Handle loading state
  if (isBookDataLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-24 text-red-500">
        Error loading bookmark data.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Back Icon and Title */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <IoArrowBack className="text-2xl text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
        <div className="w-8"></div> {/* Placeholder to balance the header */}
      </div>
      {dataBookMark?.data.map((element: BookMarkCardProps) => (
        <Link key={element.eventID} href={`/bookmarks/${element.eventID}`}>
          <div className="flex flex-col md:flex-row items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer mb-6">
            <img
              src={element.logoUrl}
              alt={`${element.orgName} logo`}
              className="w-20 h-20 object-cover rounded-full border border-gray-300 mr-6"
            />
            <div className="flex-1">
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                {element.title}
              </p>
              <div className="flex items-center text-gray-600 text-base">
                <span>{element.orgName}</span>
                <span className="mx-2">•</span>
                <span>{element.location}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {element.opType.charAt(0).toUpperCase() +
                    element.opType.slice(1)}
                </span>
                <span className="px-4 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  Bookmarked:{" "}
                  {new Date(element.dateBookmarked).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                <span className="px-4 py-1 bg-gray-50 text-gray-700 rounded-full text-sm">
                  Posted:{" "}
                  {new Date(element.datePosted).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookMarkCard;
