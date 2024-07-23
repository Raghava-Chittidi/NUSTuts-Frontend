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

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const [bookedConsultations, setBookedConsultations] = useState<
    BookedConsultationsView[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const isStudent = isUserStudent(state.user);

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
        console.log(error);
      }
    };

    fetchBookedConsultations();
  }, []);

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
      console.log(error);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : bookedConsultations.length > 0 ? (
    <div className="p-14 h-screen w-full overflow-y-auto">
      {bookedConsultations.map((consultationGroup) => (
        <div key={consultationGroup.date} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {consultationGroup.date}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {consultationGroup.consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="border-b border-gray-200 py-4"
              >
                <div className="mb-2">
                  <p className="text-lg font-semibold">
                    Time: {consultation.startTime} - {consultation.endTime}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium">
                      TA Name:{" "}
                      <span className="font-normal">
                        {consultation.teachingAssistant.name}
                      </span>
                    </p>
                    <p className="font-medium">
                      TA Email:{" "}
                      <span className="font-normal">
                        {consultation.teachingAssistant.email}
                      </span>
                    </p>
                  </div>
                  {consultation.student && (
                    <div>
                      <p className="font-medium">
                        Student Name:{" "}
                        <span className="font-normal">
                          {consultation.student.name}
                        </span>
                      </p>
                      <p className="font-medium">
                        Student Email:{" "}
                        <span className="font-normal">
                          {consultation.student.email}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                {isStudent && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCancelBooking(consultation.id)}
                      className="text-red-500 hover:underline"
                    >
                      Unbook
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="p-14 h-screen w-full flex items-center justify-center">
      <p className="text-xl font-semibold">No booked consultations</p>
    </div>
  );
};

export default ViewConsultationPage;
