import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdDateRange } from "react-icons/md";
import { TbCalendarClock, TbCalendarMonth } from "react-icons/tb";
import SidebarButton from "./SidebarButton";

const ConsultationsMenu = () => {
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
        name="Book Consultation"
        icon={<TbCalendarClock className="mr-2" size={23} />}
        route="consultations/book"
      />
      <SidebarButton
        name="View Consultations"
        icon={<TbCalendarMonth className="mr-2" size={23} />}
        route="consultations/view"
      />
    </>
  );

  return (
    <Accordion showDivider={false} className="p-0" itemClasses={itemClasses}>
      <AccordionItem
        startContent={<MdDateRange size={23} />}
        title="Consultations"
        className="p-0 flex flex-col sm:block"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

export default ConsultationsMenu;
