import { useEffect, useState } from "react";
import { Consultation } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";
import ConsultationBooking from "./ConsultationBooking";
import { isCurrentDateTimePastGivenDateTime } from "../../util/util";
import { get } from "http";
import { getConsultationsForDate } from "../../services/consultations";

type ConsultationBookingClickable = {
  consultationData: Consultation;
  isClickable: boolean;
}

const Consultations = ({ tutorialId, date }: { tutorialId: number, date: string }) => {
  const { state } = useAuthContext();
  const [consultations, setConsultations] = useState<ConsultationBookingClickable[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const consultations = await getConsultationsForDate(tutorialId, date, state.user);
        const consultationBookings: ConsultationBookingClickable[] = consultations.map((consultation: Consultation) => {
          const bookedByCurrentUser = consultation.booked && 
            !!(consultation.student && state.user.id === consultation.student.ID);
          const isClickable = (!isCurrentDateTimePastGivenDateTime(consultation.date, consultation.startTime) && 
            (!consultation.booked || bookedByCurrentUser));
          return { consultationData: consultation, isClickable: isClickable };
        });
        setConsultations(consultationBookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConsultations();
  }, [tutorialId]);

  return consultations.filter(consultation => consultation.isClickable).length > 0 ? (
    <div>
      {consultations.map((consultation) => (
        <ConsultationBooking key={consultation.consultationData.id} consultationData={consultation.consultationData} isClickable={consultation.isClickable} />
      ))}
    </div>
  ): (
    <div>
      <p>No consultations available, book consultations for another day</p>
    </div>
  );
}

export default Consultations;