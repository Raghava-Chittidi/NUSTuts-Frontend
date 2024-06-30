import { useAuthContext } from "../../hooks/useAuthContext";
import { Consultation } from "../../types";
import { useState } from "react";
import {
  bookConsultation,
  cancelConsultation,
} from "../../services/consultations";
import { toast } from "react-toastify";

const ConsultationBooking = ({
  consultationData,
  isClickable,
}: {
  consultationData: Consultation;
  isClickable: boolean;
}) => {
  const { state } = useAuthContext();
  const [consultation, setConsultation] =
    useState<Consultation>(consultationData);

  const handleBookConsultation = async () => {
    try {
      const res = await bookConsultation(
        consultationData.tutorial.ID,
        consultationData.id,
        state.user
      );
      if (res) {
        setConsultation(res);
        toast.success("Booked consultation successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to book consultation!");
    }
  };

  const handleCancelConsultation = async () => {
    try {
      const res = await cancelConsultation(
        consultationData.tutorial.ID,
        consultationData.id,
        state.user
      );
      if (res) {
        setConsultation(res);
        toast.success("Canceled booked consultation successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel booked consultation!");
    }
  };

  return (
    <div className="p-4 mb-2 rounded-md shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <p className="font-medium">
          {consultation.startTime} - {consultation.endTime}
        </p>
        <p
          className={`font-medium ${
            consultation.booked ? "text-red-500" : "text-green-500"
          }`}
        >
          {consultation.booked ? "Booked" : "Available"}
        </p>
      </div>
      <button
        onClick={
          consultation.booked
            ? handleCancelConsultation
            : handleBookConsultation
        }
        disabled={!isClickable}
        className={`mt-2 w-full p-2 rounded-md ${
          isClickable
            ? consultation.booked
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        {consultation.booked ? "Cancel" : "Book"}
      </button>
    </div>
  );
};

export default ConsultationBooking;
