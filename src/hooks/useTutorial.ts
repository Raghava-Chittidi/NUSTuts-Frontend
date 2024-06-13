import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useTutorial = () => {
  const { tutorialId } = useParams();
  const { state, isLoggedIn, isLoggingIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateTutorialId = () => {
    if (!isLoggingIn && !isLoggedIn) {
      navigate("/");
      return;
    }

    if (state.user.role.userType === "student") {
      const id = state.user.tutorials?.findIndex(
        (tutorial) => tutorial.ID === +tutorialId!
      );

      if (id === -1) {
        navigate("/");
        return;
      }
    } else {
      if (+tutorialId! !== state.user.tutorial?.ID) {
        navigate("/");
        return;
      }
    }

    setIsLoading(false);
  };

  return { validateTutorialId, isLoading };
};
