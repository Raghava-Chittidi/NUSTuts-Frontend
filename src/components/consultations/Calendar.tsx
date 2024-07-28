import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  Calendar as NextUiCalender,
  Modal as NextUIModal,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Consultations from "./Consultations";
import { getCurrentDateValue } from "../../util/util";
import { CalendarDateTime } from "@internationalized/date";

export const Calendar = ({ tutorialId }: { tutorialId: number }) => {
  // State to store the selected date in the form of string, in the format yyyy-mm-dd
  const [selectedDate, setSelectedDate] = useState<string>("");
  // State to store the selected date in the form of CalendarDateTime object
  const [selectedCalendarDate, setSelectedCalendarDate] =
    useState<CalendarDateTime | null>(getCurrentDateValue());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="mx-auto flex items-center space-x-0 h-screen pb-16">
        <NextUiCalender
          value={selectedCalendarDate}
          weekdayStyle="long"
          minValue={getCurrentDateValue()}
          classNames={{
            title: "text-xl text-black py-4 text-white",
            prevButton: "text-white text-xl",
            nextButton: "text-white text-xl",
            headerWrapper: "bg-blue-900",
            gridHeaderRow:
              "grid grid-cols-7 justify-items-center text-black font-semibold px-0 pt-4",
            gridHeaderCell: "text-xs md:text-base",
            grid: "bg-white w-full",
            gridBody: "bg-white w-[10%]",
            cell: "w-16 h-10 sm:w-16 sm:h-14 md:w-20 md:h-16 lg:w-[6.5rem] lg:h-18 xl:w-40 xl:h-24 bg-white hover:bg-gray-200 duration-300 border-[0.05rem] border-gray-200 cursor-pointer",
            gridWrapper: "p-0 w-fit",
            content: "w-fit",
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
            // Could be 1 instead of 01
            const day = e.day;
            // Could be 1 instead of 01
            const month = e.month;
            const year = e.year;
            // setIsDateSelected(true);
            // Parse date to yyyy-mm-dd format, e.g. 2022-01-02, even if day or month is single digit
            setSelectedDate(
              `${year}-${month.toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`
            );
            setSelectedCalendarDate(new CalendarDateTime(year, month, day));

            onOpen();
          }}
        />
      </div>
      <NextUIModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Consultations tutorialId={tutorialId} date={selectedDate} />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextUIModal>
    </>
  );
};
