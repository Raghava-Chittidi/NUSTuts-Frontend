import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdChecklist, MdDateRange } from "react-icons/md";
import SidebarButton from "./SidebarButton";

const AttendanceMenu = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-semibold text-small pl-1 sm:block hidden",
    trigger:
      "px-6 sm:px-2 py-0 hover:bg-gray-200 duration-300 rounded-lg h-12 gap-0 sm:gap-3",
    indicator: "text-small",
    content: "font-semibold text-small pl-1 sm:block space-y-1",
  };

  const defaultContent = (
    <>
      <SidebarButton
        name="Today's Attendance"
        icon={<MdChecklist className="mr-2" size={23} />}
        route="attendance/today"
      />
      <SidebarButton
        name="View Attendances"
        icon={<MdChecklist className="mr-2" size={23} />}
        route="attendance/view"
      />
    </>
  );

  return (
    <Accordion showDivider={false} className="p-0" itemClasses={itemClasses}>
      <AccordionItem
        startContent={<MdChecklist className="mr-2" size={23} />}
        title="Attendance"
        className="p-0 flex flex-col sm:block"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

export default AttendanceMenu;
