import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutletContext } from "react-router-dom";
import { BookedConsultationsView, TutorialContextType } from "../../types";
import { getCurrentDateTime } from "../../util/util";
import { isUserStudent } from "../../util/user";
import { cancelConsultation, getAllBookedConsultationsForStudent, getAllBookedConsultationsForTeachingAssistant } from "../../services/consultations";

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
            await getAllBookedConsultationsForStudent(tutorialId, formattedDate, formattedTime, state.user)
          :
            await getAllBookedConsultationsForTeachingAssistant(tutorialId, formattedDate, 
              formattedTime, state.user);
        setBookedConsultations(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookedConsultations();
  }, []);

  const handleCancelBooking = async (consultationId: number) => {
    try {
      await cancelConsultation(tutorialId, consultationId, state.user);
      setBookedConsultations((prev) =>
        prev.map((group) => ({
          ...group,
          consultations: group.consultations.filter((consultation) => consultation.id !== consultationId),
        })).filter((group) => group.consultations.length > 0)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-14 bg-gray-100 h-screen w-full overflow-y-auto">
      {bookedConsultations.map((consultationGroup) => (
        <div key={consultationGroup.date} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{consultationGroup.date}</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {consultationGroup.consultations.map((consultation) => (
              <div key={consultation.id} className="border-b border-gray-200 py-4">
                <div className="mb-2">
                  <p className="text-lg font-semibold">Time: {consultation.startTime} - {consultation.endTime}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium">TA Name: <span className="font-normal">{consultation.teachingAssistant.name}</span></p>
                    <p className="font-medium">TA Email: <span className="font-normal">{consultation.teachingAssistant.email}</span></p>
                  </div>
                  {consultation.student && (
                    <div>
                      <p className="font-medium">Student Name: <span className="font-normal">{consultation.student.name}</span></p>
                      <p className="font-medium">Student Email: <span className="font-normal">{consultation.student.email}</span></p>
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
  );
  
}

export default ViewConsultationPage;