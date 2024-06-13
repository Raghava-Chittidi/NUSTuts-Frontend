import { Accordion, AccordionItem } from "@nextui-org/react";
import { MdDateRange } from "react-icons/md";
import { TbCalendarClock, TbCalendarMonth } from "react-icons/tb";
import SidebarButton from "./SidebarButton";
import { useNavigate } from "react-router-dom";

const ConsultationsMenu = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-semibold text-small pl-1 sm:block hidden",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-12 flex items-center",
    indicator: "text-small",
    content: "font-semibold text-small pl-1 sm:block hidden space-y-1",
  };
  const navigate = useNavigate();

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
        className="p-0"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
};

export default ConsultationsMenu;
