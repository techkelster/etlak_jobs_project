import { useGetAllJobsQuery } from "../redux/service/jobsApi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

const JobListHeader: React.FC = () => {
  const { data, isLoading, isError } = useGetAllJobsQuery();
  const results: number = isLoading || isError ? 0 : data.data.length;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signIn");
    },
  });

  return (
    <div className="flex flex-wrap justify-between items-center w-4/5 pt-16 pl-24">
      <div>
        <p className="font-extrabold text-3xl">Opportunities</p>
        <span className="font-extralight">Showing {results} results</span>
      </div>
      <div className="">
        <div className="flex">
          <label htmlFor="sort" className="p-0 m-0 font-extralight">
            Sort by:
          </label>
          <select id="sort" className="font-bold">
            <option value="imp">Most Relevant</option>
            <option value="ord">Letter</option>
          </select>
          <div className="flex justify-center items-center fixed top-5 left-95 right-5 rounded-md w-auto h-10 back-brand-color text-white ml-5">
            {session ? (
              <Link href="/api/auth/signout?callbackUrl=/">
                <span className="brand-text-color  ml-4">
                  <span className="font-thin">Logout </span>{" "}
                  <span className="font-bold">{session?.user?.name}</span>
                </span>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <span className="brand-text-color font-bold ml-4">Login</span>
              </Link>
            )}
          </div>
          <Link href="/bookmark">
            <div className="flex justify-center items-end fixed top-5 left-0 right-95 ml-5">
              <img src="/assets/booked.svg" alt="" className="mr-4 w-10" />{" "}
              <span className="rounded-md w-auto h-10 text-white back-brand-color  mr-1">
                Bookmarks
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListHeader;
