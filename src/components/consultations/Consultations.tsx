import { useEffect, useState } from "react";
import { Consultation } from "../../types";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import ConsultationBooking from "./ConsultationBooking";

const Consultations = ({ tutorialId, date }: { tutorialId: number, date: string }) => {
  const { state } = useAuthContext();
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await axios.get(`/api/consultations/${tutorialId}`,
          {
            params: {
              date: date,
            },
            headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
          }
        );

        console.log(res.data.data.consultations);
        const consultations = await res.data.data.consultations;
        setConsultations(consultations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConsultations();
  }, [tutorialId]);

  return (
    <div>
      {consultations.map((consultation) => (
        <ConsultationBooking key={consultation.ID} consultationData={consultation} />
      ))}
    </div>
  );
}

export default Consultations;