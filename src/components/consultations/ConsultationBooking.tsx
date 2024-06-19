import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Consultation } from "../../types";
import { useState } from "react";
import { isCurrentDateTimePastGivenDateTime } from "../../util/util";

const ConsultationBooking = ({ consultationData }: { consultationData: Consultation }) => {
  const { state } = useAuthContext();
  const [consultation, setConsultation] = useState<Consultation>(consultationData);
  const isClickable = (!isCurrentDateTimePastGivenDateTime(consultationData.date, consultationData.startTime) && 
    (!consultation.booked || state.user.id === consultation.studentId));
  
  const bookConsultation = async () => {
    try {
      const res = await axios.put(`/api/consultations/${consultationData.tutorialId}/book/${consultationData.ID}`, {}, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      setConsultation(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const cancelConsultation = async () => {
    try {
      const res = await axios.put(`/api/consultations/${consultationData.tutorialId}/cancel/${consultationData.ID}`, {}, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      setConsultation(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // Display the timeslot, booking status, and booking button
    <div>
      <p>{consultation.startTime} - {consultation.endTime}</p>
      <p>{consultation.booked ? "Booked" : "Available"}</p>
      <button
        onClick={consultation.booked ? cancelConsultation : bookConsultation}
        disabled={!isClickable}
        className={`p-2 rounded-md ${isClickable ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
      >
        {consultation.booked ? "Cancel" : "Book"}
      </button>
    </div>
  );
}

export default ConsultationBooking;