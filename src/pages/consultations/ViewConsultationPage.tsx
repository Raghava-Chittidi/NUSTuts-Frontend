import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutletContext } from "react-router-dom";
import {
  BookedConsultationsView,
  TutorialContextType,
  Consultation,
} from "../../types";
import { getCurrentDateTime } from "../../util/util";
import { isUserStudent } from "../../util/user";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { AuthenticatedUser } from "../../context/AuthContext";
import ConsultationBookingItem from "../../components/consultations/ConsultationBookingItem";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Gets all booked consultations for a student
const getAllBookedConsultationsForStudent = async (
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const studentBookedConsultations = await getAllBookedConsultations(
      true,
      tutorialId,
      date,
      time,
      user
    );
    return studentBookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Gets all booked consultations for a teaching assistant
const getAllBookedConsultationsForTeachingAssistant = async (
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const teachingAssistantBookedConsultations =
      await getAllBookedConsultations(false, tutorialId, date, time, user);
    return teachingAssistantBookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Gets all booked consultations for a student or teaching assistant
const getAllBookedConsultations = async (
  isStudent: boolean,
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const res = isStudent
      ? await axios.get(
          `${BASE_URL}/api/consultations/student/${tutorialId}/${user.id}`,
          {
            params: {
              date: date,
              time: time,
            },
            headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
          }
        )
      : await axios.get(
          `${BASE_URL}/api/consultations/teachingAssistant/${tutorialId}`,
          {
            params: {
              date: date,
              time: time,
            },
            headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
          }
        );
    return res.data.data.bookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Cancels a consultation
export const cancelConsultation = async (
  tutorialId: number,
  consultationId: number,
  user: AuthenticatedUser
): Promise<Consultation | null> => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/consultations/${tutorialId}/cancel/${consultationId}`,
      {},
      {
        params: { userId: user.id },
        headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ViewConsultationPage = () => {
  const { state } = useAuthContext();
  // Gets tutorial id from the page url
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const [bookedConsultations, setBookedConsultations] = useState<
    BookedConsultationsView[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isStudent = isUserStudent(state.user);

  // Initially fetches all booked consultations
  useEffect(() => {
    const fetchBookedConsultations = async () => {
      try {
        const { formattedDate, formattedTime } = getCurrentDateTime();
        const response = isStudent
          ? await getAllBookedConsultationsForStudent(
              tutorialId,
              formattedDate,
              formattedTime,
              state.user
            )
          : await getAllBookedConsultationsForTeachingAssistant(
              tutorialId,
              formattedDate,
              formattedTime,
              state.user
            );
        setBookedConsultations(response);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch consultations!");
        console.log(error);
      }
    };

    fetchBookedConsultations();
  }, []);

  // Cancels a booked consultation.
  // Sets booked consultations after cancelling a consultation.
  // Removes the consultation from the booked consultations list.
  const handleCancelBooking = async (consultationId: number) => {
    try {
      setIsLoading(true);
      await cancelConsultation(tutorialId, consultationId, state.user);
      setBookedConsultations((prev) =>
        prev
          .map((group) => ({
            ...group,
            consultations: group.consultations.filter(
              (consultation) => consultation.id !== consultationId
            ),
          }))
          .filter((group) => group.consultations.length > 0)
      );
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch consultations!");
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-10 px-6 lg:px-14 h-screen w-full overflow-y-auto">
      {bookedConsultations.length === 0 ? (
        <p className="text-xl font-semibold w-full h-full text-center flex justify-center items-center pb-16">
          No booked consultations!
        </p>
      ) : (
        bookedConsultations.map((consultationGroup) => (
          <div key={consultationGroup.date} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {consultationGroup.date}
            </h2>
            {consultationGroup.consultations.map((consultation) => (
              <ConsultationBookingItem
                consultation={consultation}
                cancelBooking={handleCancelBooking}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewConsultationPage;
