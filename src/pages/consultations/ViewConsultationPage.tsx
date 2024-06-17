import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutletContext } from "react-router-dom";
import { BookedConsultationsView, TutorialContextType } from "../../types";
import axios from "axios";
import { getCurrentDateTime } from "../../util/util";
import { isUserStudent } from "../../util/user";

const ViewConsultationPage = () => {
  const { state } = useAuthContext();
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const [bookedConsultations, setBookedConsultations] = useState<BookedConsultationsView[]>([]);
  const isStudent = isUserStudent(state.user);

  useEffect(() => {
    const fetchBookedConsultations = async () => {
      try {
        const { formattedDate, formattedTime } = getCurrentDateTime();
        const response = isStudent 
          ? 
            await axios.get(`/api/consultations/student/${tutorialId}/${state.user.id}`, {
              params: {
                date: formattedDate,
                time: formattedTime,
              },
              headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
            })
          :
            await axios.get(`/api/consultations/teachingAssistant/${tutorialId}`, {
              params: {
                date: formattedDate,
                time: formattedTime,
              },
              headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
            });
        console.log(response.data.data.bookedConsultations);
        setBookedConsultations(response.data.data.bookedConsultations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookedConsultations();
  }, []);

  const handleCancelBooking = async (consultationId: number) => {
    try {
      await axios.put(`/api/consultations/${tutorialId}/cancel/${consultationId}`, {}, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      setBookedConsultations((prev) =>
        prev.map((group) => ({
          ...group,
          consultations: group.consultations.filter((consultation) => consultation.ID !== consultationId),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-14 bg-gray-100 h-screen w-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Consultations</h1>
      {bookedConsultations.map((consultationGroup) => (
        <div key={consultationGroup.date} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{consultationGroup.date}</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {consultationGroup.consultations.map((consultation) => (
              <div key={consultation.ID} className="flex justify-between items-center border-b border-gray-200 py-2">
                <div>
                  <p><span className="font-semibold">Time:</span> {consultation.startTime} - {consultation.endTime}</p>
                </div>
                {isStudent && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleCancelBooking(consultation.ID)}
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
  );
}

export default ViewConsultationPage;