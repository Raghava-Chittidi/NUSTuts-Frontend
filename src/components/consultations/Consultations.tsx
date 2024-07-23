import { useEffect, useState } from "react";
import { Consultation } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";
import ConsultationBooking from "./ConsultationBooking";
import { isCurrentDateTimePastGivenDateTime } from "../../util/util";
import LoadingSpinner from "../LoadingSpinner";
import { AuthenticatedUser } from "../../context/AuthContext";
import axios from "axios";

type ConsultationBookingClickable = {
  consultationData: Consultation;
  isClickable: boolean;
};

const Consultations = ({
  tutorialId,
  date,
}: {
  tutorialId: number;
  date: string;
}) => {
  const { state } = useAuthContext();
  const [consultations, setConsultations] = useState<
    ConsultationBookingClickable[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const consultations = await getConsultationsForDate(
          tutorialId,
          date,
          state.user
        );
        const consultationBookings: ConsultationBookingClickable[] =
          consultations.map((consultation: Consultation) => {
            const bookedByCurrentUser =
              consultation.booked &&
              !!(
                consultation.student &&
                state.user.id === consultation.student.ID
              );
            const isClickable =
              !isCurrentDateTimePastGivenDateTime(
                consultation.date,
                consultation.startTime
              ) &&
              (!consultation.booked || bookedByCurrentUser);
            return { consultationData: consultation, isClickable: isClickable };
          });
        setConsultations(consultationBookings);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchConsultations();
  }, [tutorialId]);

  const getConsultationsForDate = async (
    tutorialId: number,
    date: string,
    user: AuthenticatedUser
  ): Promise<Consultation[]> => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/consultations/${tutorialId}`,
        {
          params: { date: date },
          headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
        }
      );
      return res.data.data.consultations;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : consultations.filter((consultation) => consultation.isClickable).length >
    0 ? (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">{`Consultations for ${date}`}</h1>
      {consultations.map((consultation) => (
        <ConsultationBooking
          key={consultation.consultationData.id}
          consultationData={consultation.consultationData}
          isClickable={consultation.isClickable}
        />
      ))}
    </div>
  ) : (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">{`Consultations for ${date}`}</h1>
      <p>No consultations available, book consultations for another day</p>
    </div>
  );
};

export default Consultations;
