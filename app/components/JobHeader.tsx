import {
  useCreateBookmarkMutation,
  useUnbookmarkMutation,
} from "../redux/service/jobsApi";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface JobHeaderProps {
  title: string;
  company: string;
  location: string;
  img: string;
  eventId: string;
  booked: boolean;
}

const JobHeader: React.FC<JobHeaderProps> = ({
  title,
  company,
  location,
  img,
  eventId,
  booked,
}) => {
  const [createBookMark, { isLoading: isCreating }] =
    useCreateBookmarkMutation();
  const [unBookMark, { isLoading: isUnbooking }] = useUnbookmarkMutation();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  async function handleBookClick(id: string, token: string) {
    try {
      if (booked) {
        await unBookMark({
          eventID: id,
          token: token,
        });
        setModalMessage("Job successfully unbookmarked.");
      } else {
        await createBookMark({
          eventID: id,
          token: token,
        });
        setModalMessage("Job successfully bookmarked.");
      }
      setShowModal(true);
    } catch (err) {
      console.log(err);
      setModalMessage("An error occurred.");
      setShowModal(true);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="relative flex items-center justify-start">
      <img src={img} alt="company logo" className="mr-4 w-16" />

      <div>
        <p className="text-xl font-bold">{title}</p>
        <div className="flex font-extralight items-center">
          <span>{company}</span>
          <span className="ml-1 mr-1">.</span>
          <span>{location}</span>
        </div>
      </div>

      <img
        src={booked ? "assets/booked.svg" : "assets/unbooked.svg"}
        alt="bookmark icon"
        className={`ml-auto mr-4 w-10 cursor-pointer ${
          isCreating || isUnbooking ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          handleBookClick(eventId, session?.user.accessToken || "")
        }
      />

      {/* Loading Spinner */}
      {(isCreating || isUnbooking) && (
        <div className="absolute right-4 w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      )}

      {/* Modal Notification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobHeader;
