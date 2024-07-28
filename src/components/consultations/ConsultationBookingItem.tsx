import { IoTime } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { Consultation } from "../../types";
import { daysArr } from "../../util/util";

const ConsultationBookingItem = ({
  consultation,
  cancelBooking,
}: {
  consultation: Consultation;
  cancelBooking: (id: number) => Promise<void>;
}) => {
  const date = new Date(consultation.date);

  return (
    <div className="h-36 min-w-[30rem] w-full flex p-5 border-2 rounded-lg bg-white py-4 mb-4">
      <div className="md:w-[6rem] lg:w-[7rem] h-full flex flex-col justify-center items-center md:text-base lg:text-xl border-gray-400 border-r-2 pr-4">
        <div>{daysArr[date.getDay()]}</div>
        <div className="text-4xl lg:text-5xl">{date.getDate()}</div>
      </div>
      <div className="h-full w-full flex items-center space-x-2 md:space-x-6 lg:space-x-10 justify-between">
        <div className="flex space-x-2 md:space-x-6 lg:space-x-10">
          <div className="space-y-7 pl-3 lg:pl-8">
            <div className="flex items-center space-x-3">
              <IoTime size={23} />
              <time>
                {consultation.startTime} - {consultation.endTime}
              </time>
            </div>
            <div className="flex items-center space-x-3">
              <BsPeopleFill size={23} />
              <div>
                {consultation.teachingAssistant.name}
                {` & ${consultation.student?.name}`}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-7">
            <div>
              <span className="font-semibold">TA Email: </span>
              {consultation.teachingAssistant.email}
            </div>
            <div>
              <span className="font-semibold">Student Email: </span>
              {consultation.student?.email}
            </div>
          </div>
        </div>
        <Button color="danger" onClick={() => cancelBooking(consultation.id)}>
          Unbook
        </Button>
      </div>
    </div>
  );
};

export default ConsultationBookingItem;
