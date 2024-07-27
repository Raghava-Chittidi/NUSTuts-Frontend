import { useOutletContext } from "react-router-dom";
import { Calendar } from "../../components/consultations/Calendar";
import { TutorialContextType } from "../../types";

const BookConsultationPage = () => {
  // Get tutorialId from the page URL
  const { tutorialId } = useOutletContext<TutorialContextType>();
  return <Calendar tutorialId={tutorialId} />;
};

export default BookConsultationPage;
