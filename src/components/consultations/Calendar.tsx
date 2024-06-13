import { Calendar as NextUiCalender } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CalendarDate } from "@internationalized/date";
import LoadingSpinner from "../LoadingSpinner";
import { useState } from "react";
import { monthsArr } from "../../util/util";

export const Calendar = () => {
  const { isLoggingIn } = useAuthContext();
  // const date = new Date();
  // const [selected, setSelected] = useState(
  //   new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate())
  // );

  // const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const target = event.target as HTMLElement;
  //   const [month, year] = event.currentTarget.ariaLabel!.split(" ");
  //   const day = target.innerText;
  //   setSelected(
  //     new CalendarDate(
  //       +year,
  //       monthsArr.findIndex((m) => m === month),
  //       +day
  //     )
  //   );
  // };

  // console.log(selected);

  if (isLoggingIn) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto mt-10">
      <NextUiCalender
        weekdayStyle="long"
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
            "",
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
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};
