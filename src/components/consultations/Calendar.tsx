import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Calendar as NextUiCalender,
  Modal as NextUIModal,
  useDisclosure,
} from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";
import Consultations from "./Consultations";
import { getCurrentDateValue } from "../../util/util";

export const Calendar = ({ tutorialId }: { tutorialId: number }) => {
  const { isLoggingIn } = useAuthContext();
  // const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoggingIn) {
    return <LoadingSpinner />;
  }

  // console.log(getCurrentDateValue());
  return (
    <>
      <div className="mx-auto mb-5 flex items-center space-x-0">
        <NextUiCalender
          weekdayStyle="long"
          minValue={getCurrentDateValue()}
          classNames={{
            title: "text-xl text-black py-4 text-white",
            prevButton: "text-white text-xl",
            nextButton: "text-white text-xl",
            headerWrapper: "bg-blue-900",
            gridHeaderRow:
              "grid grid-cols-7 justify-items-center text-black font-semibold px-0 pt-4",
            grid: "bg-white",
            gridBody: "bg-white",
            cell: "w-40 h-24 bg-white hover:bg-gray-200 duration-300 border-[0.05rem] border-gray-200 cursor-pointer",
            gridWrapper: "p-0",
            cellButton: [
              "w-full h-full rounded-none flex justify-start items-start py-1 px-2",
              // selected case
              "data-[selected=true]:bg-blue-800",
              "data-[selected=true]:text-secondary-foreground",
              // hover case
              "data-[hover=true]:bg-gray-20",
              "data-[hover=true]:text-black",
              // selected and hover case
              "data-[selected=true]:data-[hover=true]:bg-blue-900",
              "data-[selected=true]:data-[hover=true]:text-white",
            ],
          }}
          onChange={(e) => {
            console.log(e);
            // Coult be 1 instead of 01
            const day = e.day;
            // Coult be 1 instead of 01
            const month = e.month;
            const year = e.year;
            // setIsDateSelected(true);
            // Parse date to dd-mm-yyyy format, e.g. 01-01-2022, even if day or month is single digit
            setSelectedDate(
              `${day.toString().padStart(2, "0")}-${month
                .toString()
                .padStart(2, "0")}-${year}`
            );

            onOpen();
          }}
        />
      </div>
      <NextUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{`Consultations for ${selectedDate}`}</ModalHeader>
              <ModalBody>
                <Consultations tutorialId={tutorialId} date={selectedDate} />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextUIModal>
    </>
  );
};
