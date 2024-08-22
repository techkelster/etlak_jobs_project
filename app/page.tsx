"use client";

import { Provider } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import JobListBody from "./components/JobListBody";
import JobListHeader from "./components/JobListHeader";
import { store } from "./redux/store";
import LoadingSpinner from "./components/LoadingSpinner";
import { useGetBookmarksQuery } from "./redux/service/jobsApi";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    ); // Optionally handle loading state
  }

  if (!session) {
    router.push("/api/auth/signin");
    return null; // Prevent rendering the rest of the page
  }

  return (
    <Provider store={store}>
      <JobListHeader />
      <JobListBody />
    </Provider>
  );
}
